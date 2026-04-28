import { AccordionItem } from "../shared";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export const FAQ = ({ items }: FAQProps) => {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.question}>
          <p>{item.answer}</p>
        </AccordionItem>
      ))}
    </div>
  );
};
