/**
 * Calculation utilities for emergency preparedness tools
 */

export interface PersonInput {
  adults: number;
  children: number;
  babies?: number;
}

export interface WaterCalculationResult {
  totalLiters: number;
  perPerson: {
    adults: number;
    children: number;
    babies?: number;
  };
  breakdown: {
    drinking: number;
    cooking: number;
    hygiene: number;
  };
  recommendations: string[];
}

export interface FoodCalculationResult {
  totalCalories: number;
  totalWeight: number; // in kg
  perPerson: {
    adults: number;
    children: number;
    babies?: number;
  };
  recommendations: string[];
}

/**
 * Calculate water needs per day
 * Based on: 2.5L per adult, 1.5L per child, 0.5L per baby
 */
export function calculateWaterNeeds(
  persons: PersonInput,
  days: number
): WaterCalculationResult {
  const adultDaily = 2.5; // liters
  const childDaily = 1.5; // liters
  const babyDaily = 0.5; // liters

  const adultTotal = persons.adults * adultDaily * days;
  const childTotal = persons.children * childDaily * days;
  const babyTotal = (persons.babies || 0) * babyDaily * days;

  const totalLiters = adultTotal + childTotal + babyTotal;

  // Breakdown: 60% drinking, 30% cooking, 10% hygiene
  const drinking = totalLiters * 0.6;
  const cooking = totalLiters * 0.3;
  const hygiene = totalLiters * 0.1;

  const recommendations: string[] = [];
  if (days <= 3) {
    recommendations.push('Flessen water zijn voldoende voor korte termijn');
    recommendations.push('Houd rekening met minimaal 3 liter per persoon per dag');
  } else {
    recommendations.push('Overweeg wateropslag containers voor langere termijn');
    recommendations.push('Zorg voor waterzuivering methoden (filters, tabletten)');
  }

  return {
    totalLiters: Math.ceil(totalLiters),
    perPerson: {
      adults: Math.ceil(adultDaily * days),
      children: Math.ceil(childDaily * days),
      babies: persons.babies ? Math.ceil(babyDaily * days) : undefined,
    },
    breakdown: {
      drinking: Math.ceil(drinking),
      cooking: Math.ceil(cooking),
      hygiene: Math.ceil(hygiene),
    },
    recommendations,
  };
}

/**
 * Calculate food needs
 * Based on: 2000 kcal per adult, 1500 kcal per child, 800 kcal per baby
 */
export function calculateFoodNeeds(
  persons: PersonInput,
  days: number
): FoodCalculationResult {
  const adultDaily = 2000; // calories
  const childDaily = 1500; // calories
  const babyDaily = 800; // calories

  const adultTotal = persons.adults * adultDaily * days;
  const childTotal = persons.children * childDaily * days;
  const babyTotal = (persons.babies || 0) * babyDaily * days;

  const totalCalories = adultTotal + childTotal + babyTotal;

  // Approximate weight: 1kg food ≈ 2500-3000 calories (average 2750)
  const totalWeight = Math.round((totalCalories / 2750) * 10) / 10;

  const recommendations: string[] = [];
  if (days <= 3) {
    recommendations.push('Kies voor lang houdbaar voedsel (blik, gedroogd)');
    recommendations.push('Zorg voor gevarieerde maaltijden');
  } else if (days <= 7) {
    recommendations.push('Combineer blikvoedsel met gedroogde producten');
    recommendations.push('Overweeg noodmaaltijden (meals-ready-to-eat)');
  } else {
    recommendations.push('Bouw een uitgebreide voorraad op met rotatie');
    recommendations.push('Combineer verschillende voedselgroepen');
    recommendations.push('Overweeg lang houdbare noodvoeding');
  }

  return {
    totalCalories,
    totalWeight,
    perPerson: {
      adults: Math.ceil(adultDaily * days),
      children: Math.ceil(childDaily * days),
      babies: persons.babies ? Math.ceil(babyDaily * days) : undefined,
    },
    recommendations,
  };
}

/**
 * Calculate 72-hour kit contents
 */
export function calculate72HourKit(persons: PersonInput) {
  const water = calculateWaterNeeds(persons, 3);
  const food = calculateFoodNeeds(persons, 3);

  return {
    water,
    food,
    essentials: {
      firstAid: persons.adults + Math.ceil(persons.children / 2),
      flashlights: Math.max(1, Math.ceil((persons.adults + persons.children) / 2)),
      radios: 1,
      powerbanks: Math.max(1, persons.adults),
    },
  };
}

/**
 * Calculate risk score based on location and factors
 */
export function calculateRiskScore(factors: {
  location: 'urban' | 'rural' | 'coastal';
  floodRisk: 'low' | 'medium' | 'high';
  hasGenerator: boolean;
  hasEmergencyKit: boolean;
  hasEvacuationPlan: boolean;
  householdSize: number;
}): { score: number; level: 'low' | 'medium' | 'high'; recommendations: string[] } {
  let score = 0;
  const recommendations: string[] = [];

  // Location risk
  if (factors.location === 'coastal') score += 3;
  else if (factors.location === 'urban') score += 2;
  else score += 1;

  // Flood risk
  if (factors.floodRisk === 'high') score += 3;
  else if (factors.floodRisk === 'medium') score += 2;
  else score += 1;

  // Preparedness reduces risk
  if (!factors.hasEmergencyKit) {
    score += 2;
    recommendations.push('Stel een noodpakket samen');
  }

  if (!factors.hasEvacuationPlan) {
    score += 2;
    recommendations.push('Maak een evacuatieplan');
  }

  if (!factors.hasGenerator) {
    score += 1;
    if (factors.floodRisk === 'high') {
      recommendations.push('Overweeg een generator voor stroomuitval');
    }
  }

  // Household size increases complexity
  if (factors.householdSize > 4) {
    score += 1;
    recommendations.push('Zorg voor voldoende voorraad voor grote gezinnen');
  }

  let level: 'low' | 'medium' | 'high';
  if (score <= 4) {
    level = 'low';
  } else if (score <= 7) {
    level = 'medium';
  } else {
    level = 'high';
  }

  if (level === 'high') {
    recommendations.unshift('Uw risico niveau is hoog. Begin direct met voorbereidingen.');
  } else if (level === 'medium') {
    recommendations.unshift('Uw risico niveau is gemiddeld. Blijf voorbereid.');
  } else {
    recommendations.unshift('Uw risico niveau is laag. Houd uw voorbereidingen up-to-date.');
  }

  return { score, level, recommendations };
}


