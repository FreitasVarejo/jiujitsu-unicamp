import { SectionHeader } from "@/components/SectionHeader.component";
import { ErrorState } from "@/components/states";
import { Users } from "lucide-react";

type TeamErrorProps = {
  error: Error;
};

export const TeamError = ({ error }: TeamErrorProps) => {
  return (
    <section className="container">
      <SectionHeader title="Nossa Equipe" icon={Users} />
      <ErrorState title="Ops! Algo deu errado" description={error.message} />
    </section>
  );
};
