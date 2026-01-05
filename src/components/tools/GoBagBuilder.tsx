import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  items: Array<{
    id: string;
    name: string;
    essential: boolean;
  }>;
}

const defaultCategories: Category[] = [
  {
    id: 'water',
    name: 'Water',
    items: [
      { id: 'water1', name: 'Waterflessen (1-2 liter)', essential: true },
      { id: 'water2', name: 'Waterzuivering tabletten', essential: false },
      { id: 'water3', name: 'Waterfilter (compact)', essential: false },
    ],
  },
  {
    id: 'food',
    name: 'Voedsel',
    items: [
      { id: 'food1', name: 'Energierepen', essential: true },
      { id: 'food2', name: 'Noten en gedroogd fruit', essential: true },
      { id: 'food3', name: 'Noodmaaltijden', essential: false },
    ],
  },
  {
    id: 'shelter',
    name: 'Onderdak',
    items: [
      { id: 'shelter1', name: 'Deken (lichtgewicht)', essential: true },
      { id: 'shelter2', name: 'Poncho of regenjas', essential: true },
      { id: 'shelter3', name: 'Tent (compact)', essential: false },
    ],
  },
  {
    id: 'tools',
    name: 'Gereedschap',
    items: [
      { id: 'tools1', name: 'Zakmes', essential: true },
      { id: 'tools2', name: 'Zaklamp', essential: true },
      { id: 'tools3', name: 'Vuurstarter', essential: false },
      { id: 'tools4', name: 'Werkhandschoenen', essential: false },
    ],
  },
  {
    id: 'firstaid',
    name: 'EHBO',
    items: [
      { id: 'firstaid1', name: 'EHBO-set (compact)', essential: true },
      { id: 'firstaid2', name: 'Pijnstillers', essential: true },
      { id: 'firstaid3', name: 'Persoonlijke medicijnen', essential: true },
    ],
  },
  {
    id: 'communication',
    name: 'Communicatie',
    items: [
      { id: 'comm1', name: 'Powerbank', essential: true },
      { id: 'comm2', name: 'Hand-aangedreven radio', essential: false },
      { id: 'comm3', name: 'Whistle (fluitje)', essential: true },
    ],
  },
  {
    id: 'documents',
    name: 'Documenten',
    items: [
      { id: 'doc1', name: 'Kopie ID', essential: true },
      { id: 'doc2', name: 'Contactgegevens', essential: true },
      { id: 'doc3', name: 'Kopie verzekering', essential: false },
    ],
  },
  {
    id: 'other',
    name: 'Overig',
    items: [
      { id: 'other1', name: 'Contant geld', essential: true },
      { id: 'other2', name: 'Kaart van gebied', essential: false },
      { id: 'other3', name: 'Kompas', essential: false },
    ],
  },
];

export default function GoBagBuilder() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const selectAllEssential = () => {
    const essentialIds = new Set<string>();
    categories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.essential) {
          essentialIds.add(item.id);
        }
      });
    });
    setSelectedItems(essentialIds);
  };

  const clearAll = () => {
    setSelectedItems(new Set());
  };

  const getSelectedCount = () => {
    return selectedItems.size;
  };

  const getEssentialCount = () => {
    return categories.reduce((sum, cat) => sum + cat.items.filter((item) => item.essential).length, 0);
  };

  const exportList = () => {
    const items = categories
      .flatMap((cat) => cat.items)
      .filter((item) => selectedItems.has(item.id))
      .map((item) => `☐ ${item.name}`)
      .join('\n');

    navigator.clipboard.writeText(items);
    alert('Lijst gekopieerd naar klembord!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Go-Bag Builder</h2>
        <p className="text-gray-600 mb-6">
          Bouw je perfecte go-bag (evacuatietas) door items te selecteren. Een go-bag is een lichtgewicht
          tas die je snel kunt meenemen bij evacuatie.
        </p>
      </div>

      <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-700">Geselecteerde items:</span>
          <span className="font-semibold text-primary-600">{getSelectedCount()} / {categories.reduce((sum, cat) => sum + cat.items.length, 0)}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={selectAllEssential}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors"
          >
            Selecteer Essentieel
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
          >
            Wissen
          </button>
          {selectedItems.size > 0 && (
            <button
              onClick={exportList}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
            >
              Exporteer Lijst
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.name}</h3>
            <div className="space-y-3">
              {category.items.map((item) => {
                const isSelected = selectedItems.has(item.id);
                return (
                  <label
                    key={item.id}
                    className={`flex items-start cursor-pointer p-3 rounded-lg transition-colors ${
                      isSelected ? 'bg-primary-50 border border-primary-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleItem(item.id)}
                      className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <div className="ml-3 flex-1">
                      <span className={`text-gray-900 ${isSelected ? 'font-medium' : ''}`}>
                        {item.name}
                      </span>
                      {item.essential && (
                        <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                          Essentieel
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedItems.size > 0 && (
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Je Go-Bag Lijst</h3>
          <ul className="space-y-2">
            {categories
              .flatMap((cat) => cat.items)
              .filter((item) => selectedItems.has(item.id))
              .map((item) => (
                <li key={item.id} className="flex items-center text-gray-700">
                  <span className="text-green-600 mr-2">✓</span>
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}


