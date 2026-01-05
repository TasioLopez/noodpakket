import { useState } from 'react';
import { calculateWaterNeeds, calculateFoodNeeds, type PersonInput } from '../../lib/calculations';

export default function NoodpakketCalculator() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [days, setDays] = useState(3);
  const [hasEmergencyKit, setHasEmergencyKit] = useState(false);
  const [hasGenerator, setHasGenerator] = useState(false);
  const [hasRadio, setHasRadio] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const persons: PersonInput = { adults, children, babies: babies || undefined };
    const water = calculateWaterNeeds(persons, days);
    const food = calculateFoodNeeds(persons, days);

    const totalPersons = adults + children + (babies || 0);
    
    const essentials = {
      firstAidKits: Math.max(1, Math.ceil(totalPersons / 4)),
      flashlights: Math.max(1, Math.ceil(totalPersons / 2)),
      radios: hasRadio ? 1 : 1,
      powerbanks: Math.max(1, adults),
      generators: hasGenerator ? 1 : 0,
      batteries: Math.max(12, totalPersons * 6),
      candles: days > 1 ? totalPersons * 3 : 0,
      matches: 2,
      blankets: totalPersons,
      warmClothing: totalPersons,
    };

    const estimatedCost = {
      water: Math.ceil(water.totalLiters / 1.5) * 0.5, // €0.50 per 1.5L bottle
      food: Math.ceil(food.totalWeight * 8), // €8 per kg
      firstAid: essentials.firstAidKits * 25, // €25 per kit
      flashlights: essentials.flashlights * 15, // €15 per flashlight
      radio: essentials.radios * 40, // €40 per radio
      powerbanks: essentials.powerbanks * 30, // €30 per powerbank
      batteries: essentials.batteries * 1.5, // €1.50 per battery
      other: 50, // Other essentials
      generator: hasGenerator ? 500 : 0,
      total: 0,
    };

    estimatedCost.total = Object.values(estimatedCost).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);

    setResult({
      water,
      food,
      essentials,
      estimatedCost,
      persons: totalPersons,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Noodpakket Calculator</h2>
        <p className="text-gray-600 mb-6">
          Bereken wat je nodig hebt voor een compleet noodpakket op maat. Deze calculator helpt je
          alles te plannen van water tot essentiële items.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            Aantal baby's
          </label>
          <input
            type="number"
            min="0"
            max="10"
            value={babies}
            onChange={(e) => setBabies(parseInt(e.target.value) || 0)}
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

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Beschikbare Apparaten
        </label>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={hasEmergencyKit}
            onChange={(e) => setHasEmergencyKit(e.target.checked)}
            className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-2 text-gray-700">Ik heb al een basis noodpakket</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={hasGenerator}
            onChange={(e) => setHasGenerator(e.target.checked)}
            className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-2 text-gray-700">Ik heb een generator</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={hasRadio}
            onChange={(e) => setHasRadio(e.target.checked)}
            className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-2 text-gray-700">Ik heb een noodradio</span>
        </label>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Bereken Noodpakket
      </button>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Overzicht</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Personen</p>
                <p className="text-2xl font-bold text-primary-600">{result.persons}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dagen</p>
                <p className="text-2xl font-bold text-primary-600">{days}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Water</p>
                <p className="text-2xl font-bold text-primary-600">{result.water.totalLiters}L</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Voedsel</p>
                <p className="text-2xl font-bold text-primary-600">{result.food.totalWeight}kg</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Essentiële Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">EHBO-sets:</span>
                  <span className="font-semibold">{result.essentials.firstAidKits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Zaklampen:</span>
                  <span className="font-semibold">{result.essentials.flashlights}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Radio's:</span>
                  <span className="font-semibold">{result.essentials.radios}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Powerbanks:</span>
                  <span className="font-semibold">{result.essentials.powerbanks}</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Batterijen:</span>
                  <span className="font-semibold">{result.essentials.batteries} stuks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Dekens:</span>
                  <span className="font-semibold">{result.essentials.blankets}</span>
                </div>
                {result.essentials.generators > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Generatoren:</span>
                    <span className="font-semibold">{result.essentials.generators}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Geschatte Kosten</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-700">Water:</span>
                <span className="font-semibold">€{result.estimatedCost.water.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Voedsel:</span>
                <span className="font-semibold">€{result.estimatedCost.food.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">EHBO-sets:</span>
                <span className="font-semibold">€{result.estimatedCost.firstAid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Overig:</span>
                <span className="font-semibold">€{(result.estimatedCost.flashlights + result.estimatedCost.radio + result.estimatedCost.powerbanks + result.estimatedCost.batteries + result.estimatedCost.other).toFixed(2)}</span>
              </div>
              {result.estimatedCost.generator > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-700">Generator:</span>
                  <span className="font-semibold">€{result.estimatedCost.generator.toFixed(2)}</span>
                </div>
              )}
            </div>
            <div className="pt-4 border-t border-green-300">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900">Totaal:</span>
                <span className="text-2xl font-bold text-green-600">€{result.estimatedCost.total.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              * Dit zijn geschatte kosten. Werkelijke prijzen kunnen verschillen.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


