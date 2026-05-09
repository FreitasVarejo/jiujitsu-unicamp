import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon: LucideIcon;
}

export const SectionHeader = ({ title, icon: Icon }: SectionHeaderProps) => {
  return (
    <div className="mb-8 flex items-center gap-3">
      <Icon className="text-primary" size={32} />
      <h2 className="font-display text-4xl text-white">{title}</h2>
    </div>
  );
};
