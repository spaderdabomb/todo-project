// components/TabGroup.tsx
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabGroupProps {
  tabs: Tab[];
}

export default function TabGroup({ tabs }: TabGroupProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      {/* Tab Buttons */}
      <div className="flex space-x-4 border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 ${
              activeTab === tab.id
                ? "text-white border-b-2 border-white"
                : "text-gray-400 border-b-2 border-transparent hover:text-white hover:border-white"
            } transition-all duration-300`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id}>{tab.content}</div>
            )
        )}
      </div>
    </div>
  );
}