import { InfoCard } from "./info-card";
import { FAQCard } from "./faq-list";

export const Guia = () => {
  return (
    <section id="guia" className="container py-12">
      <div className="mb-16 text-center">
        <h1 className="mb-6 font-display text-5xl text-white">
          Guia do Iniciante
        </h1>
        <p className="text-xl text-gray-400">
          Tudo o que você precisa saber antes de pisar no tatame pela primeira
          vez.
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-12">
        <InfoCard />
        <FAQCard />
      </div>
    </section>
  );
};
