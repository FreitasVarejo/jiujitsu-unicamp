import {
  AccordionContent,
  AccordionItem as AccordionRow,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionItemProps {
  value: string;
  title: string;
  children: React.ReactNode;
}

export const AccordionItem = ({
  value,
  title,
  children,
}: AccordionItemProps) => {
  return (
    <AccordionRow
      value={value}
      className="overflow-hidden rounded-lg border border-border bg-card not-last:border-b"
    >
      <AccordionTrigger className="items-center rounded-none border-0 bg-card px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-muted hover:no-underline">
        <span className="text-left">{title}</span>
      </AccordionTrigger>
      <AccordionContent className="border-t border-border bg-card/50 px-6 py-6 text-base leading-relaxed text-gray-300">
        {children}
      </AccordionContent>
    </AccordionRow>
  );
};
