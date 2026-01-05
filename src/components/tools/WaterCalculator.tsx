import { useState } from 'react';
import { calculateWaterNeeds, type PersonInput } from '../../lib/calculations';

export default function WaterCalculator() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [days, setDays] = useState(3);
  const [result, setResult] = useState<ReturnType<typeof calculateWaterNeeds> | null>(null);

  const handleCalculate = () => {
    const persons: PersonInput = { adults, children, babies: babies || undefined };
    const calculation = calculateWaterNeeds(persons, days);
    setResult(calculation);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Water Calculator</h2>
        <p className="text-gray-600 mb-6">
          Bereken hoeveel water je nodig hebt voor je gezin tijdens een noodsituatie.
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

      <button
        onClick={handleCalculate}
        className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Bereken Waterbehoefte
      </button>

      {result && (
        <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Resultaat</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Totale waterbehoefte</p>
              <p className="text-3xl font-bold text-primary-600">{result.totalLiters} liter</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-primary-200">
              <div>
                <p className="text-sm text-gray-600">Drinken</p>
                <p className="text-lg font-semibold text-gray-900">{result.breakdown.drinking} liter</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Koken</p>
                <p className="text-lg font-semibold text-gray-900">{result.breakdown.cooking} liter</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Hygiene</p>
                <p className="text-lg font-semibold text-gray-900">{result.breakdown.hygiene} liter</p>
              </div>
            </div>

            <div className="pt-4 border-t border-primary-200">
              <p className="text-sm font-medium text-gray-900 mb-2">Per persoon:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>Volwassenen: {result.perPerson.adults} liter</li>
                {children > 0 && <li>Kinderen: {result.perPerson.children} liter</li>}
                {babies > 0 && result.perPerson.babies && (
                  <li>Baby's: {result.perPerson.babies} liter</li>
                )}
              </ul>
            </div>

            {result.recommendations.length > 0 && (
              <div className="pt-4 border-t border-primary-200">
                <p className="text-sm font-medium text-gray-900 mb-2">Aanbevelingen:</p>
                <ul className="space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
