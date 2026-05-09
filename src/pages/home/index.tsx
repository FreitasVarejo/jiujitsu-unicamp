import { Agenda } from "./agenda";
import { Guia } from "./guia";
import { Hero } from "./hero";
import { Team } from "./team";
import { Location } from "./location";

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
