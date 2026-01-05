import { useState } from 'react';
import { calculateFoodNeeds, type PersonInput } from '../../lib/calculations';

interface Meal {
  id: string;
  name: string;
  calories: number;
  ingredients: string[];
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

const defaultMeals: Meal[] = [
  { id: '1', name: 'Ontbijtgranen met melk', calories: 300, ingredients: ['Ontbijtgranen', 'Melkpoeder', 'Water'], type: 'breakfast' },
  { id: '2', name: 'Bruine bonen met rijst', calories: 450, ingredients: ['Bruine bonen (blik)', 'Rijst', 'Water'], type: 'lunch' },
  { id: '3', name: 'Spaghetti met tomatensaus', calories: 500, ingredients: ['Spaghetti', 'Tomaten (blik)', 'Water'], type: 'dinner' },
  { id: '4', name: 'Notenmix', calories: 200, ingredients: ['Noten', 'Gedroogd fruit'], type: 'snack' },
  { id: '5', name: 'Crackers met pindakaas', calories: 350, ingredients: ['Crackers', 'Pindakaas'], type: 'lunch' },
  { id: '6', name: 'Noodmaaltijd (MRE)', calories: 600, ingredients: ['Noodmaaltijd'], type: 'dinner' },
  { id: '7', name: 'Gedroogd fruit', calories: 150, ingredients: ['Gedroogd fruit'], type: 'snack' },
  { id: '8', name: 'Havermout', calories: 350, ingredients: ['Havermout', 'Water', 'Gedroogd fruit'], type: 'breakfast' },
];

export default function MaaltijdPlanner() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [days, setDays] = useState(3);
  const [selectedMeals, setSelectedMeals] = useState<Set<string>>(new Set());
  const [plan, setPlan] = useState<any>(null);

  const toggleMeal = (mealId: string) => {
    setSelectedMeals((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(mealId)) {
        newSet.delete(mealId);
      } else {
        newSet.add(mealId);
      }
      return newSet;
    });
  };

  const generatePlan = () => {
    const persons: PersonInput = { adults, children };
    const foodNeeds = calculateFoodNeeds(persons, days);
    
    const dailyCalories = {
      adult: 2000,
      child: 1500,
    };
    
    const totalDailyCalories = adults * dailyCalories.adult + children * dailyCalories.child;
    const selectedMealList = defaultMeals.filter((meal) => selectedMeals.has(meal.id));
    
    if (selectedMealList.length === 0) {
      alert('Selecteer minimaal een maaltijd om een plan te genereren.');
      return;
    }
    
    // Generate meal plan
    const mealPlan: any = {
      days: [],
      totalCalories: 0,
      shoppingList: new Set<string>(),
    };
    
    for (let day = 0; day < days; day++) {
      const dayMeals = {
        day: day + 1,
        breakfast: selectedMealList.find((m) => m.type === 'breakfast') || selectedMealList[0],
        lunch: selectedMealList.find((m) => m.type === 'lunch') || selectedMealList[1],
        dinner: selectedMealList.find((m) => m.type === 'dinner') || selectedMealList[2],
        snack: selectedMealList.find((m) => m.type === 'snack') || selectedMealList[3],
      };
      
      const dayCalories = (dayMeals.breakfast?.calories || 0) + 
                         (dayMeals.lunch?.calories || 0) + 
                         (dayMeals.dinner?.calories || 0) + 
                         (dayMeals.snack?.calories || 0);
      
      dayMeals.breakfast?.ingredients.forEach((ing) => mealPlan.shoppingList.add(ing));
      dayMeals.lunch?.ingredients.forEach((ing) => mealPlan.shoppingList.add(ing));
      dayMeals.dinner?.ingredients.forEach((ing) => mealPlan.shoppingList.add(ing));
      dayMeals.snack?.ingredients.forEach((ing) => mealPlan.shoppingList.add(ing));
      
      mealPlan.days.push(dayMeals);
      mealPlan.totalCalories += dayCalories * totalDailyCalories / 2750; // Approximate scaling
    }
    
    mealPlan.shoppingList = Array.from(mealPlan.shoppingList);
    mealPlan.foodNeeds = foodNeeds;
    
    setPlan(mealPlan);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Maaltijdplanner Nood</h2>
        <p className="text-gray-600 mb-6">
          Plan je maaltijden voor noodsituaties. Selecteer beschikbare maaltijden en genereer een
          maaltijdplan met boodschappenlijst.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aantal volwassenen
          </label>
          <input
            type="number"
            min="0"
            max="20"
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aantal kinderen
          </label>
          <input
            type="number"
            min="0"
            max="20"
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aantal dagen
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Selecteer Beschikbare Maaltijden</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {defaultMeals.map((meal) => {
            const isSelected = selectedMeals.has(meal.id);
            return (
              <label
                key={meal.id}
                className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                  isSelected ? 'bg-primary-50 border-primary-300' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleMeal(meal.id)}
                  className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{meal.name}</span>
                    <span className="text-sm text-gray-600">{meal.calories} kcal</span>
                  </div>
                  <div className="mt-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      meal.type === 'breakfast' ? 'bg-yellow-100 text-yellow-800' :
                      meal.type === 'lunch' ? 'bg-blue-100 text-blue-800' :
                      meal.type === 'dinner' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {meal.type === 'breakfast' ? 'Ontbijt' : meal.type === 'lunch' ? 'Lunch' : meal.type === 'dinner' ? 'Diner' : 'Snack'}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-gray-600">
                    {meal.ingredients.join(', ')}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <button
        onClick={generatePlan}
        className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Genereer Maaltijdplan
      </button>

      {plan && (
        <div className="mt-8 space-y-6">
          <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Maaltijdplan ({days} dagen)</h3>
            <div className="space-y-4">
              {plan.days.map((dayPlan: any) => (
                <div key={dayPlan.day} className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Dag {dayPlan.day}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium">Ontbijt:</span> {dayPlan.breakfast?.name} ({dayPlan.breakfast?.calories} kcal)
                    </div>
                    <div>
                      <span className="font-medium">Lunch:</span> {dayPlan.lunch?.name} ({dayPlan.lunch?.calories} kcal)
                    </div>
                    <div>
                      <span className="font-medium">Diner:</span> {dayPlan.dinner?.name} ({dayPlan.dinner?.calories} kcal)
                    </div>
                    <div>
                      <span className="font-medium">Snack:</span> {dayPlan.snack?.name} ({dayPlan.snack?.calories} kcal)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Boodschappenlijst</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {plan.shoppingList.map((item: string, index: number) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="text-green-600 mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Voedselbehoefte</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>Totale calorieën nodig: {plan.foodNeeds.totalCalories.toLocaleString('nl-NL')} kcal</p>
              <p>Geschat gewicht: {plan.foodNeeds.totalWeight} kg</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


