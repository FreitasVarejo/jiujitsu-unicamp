import { Hero } from "./_components/Hero";
import { Agenda } from "./_components/Agenda";
import { Guia } from "./_components/Guia";
import { Location } from "./_components/Location";
import { Team } from "./_components/Team";

export const Home = () => {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <Hero />
      <Guia />

      <div id="treinos">
        <Agenda />
      </div>

      <Team />
      <Location />
    </div>
  );
};
