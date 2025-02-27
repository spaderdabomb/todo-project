// components/Sidebar.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Import shadcn Button component
import { Menu } from "lucide-react"; // Import a burger bar icon from lucide-react

interface SidebarProps {
  onTabClick: (tab: string) => void; // Callback function for tab clicks
  isCollapsed: boolean; // Whether the sidebar is collapsed
  onToggleCollapse: () => void; // Function to toggle collapse state
}

export default function Sidebar({ onTabClick, isCollapsed, onToggleCollapse }: SidebarProps) {
  const [activeTab, setActiveTab] = useState("tab1"); // State to track the active tab

  // List of tabs
  const tabs = [
    { id: "tab1", label: "Tasks" },
    { id: "tab2", label: "Daily" },
    { id: "tab3", label: "Weekly" },
  ];

  // Handle tab click
  const handleTabClick = (tab: string) => {
    setActiveTab(tab); // Update the active tab
    onTabClick(tab); // Notify the parent component
  };

  return (
    <div
      className={`h-screen bg-slate-800 text-white p-4 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Burger Bar Button */}
      <Button
        variant="ghost"
        size="icon"
        className="mb-4"
        onClick={onToggleCollapse}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Tabs */}
      {!isCollapsed && (
        <>
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <Button
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === tab.id 
                      ? "bg-gray-700 text-white hover:bg-gray-700" 
                      : "hover:bg-[rgba(107,114,128,0.15)] hover:text-white"
                  }`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.label}
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}