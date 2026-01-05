import { useState } from 'react';

interface InventoryItem {
  id: string;
  category: string;
  name: string;
  quantity: number;
  expiryDate?: string;
  minimumRequired: number;
}

const defaultInventory: InventoryItem[] = [
  // Water
  { id: 'w1', category: 'Water', name: 'Waterflessen (1.5L)', quantity: 0, minimumRequired: 6 },
  { id: 'w2', category: 'Water', name: 'Waterzuivering tabletten', quantity: 0, minimumRequired: 1 },
  
  // Voedsel
  { id: 'f1', category: 'Voedsel', name: 'Blikvoedsel (stukken)', quantity: 0, minimumRequired: 10 },
  { id: 'f2', category: 'Voedsel', name: 'Rijst (kg)', quantity: 0, minimumRequired: 2 },
  { id: 'f3', category: 'Voedsel', name: 'Pasta (kg)', quantity: 0, minimumRequired: 2 },
  { id: 'f4', category: 'Voedsel', name: 'Noodmaaltijden', quantity: 0, minimumRequired: 3 },
  { id: 'f5', category: 'Voedsel', name: 'Noten (zakken)', quantity: 0, minimumRequired: 2 },
  
  // EHBO
  { id: 'e1', category: 'EHBO', name: 'EHBO-sets', quantity: 0, minimumRequired: 1 },
  { id: 'e2', category: 'EHBO', name: 'Pijnstillers (dozen)', quantity: 0, minimumRequired: 1 },
  { id: 'e3', category: 'EHBO', name: 'Pleisters (dozen)', quantity: 0, minimumRequired: 1 },
  
  // Communicatie
  { id: 'c1', category: 'Communicatie', name: 'Zaklampen', quantity: 0, minimumRequired: 2 },
  { id: 'c2', category: 'Communicatie', name: 'Batterijen (pakken)', quantity: 0, minimumRequired: 4 },
  { id: 'c3', category: 'Communicatie', name: 'Powerbanks', quantity: 0, minimumRequired: 1 },
  { id: 'c4', category: 'Communicatie', name: 'Noodradio', quantity: 0, minimumRequired: 1 },
  
  // Overig
  { id: 'o1', category: 'Overig', name: 'Toiletpapier (rollen)', quantity: 0, minimumRequired: 4 },
  { id: 'o2', category: 'Overig', name: 'Zeep (stukken)', quantity: 0, minimumRequired: 2 },
];

export default function Voorraadchecker() {
  const [inventory, setInventory] = useState<InventoryItem[]>(defaultInventory);
  const [showExpired, setShowExpired] = useState(true);

  const updateQuantity = (id: string, quantity: number) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const getCategoryItems = (category: string) => {
    return inventory.filter((item) => item.category === category);
  };

  const getStatus = (item: InventoryItem) => {
    if (item.quantity >= item.minimumRequired) {
      return { status: 'sufficient', label: 'Voldoende', color: 'green' };
    } else if (item.quantity > 0) {
      return { status: 'low', label: 'Te weinig', color: 'yellow' };
    } else {
      return { status: 'missing', label: 'Ontbreekt', color: 'red' };
    }
  };

  const getSummary = () => {
    const total = inventory.length;
    const sufficient = inventory.filter((item) => item.quantity >= item.minimumRequired).length;
    const low = inventory.filter((item) => item.quantity > 0 && item.quantity < item.minimumRequired).length;
    const missing = inventory.filter((item) => item.quantity === 0).length;
    
    return { total, sufficient, low, missing };
  };

  const summary = getSummary();
  const categories = ['Water', 'Voedsel', 'EHBO', 'Communicatie', 'Overig'];

  const exportList = () => {
    const needs = inventory
      .filter((item) => item.quantity < item.minimumRequired)
      .map((item) => {
        const needed = item.minimumRequired - item.quantity;
        return `☐ ${item.name}: ${needed} ${needed > 1 ? 'stuks' : 'stuk'}`;
      })
      .join('\n');
    
    navigator.clipboard.writeText(needs || 'Alle voorraden zijn voldoende!');
    alert('Boodschappenlijst gekopieerd naar klembord!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Voorraadchecker</h2>
        <p className="text-gray-600 mb-6">
          Controleer je huidige voorraad en zie direct wat je nog nodig hebt. Update je voorraad
          en genereer een boodschappenlijst voor ontbrekende items.
        </p>
      </div>

      <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Voorraad Overzicht</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">{summary.sufficient}</div>
            <div className="text-sm text-gray-600">Voldoende</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{summary.low}</div>
            <div className="text-sm text-gray-600">Te weinig</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{summary.missing}</div>
            <div className="text-sm text-gray-600">Ontbreekt</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{summary.total}</div>
            <div className="text-sm text-gray-600">Totaal</div>
          </div>
        </div>
        
        {summary.low > 0 || summary.missing > 0 ? (
          <button
            onClick={exportList}
            className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Exporteer Boodschappenlijst
          </button>
        ) : (
          <div className="mt-4 text-center text-green-700 font-medium">
            ✓ Alle voorraden zijn voldoende!
          </div>
        )}
      </div>

      <div className="space-y-6">
        {categories.map((category) => {
          const items = getCategoryItems(category);
          const categoryNeeds = items.filter((item) => item.quantity < item.minimumRequired);
          
          if (categoryNeeds.length === 0 && !showExpired) return null;
          
          return (
            <div key={category} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
              <div className="space-y-3">
                {items.map((item) => {
                  const status = getStatus(item);
                  const needs = item.minimumRequired - item.quantity;
                  
                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg border ${
                        status.color === 'green' ? 'bg-green-50 border-green-200' :
                        status.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className={`ml-2 text-xs px-2 py-1 rounded ${
                            status.color === 'green' ? 'bg-green-200 text-green-800' :
                            status.color === 'yellow' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-red-200 text-red-800'
                          }`}>
                            {status.label}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Minimaal: {item.minimumRequired}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <input
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Aantal"
                          />
                        </div>
                        {needs > 0 && (
                          <div className="text-sm font-medium text-red-600">
                            Nog {needs} nodig
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


