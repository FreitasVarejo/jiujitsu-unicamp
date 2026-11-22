import { SectionHeader } from "@/components/SectionHeader.component";
import { LoadingState } from "@/components/states";
import { Users } from "lucide-react";

export const TeamSkeleton = () => (
  <section className="container">
    <SectionHeader title="Nossa Equipe" icon={Users} />
    <LoadingState variant="cards" count={3} label="Carregando a equipe…" />
  </section>
);
