import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  icon: LucideIcon;
}

export const SectionHeader = ({ title, icon: Icon }: SectionHeaderProps) => {
  return (
    <div className="flex items-center gap-3 mb-8">
      <Icon className="text-primary" size={32} />
      <h2 className="text-4xl font-display text-white">{title}</h2>
    </div>
  );
};
