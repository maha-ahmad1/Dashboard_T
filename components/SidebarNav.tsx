import React from "react";



type NavigationItem = {
  icon: React.ComponentType<any>;
  label: string;
  active?: boolean;
};

type NavigationSection = {
  title: string;
  items: NavigationItem[];
};



export default function SidebarNav({ sections }: { sections: NavigationSection[] }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="py-4">
          {section.title && (
            <div className="px-4 pb-2">
              <h3 className="text-[#a3a3a3] text-xs font-medium uppercase tracking-wider">
                {section.title}
              </h3>
            </div>
          )}
          {section.items.map((item, itemIndex) => (
            <button
              key={itemIndex}
              className={`group w-52 flex items-center gap-3 px-3 py-2.5 mx-3 rounded-md text-left transition-all duration-200
                 ${item.active
                  ? "bg-[#efebff] text-[#7d52f4] text-sm "
                  : "text-[#171717] hover:bg-[#f3f0ff] hover:text-[#7d52f4]"
                }
              `}
            >
              <item.icon
                className={`h-5 w-5 transition-colors duration-200 ${item.active
                    ? "text-[#7d52f4]"
                    : "text-[#030303] group-hover:text-[#7d52f4]"
                  }`}
              />
              <span
                className={`font-medium text-sm transition-colors duration-200 ${item.active
                    ? "text-[#7d52f4]"
                    : "group-hover:text-[#7d52f4]"
                  }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}