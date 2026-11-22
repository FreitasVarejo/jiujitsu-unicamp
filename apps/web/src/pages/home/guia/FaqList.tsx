import { FAQ_ITEMS } from "@/constants/home";
import { Accordion } from "@/components/ui/accordion";
import { AccordionItem } from "./AccordionItem";

export const FAQCard = () => {
  return (
    <div className="lg:col-span-8">
      <h2
        id="perguntas-frequentes"
        className="mb-8 scroll-mt-24 border-b border-zinc-800 pb-2 font-display text-3xl text-primary"
      >
        Perguntas Frequentes
      </h2>

      <Accordion multiple className="gap-2">
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem
            key={index}
            value={String(index)}
            title={item.question}
          >
            <p>{item.answer}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
