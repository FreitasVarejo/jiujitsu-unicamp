import { SectionHeader } from "@/components/SectionHeader.component";
import { Loader2, Users } from "lucide-react";

export const TeamSkeleton = () => (
  <section className="container">
    <SectionHeader title="Nossa Equipe" icon={Users} />
    <div className="flex justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  </section>
);
