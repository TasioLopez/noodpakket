import { useState } from 'react';

interface EvacuationPlan {
  location: string;
  primaryRoute: string;
  alternateRoute: string;
  meetingPoint: string;
  transportation: string;
  essentialItems: string[];
  specialInstructions: string;
  contacts: string[];
}

export default function Evacuatieplan() {
  const [plan, setPlan] = useState<Partial<EvacuationPlan>>({
    essentialItems: [],
  });
  const [newItem, setNewItem] = useState('');
  const [generated, setGenerated] = useState(false);

  const updateField = (field: keyof EvacuationPlan, value: any) => {
    setPlan((prev) => ({ ...prev, [field]: value }));
  };

  const addEssentialItem = () => {
    if (newItem.trim()) {
      updateField('essentialItems', [...(plan.essentialItems || []), newItem.trim()]);
      setNewItem('');
    }
  };

  const removeEssentialItem = (index: number) => {
    const items = [...(plan.essentialItems || [])];
    items.splice(index, 1);
    updateField('essentialItems', items);
  };

  const generatePlan = () => {
    setGenerated(true);
  };

  const exportPlan = () => {
    const planText = `
EVACUATIEPLAN

========================================
LOCATIE
========================================
${plan.location || 'Niet ingevuld'}

========================================
VLUCHTROUTES
========================================
Hoofdroute: ${plan.primaryRoute || 'Niet ingevuld'}
Alternatieve route: ${plan.alternateRoute || 'Niet ingevuld'}

========================================
VERZAMELPUNT
========================================
${plan.meetingPoint || 'Niet ingevuld'}

========================================
VERVOER
========================================
${plan.transportation || 'Niet ingevuld'}

========================================
ESSENTIËLE ITEMS
========================================
${plan.essentialItems?.map((item, i) => `${i + 1}. ${item}`).join('\n') || 'Geen'}

========================================
CONTACTGEGEVENS
========================================
${plan.contacts?.join('\n') || 'Niet ingevuld'}

========================================
SPECIALE INSTRUCTIES
========================================
${plan.specialInstructions || 'Geen'}
    `.trim();

    navigator.clipboard.writeText(planText);
    alert('Evacuatieplan gekopieerd naar klembord!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Evacuatieplan Builder</h2>
        <p className="text-gray-600 mb-6">
          Maak een compleet evacuatieplan voor je huis en buurt. Plan je routes, verzamelpunten
          en wat je mee moet nemen bij evacuatie.
        </p>
      </div>

      {!generated ? (
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basis Informatie</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Locatie (Adres)
                </label>
                <input
                  type="text"
                  value={plan.location || ''}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Straat, nummer, plaats"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vluchtroutes</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hoofdroute
                </label>
                <textarea
                  value={plan.primaryRoute || ''}
                  onChange={(e) => updateField('primaryRoute', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                  placeholder="Beschrijf de hoofdroute naar een veilig gebied"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alternatieve Route
                </label>
                <textarea
                  value={plan.alternateRoute || ''}
                  onChange={(e) => updateField('alternateRoute', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                  placeholder="Beschrijf een alternatieve route (voor als hoofdroute geblokkeerd is)"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verzamelpunt en Vervoer</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verzamelpunt
                </label>
                <input
                  type="text"
                  value={plan.meetingPoint || ''}
                  onChange={(e) => updateField('meetingPoint', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Bijvoorbeeld: Buurthuis, Park, Familie"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vervoer
                </label>
                <input
                  type="text"
                  value={plan.transportation || ''}
                  onChange={(e) => updateField('transportation', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Bijvoorbeeld: Auto, Fiets, Openbaar vervoer, Pechhulp"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Essentiële Items</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addEssentialItem()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Item toevoegen"
                />
                <button
                  onClick={addEssentialItem}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Toevoegen
                </button>
              </div>
              <div className="space-y-2">
                {plan.essentialItems?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{item}</span>
                    <button
                      onClick={() => removeEssentialItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Verwijderen
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contactgegevens</h3>
            <textarea
              value={plan.contacts?.join('\n') || ''}
              onChange={(e) => updateField('contacts', e.target.value.split('\n').filter(line => line.trim()))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={4}
              placeholder="Naam + telefoonnummer (elke regel een contactpersoon)"
            />
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Speciale Instructies</h3>
            <textarea
              value={plan.specialInstructions || ''}
              onChange={(e) => updateField('specialInstructions', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={4}
              placeholder="Bijvoorbeeld: Help buren, neem huisdieren mee, etc."
            />
          </div>

          <button
            onClick={generatePlan}
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Genereer Evacuatieplan
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Je Evacuatieplan</h3>
            <div className="bg-white rounded-lg p-6 space-y-4 text-sm font-mono">
              <div><strong>Locatie:</strong> {plan.location || 'Niet ingevuld'}</div>
              <div>
                <strong>Vluchtroutes:</strong>
                <br />Hoofdroute: {plan.primaryRoute || 'Niet ingevuld'}
                <br />Alternatief: {plan.alternateRoute || 'Niet ingevuld'}
              </div>
              <div>
                <strong>Verzamelpunt:</strong> {plan.meetingPoint || 'Niet ingevuld'}
              </div>
              <div>
                <strong>Vervoer:</strong> {plan.transportation || 'Niet ingevuld'}
              </div>
              <div>
                <strong>Essentiële Items:</strong>
                {plan.essentialItems?.map((item, i) => (
                  <div key={i}>{i + 1}. {item}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setGenerated(false)}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Bewerk Plan
            </button>
            <button
              onClick={exportPlan}
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Exporteer Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


