import { useState } from 'react';
import { calculateRiskScore } from '../../lib/calculations';

export default function RisicoMeter() {
  const [location, setLocation] = useState<'urban' | 'rural' | 'coastal'>('urban');
  const [floodRisk, setFloodRisk] = useState<'low' | 'medium' | 'high'>('low');
  const [hasGenerator, setHasGenerator] = useState(false);
  const [hasEmergencyKit, setHasEmergencyKit] = useState(false);
  const [hasEvacuationPlan, setHasEvacuationPlan] = useState(false);
  const [householdSize, setHouseholdSize] = useState(2);
  const [result, setResult] = useState<ReturnType<typeof calculateRiskScore> | null>(null);

  const handleCalculate = () => {
    const calculation = calculateRiskScore({
      location,
      floodRisk,
      hasGenerator,
      hasEmergencyKit,
      hasEvacuationPlan,
      householdSize,
    });
    setResult(calculation);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRiskText = (level: string) => {
    switch (level) {
      case 'low':
        return 'Laag Risico';
      case 'medium':
        return 'Gemiddeld Risico';
      case 'high':
        return 'Hoog Risico';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Risico Meter</h2>
        <p className="text-gray-600 mb-6">
          Bepaal je risico niveau op basis van je locatie en voorbereiding. Krijg persoonlijke
          aanbevelingen voor verbetering.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Locatie Type
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="urban">Stedelijk gebied</option>
            <option value="rural">Landelijk gebied</option>
            <option value="coastal">Kustgebied</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overstromingsrisico
          </label>
          <select
            value={floodRisk}
            onChange={(e) => setFloodRisk(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="low">Laag</option>
            <option value="medium">Gemiddeld</option>
            <option value="high">Hoog</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grootte huishouden
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={householdSize}
            onChange={(e) => setHouseholdSize(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voorbereiding
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
              checked={hasEmergencyKit}
              onChange={(e) => setHasEmergencyKit(e.target.checked)}
              className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-700">Ik heb een noodpakket</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hasEvacuationPlan}
              onChange={(e) => setHasEvacuationPlan(e.target.checked)}
              className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-700">Ik heb een evacuatieplan</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Bereken Risico
      </button>

      {result && (
        <div className="mt-8">
          <div className={`rounded-lg p-6 border-2 ${getRiskColor(result.level)} border-opacity-20 bg-${result.level === 'high' ? 'red' : result.level === 'medium' ? 'yellow' : 'green'}-50`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Jouw Risico Niveau</h3>
              <span className={`px-4 py-2 rounded-lg font-semibold text-white ${getRiskColor(result.level)}`}>
                {getRiskText(result.level)}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Risico Score</span>
                <span className="text-2xl font-bold text-gray-900">{result.score}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${getRiskColor(result.level)}`}
                  style={{ width: `${(result.score / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Aanbevelingen:</h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <span className="text-primary-600 mr-2">→</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


