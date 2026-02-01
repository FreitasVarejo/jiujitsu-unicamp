import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-800 rounded-lg bg-zinc-900 overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-zinc-900 hover:bg-zinc-800 transition-colors"
      >
        <span className="font-display text-lg text-white tracking-wide text-left">{title}</span>
        {isOpen ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-gray-500" />}
      </button>
      {isOpen && (
        <div className="px-6 py-6 bg-zinc-900/50 border-t border-zinc-800 text-gray-300 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};
