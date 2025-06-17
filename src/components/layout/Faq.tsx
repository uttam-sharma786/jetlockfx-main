import React, { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items?: AccordionItem[];
  allowMultiple?: boolean;
}

const defaultItems: AccordionItem[] = [
  {
    id: '1',
    title: 'What is JetLock FX?',
    content: 'JetLock FX is a digital platform where travelers can compare local cash exchange rates, reserve their preferred rate, and locate the best nearby currency exchange bureau — saving time and money while traveling'
  },
  {
    id: '2',
    title: 'Is JetLock FX live?',
    content: 'Yes, we’re currently operating a lean MVP in Baja Mexico and Southern California. The platform is functional and accepting early users and partners.'
  },
  {
    id: '3',
    title: 'Which cities will JetLock FX launch in next?',
    content: 
    'We’re expanding based on tourist and border traffic.Next targets include: Arizona and Texas Miami, Florida CDMX (Mexico City) Bogotá, Colombia'
  },
  {
    id: '4',
    title: 'Do I pay through the JetLock FX app?',
    content: 
    'No. All transactions are completed in person at the selected currency exchange bureau. We facilitate the reservation and rate-locking experience — similar to how Kayak or OpenTable works.'
  },
  {
    id: '5',
    title: 'Is JetLock FX a financial institution?',
    content: 'No. JetLock FX does not handle or move money. We are a marketplace and discovery tool for travelers to find the best cash exchange options near them.'  
  },
  {
    id: '6',
    title: 'How does JetLock FX choose which exchange bureaus to show?',
    content: 'We display registered, verified bureaus and their rates based on:Distance (geolocation) Rate competitiveness Business hours and availability Customer reviews and feedback (future feature)'
  }
];

const Accordion: React.FC<AccordionProps> = ({ 
  items = defaultItems, 
  allowMultiple = false 
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      
      if (newOpenItems.has(itemId)) {
        // Close the item
        newOpenItems.delete(itemId);
      } else {
        // Open the item
        if (!allowMultiple) {
          // If multiple items aren't allowed, close all others
          newOpenItems.clear();
        }
        newOpenItems.add(itemId);
      }
      
      return newOpenItems;
    });
  };

  const isOpen = (itemId: string) => openItems.has(itemId);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center"> Frequently Asked Questions (FAQ)</h2>
      
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 
                         focus:bg-gray-100 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-inset
                         transition-colors duration-200 ease-in-out
                         text-gray-700 font-medium"
              aria-expanded={isOpen(item.id)}
              aria-controls={`panel-${item.id}`}
            >
              <div className="flex justify-between items-center">
                <span>{item.title}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-200 ease-in-out ${
                    isOpen(item.id) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            
            <div id={`panel-${item.id}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen(item.id) 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
              aria-hidden={!isOpen(item.id)}
            >
              <div className="px-6 py-4 bg-white text-gray-600 leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;