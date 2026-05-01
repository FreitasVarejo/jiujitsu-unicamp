import { Agenda, Guia, Hero, Location, Team } from "./_components/";

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
