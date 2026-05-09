import { CalendarDays } from "lucide-react";
import { SectionHeader } from "../shared";
import { AgendaMobile } from "./_mobile";
import { AgendaDesktop } from "./_desktop";
import { useIsDesktop } from "@/hooks/ui";

const CALENDAR_URL =
  "https://calendar.google.com/calendar/embed?src=f481afb9999dfafe1079be33ac43d3ab2695409949b092b3d894ea42cc903f5c%40group.calendar.google.com&ctz=America%2FFortaleza";

export const Agenda = () => {
  const isDesktop = useIsDesktop();

  return (
    <section className="container">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <SectionHeader title="Agenda" icon={CalendarDays} />
        <a
          href={CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-sm uppercase tracking-widest text-primary transition-colors hover:text-orange-400"
        >
          Ver agenda completa →
        </a>
      </div>

      {!isDesktop && <AgendaMobile />}
      {isDesktop && <AgendaDesktop />}
    </section>
  );
};
