import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between bg-zinc-900 px-6 py-4 transition-colors hover:bg-zinc-800"
      >
        <span className="text-left font-display text-lg tracking-wide text-white">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="text-primary" />
        ) : (
          <ChevronDown className="text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="border-t border-zinc-800 bg-zinc-900/50 px-6 py-6 leading-relaxed text-gray-300">
          {children}
        </div>
      )}
    </div>
  );
};
