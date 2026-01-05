import { useState, useEffect } from 'react';

interface ChecklistItem {
  id: string;
  category: string;
  items: Array<{
    id: string;
    label: string;
    checked: boolean;
  }>;
}

const defaultChecklist: ChecklistItem[] = [
  {
    id: 'water',
    category: 'Water',
    items: [
      { id: 'water1', label: 'Minimaal 9 liter water per persoon (3 dagen)', checked: false },
      { id: 'water2', label: 'Waterflessen met schroefdop', checked: false },
      { id: 'water3', label: 'Waterzuivering tabletten', checked: false },
    ],
  },
  {
    id: 'voedsel',
    category: 'Voedsel',
    items: [
      { id: 'food1', label: 'Lang houdbaar voedsel voor minimaal 3 dagen', checked: false },
      { id: 'food2', label: 'Blikopener', checked: false },
      { id: 'food3', label: 'Noodmaaltijden (optioneel)', checked: false },
      { id: 'food4', label: 'Gedroogd fruit en noten', checked: false },
    ],
  },
  {
    id: 'ehbo',
    category: 'EHBO',
    items: [
      { id: 'ehbo1', label: 'EHBO-set', checked: false },
      { id: 'ehbo2', label: 'Medicijnen (indien nodig)', checked: false },
      { id: 'ehbo3', label: 'Pijnstillers', checked: false },
      { id: 'ehbo4', label: 'Ontsmettingsmiddel', checked: false },
    ],
  },
  {
    id: 'communicatie',
    category: 'Communicatie',
    items: [
      { id: 'comm1', label: 'Batterij-aangedreven radio', checked: false },
      { id: 'comm2', label: 'Powerbank voor telefoon', checked: false },
      { id: 'comm3', label: 'Zaklamp met extra batterijen', checked: false },
    ],
  },
  {
    id: 'documenten',
    category: 'Documenten',
    items: [
      { id: 'doc1', label: 'Kopieën belangrijke documenten', checked: false },
      { id: 'doc2', label: 'Kopie identiteitsbewijs', checked: false },
      { id: 'doc3', label: 'Contactgegevens familieleden', checked: false },
    ],
  },
  {
    id: 'overig',
    category: 'Overig',
    items: [
      { id: 'other1', label: 'Contant geld (minimaal €200)', checked: false },
      { id: 'other2', label: 'Deodorant en zeep', checked: false },
      { id: 'other3', label: 'Tandenborstel en tandpasta', checked: false },
      { id: 'other4', label: 'Toiletpapier', checked: false },
      { id: 'other5', label: 'Handdoeken', checked: false },
    ],
  },
];

export default function Checklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    // Load from localStorage or use default
    const saved = localStorage.getItem('noodpakket-checklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultChecklist;
      }
    }
    return defaultChecklist;
  });

  useEffect(() => {
    // Save to localStorage whenever checklist changes
    localStorage.setItem('noodpakket-checklist', JSON.stringify(checklist));
  }, [checklist]);

  const toggleItem = (categoryId: string, itemId: string) => {
    setChecklist((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : category
      )
    );
  };

  const resetChecklist = () => {
    if (confirm('Weet je zeker dat je de checklist wilt resetten?')) {
      setChecklist(defaultChecklist);
      localStorage.removeItem('noodpakket-checklist');
    }
  };

  const getProgress = () => {
    const total = checklist.reduce((sum, cat) => sum + cat.items.length, 0);
    const checked = checklist.reduce(
      (sum, cat) => sum + cat.items.filter((item) => item.checked).length,
      0
    );
    return total > 0 ? Math.round((checked / total) * 100) : 0;
  };

  const progress = getProgress();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Noodpakket Checklist</h2>
        <p className="text-gray-600 mb-6">
          Gebruik deze checklist om te zien wat je nodig hebt in je noodpakket. Je voortgang wordt automatisch opgeslagen.
        </p>
      </div>

      <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">Voortgang</span>
          <span className="text-lg font-bold text-primary-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {checklist.map((category) => (
          <div key={category.id} className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
            <div className="space-y-3">
              {category.items.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(category.id, item.id)}
                    className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span
                    className={`ml-3 text-gray-700 flex-1 ${
                      item.checked ? 'line-through text-gray-400' : ''
                    } group-hover:text-primary-600 transition-colors`}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={resetChecklist}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Reset Checklist
        </button>
        
        <button
          onClick={() => {
            const text = checklist
              .map(
                (cat) =>
                  `${cat.category}:\n${cat.items
                    .map((item) => `${item.checked ? '✓' : '☐'} ${item.label}`)
                    .join('\n')}`
              )
              .join('\n\n');
            navigator.clipboard.writeText(text);
            alert('Checklist gekopieerd naar klembord!');
          }}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Kopieer Checklist
        </button>
      </div>
    </div>
  );
}


