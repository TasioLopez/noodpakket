import { useState } from 'react';
import { calculate72HourKit, type PersonInput } from '../../lib/calculations';

export default function Calculator72Uur() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof calculate72HourKit> | null>(null);

  const handleCalculate = () => {
    const persons: PersonInput = { adults, children, babies: babies || undefined };
    const calculation = calculate72HourKit(persons);
    setResult(calculation);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">72-Uur Noodpakket Calculator</h2>
        <p className="text-gray-600 mb-6">
          Bereken wat je nodig hebt voor een 72-uurs noodpakket. Deze calculator helpt je een compleet
          pakket samen te stellen dat voldoet aan de 72-uurs regel.
        </p>
      </div>

      <div className="bg-primary-50 rounded-lg p-6 border border-primary-200 mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">Wat is de 72-uurs regel?</h3>
        <p className="text-sm text-gray-700">
          De 72-uurs regel betekent dat je minimaal 72 uur (3 dagen) zelfstandig moet kunnen overleven
          zonder hulp van buitenaf. Dit is de aanbevolen minimale voorbereiding.
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
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Bereken 72-Uur Pakket
      </button>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Water (72 uur)</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Totaal water nodig:</span>
                <span className="font-semibold text-primary-600">{result.water.totalLiters} liter</span>
              </div>
              <div className="text-sm text-gray-600">
                Dit komt neer op ongeveer {Math.ceil(result.water.totalLiters / 1.5)} standaard waterflessen van 1,5 liter
              </div>
            </div>
          </div>

          <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Voedsel (72 uur)</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Totaal calorieën nodig:</span>
                <span className="font-semibold text-primary-600">{result.food.totalCalories.toLocaleString('nl-NL')} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Geschat gewicht:</span>
                <span className="font-semibold text-primary-600">{result.food.totalWeight} kg</span>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Essentiële Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-700">EHBO-sets:</span>
                <span className="ml-2 font-semibold text-primary-600">{result.essentials.firstAid}</span>
              </div>
              <div>
                <span className="text-gray-700">Zaklampen:</span>
                <span className="ml-2 font-semibold text-primary-600">{result.essentials.flashlights}</span>
              </div>
              <div>
                <span className="text-gray-700">Radio's:</span>
                <span className="ml-2 font-semibold text-primary-600">{result.essentials.radios}</span>
              </div>
              <div>
                <span className="text-gray-700">Powerbanks:</span>
                <span className="ml-2 font-semibold text-primary-600">{result.essentials.powerbanks}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Aanbevelingen</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {result.water.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  {rec}
                </li>
              ))}
              {result.food.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}


