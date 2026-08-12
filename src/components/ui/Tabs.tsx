import { useState, type ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, value, onChange, className = '' }: TabsProps) {
  return (
    <div className={`border-b border-ink-200 ${className}`}>
      <nav className="-mb-px flex gap-1 overflow-x-auto" role="tablist">
        {tabs.map((tab) => {
          const active = tab.id === value;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(tab.id)}
              className={`relative flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                active
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-ink-500 hover:text-ink-800 hover:border-ink-300'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${active ? 'bg-primary-100 text-primary-700' : 'bg-ink-100 text-ink-600'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// Controlled tabs with content rendering
export function TabPanels({ tabs, children }: { tabs: TabItem[]; children: Record<string, ReactNode> }) {
  const [active, setActive] = useState(tabs[0]?.id || '');
  return (
    <div>
      <Tabs tabs={tabs} value={active} onChange={setActive} />
      <div className="pt-6">{children[active]}</div>
    </div>
  );
}
