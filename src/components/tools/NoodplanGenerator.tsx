import { useState } from 'react';

interface EmergencyPlan {
  householdInfo: {
    address: string;
    phoneNumbers: string[];
    emergencyContacts: string[];
  };
  meetingPoints: {
    nearby: string;
    outsideArea: string;
  };
  escapeRoutes: string[];
  utilities: {
    gasShutoff: string;
    waterShutoff: string;
    electricityShutoff: string;
  };
  medicalInfo: string;
  specialNeeds: string;
}

export default function NoodplanGenerator() {
  const [plan, setPlan] = useState<Partial<EmergencyPlan>>({});
  const [generated, setGenerated] = useState(false);

  const updateField = (section: keyof EmergencyPlan, field: string, value: any) => {
    setPlan((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value,
      },
    }));
  };

  const updateArrayField = (section: keyof EmergencyPlan, field: string, value: string) => {
    setPlan((prev) => {
      const sectionData = prev[section] as any;
      const currentArray = sectionData?.[field] || [];
      if (value && !currentArray.includes(value)) {
        return {
          ...prev,
          [section]: {
            ...sectionData,
            [field]: [...currentArray, value],
          },
        };
      }
      return prev;
    });
  };

  const generatePlan = () => {
    setGenerated(true);
  };

  const exportPlan = () => {
    const planText = `
NOODPLAN VOOR: ${plan.householdInfo?.address || 'Jouw Adres'}

========================================
CONTACTGEGEVENS
========================================
Adres: ${plan.householdInfo?.address || 'Niet ingevuld'}
Telefoonnummers: ${plan.householdInfo?.phoneNumbers?.join(', ') || 'Niet ingevuld'}
Noodcontacten: ${plan.householdInfo?.emergencyContacts?.join(', ') || 'Niet ingevuld'}

========================================
VERZAMELPUNTEN
========================================
In de buurt: ${plan.meetingPoints?.nearby || 'Niet ingevuld'}
Buiten gebied: ${plan.meetingPoints?.outsideArea || 'Niet ingevuld'}

========================================
VLUCHTROUTES
========================================
${plan.escapeRoutes?.map((route, i) => `${i + 1}. ${route}`).join('\n') || 'Niet ingevuld'}

========================================
VOORZIENINGEN UITZETTEN
========================================
Gas: ${plan.utilities?.gasShutoff || 'Niet ingevuld'}
Water: ${plan.utilities?.waterShutoff || 'Niet ingevuld'}
Elektriciteit: ${plan.utilities?.electricityShutoff || 'Niet ingevuld'}

========================================
MEDISCHE INFORMATIE
========================================
${plan.medicalInfo || 'Niet ingevuld'}

========================================
SPECIALE BEHOEFTEN
========================================
${plan.specialNeeds || 'Geen'}
    `.trim();

    navigator.clipboard.writeText(planText);
    alert('Noodplan gekopieerd naar klembord! Je kunt het plakken in een tekstbestand.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Noodplan Generator</h2>
        <p className="text-gray-600 mb-6">
          Genereer een compleet noodplan voor je gezin. Vul de onderstaande informatie in om een
          gepersonaliseerd plan te maken dat je kunt printen of opslaan.
        </p>
      </div>

      {!generated ? (
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Huishouden Informatie</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres
                </label>
                <input
                  type="text"
                  value={plan.householdInfo?.address || ''}
                  onChange={(e) => updateField('householdInfo', 'address', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Straat, nummer, postcode, plaats"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefoonnummers (gescheiden door komma's)
                </label>
                <input
                  type="text"
                  value={plan.householdInfo?.phoneNumbers?.join(', ') || ''}
                  onChange={(e) => updateField('householdInfo', 'phoneNumbers', e.target.value.split(',').map(s => s.trim()))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0612345678, 0612345679"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Noodcontacten (gescheiden door komma's)
                </label>
                <input
                  type="text"
                  value={plan.householdInfo?.emergencyContacts?.join(', ') || ''}
                  onChange={(e) => updateField('householdInfo', 'emergencyContacts', e.target.value.split(',').map(s => s.trim()))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Naam + telefoon, Naam + telefoon"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verzamelpunten</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verzamelpunt in de buurt
                </label>
                <input
                  type="text"
                  value={plan.meetingPoints?.nearby || ''}
                  onChange={(e) => updateField('meetingPoints', 'nearby', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Bijvoorbeeld: Buurthuis, Park, School"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verzamelpunt buiten het gebied
                </label>
                <input
                  type="text"
                  value={plan.meetingPoints?.outsideArea || ''}
                  onChange={(e) => updateField('meetingPoints', 'outsideArea', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Bijvoorbeeld: Familie, Vrienden, Hotel"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vluchtroutes</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Route 1 (Hoofdroute)
                </label>
                <input
                  type="text"
                  value={plan.escapeRoutes?.[0] || ''}
                  onChange={(e) => {
                    const routes = [...(plan.escapeRoutes || [])];
                    routes[0] = e.target.value;
                    setPlan((prev) => ({ ...prev, escapeRoutes: routes }));
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Bijvoorbeeld: Voordeur naar straat X"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Route 2 (Alternatieve route)
                </label>
                <input
                  type="text"
                  value={plan.escapeRoutes?.[1] || ''}
                  onChange={(e) => {
                    const routes = [...(plan.escapeRoutes || []), ''];
                    routes[1] = e.target.value;
                    setPlan((prev) => ({ ...prev, escapeRoutes: routes }));
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Bijvoorbeeld: Achterdeur naar straat Y"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Voorzieningen</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waar staat de hoofdkraan van gas?
                </label>
                <input
                  type="text"
                  value={plan.utilities?.gasShutoff || ''}
                  onChange={(e) => updateField('utilities', 'gasShutoff', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Bijvoorbeeld: In de meterkast, rechts onder"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waar staat de hoofdkraan van water?
                </label>
                <input
                  type="text"
                  value={plan.utilities?.waterShutoff || ''}
                  onChange={(e) => updateField('utilities', 'waterShutoff', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Bijvoorbeeld: In de kelder, links"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waar staat de hoofdschakelaar van elektriciteit?
                </label>
                <input
                  type="text"
                  value={plan.utilities?.electricityShutoff || ''}
                  onChange={(e) => updateField('utilities', 'electricityShutoff', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Bijvoorbeeld: In de meterkast, boven"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medische Informatie</h3>
            <textarea
              value={plan.medicalInfo || ''}
              onChange={(e) => updateField('medicalInfo', '', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={4}
              placeholder="Bijvoorbeeld: Allergieën, medicijnen, speciale behoeften"
            />
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Speciale Behoeften</h3>
            <textarea
              value={plan.specialNeeds || ''}
              onChange={(e) => updateField('specialNeeds', '', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={4}
              placeholder="Bijvoorbeeld: Huisdieren, baby's, ouderen, handicaps"
            />
          </div>

          <button
            onClick={generatePlan}
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Genereer Noodplan
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Je Noodplan</h3>
            <div className="bg-white rounded-lg p-6 space-y-4 text-sm font-mono">
              <div>
                <strong>NOODPLAN VOOR:</strong> {plan.householdInfo?.address || 'Jouw Adres'}
              </div>
              <div>
                <strong>Contactgegevens:</strong>
                <br />Telefoon: {plan.householdInfo?.phoneNumbers?.join(', ') || 'Niet ingevuld'}
                <br />Noodcontacten: {plan.householdInfo?.emergencyContacts?.join(', ') || 'Niet ingevuld'}
              </div>
              <div>
                <strong>Verzamelpunten:</strong>
                <br />In de buurt: {plan.meetingPoints?.nearby || 'Niet ingevuld'}
                <br />Buiten gebied: {plan.meetingPoints?.outsideArea || 'Niet ingevuld'}
              </div>
              <div>
                <strong>Vluchtroutes:</strong>
                {plan.escapeRoutes?.map((route, i) => (
                  <div key={i}>{i + 1}. {route}</div>
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


