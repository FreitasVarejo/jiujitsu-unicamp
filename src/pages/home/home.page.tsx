import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { data } from '@/data';
import { SectionHeader } from './_components/SectionHeader';
import { MemberCard, beltConfig } from './_components/MemberCard';

const Home = () => {
  const sortedMembers = [...data.equipe].sort((a, b) => {
    const weightA = beltConfig[a.faixa]?.weight || 0;
    const weightB = beltConfig[b.faixa]?.weight || 0;
    return weightB - weightA;
  });

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://placehold.co/1920x1080/1a1a1a/d26030?text=Jiu-Jitsu+Unicamp')" }}
        ></div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tighter">
            Jiu-Jitsu <span className="text-primary">Unicamp</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Defesa pessoal, competição e comunidade. Junte-se à equipe oficial da universidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/treinos"
              className="px-8 py-4 bg-primary text-white font-display uppercase tracking-widest text-lg hover:bg-orange-700 transition-colors rounded"
            >
              Ver Treinos
            </Link>
            <Link
              to="/guia"
              className="px-8 py-4 border border-white text-white font-display uppercase tracking-widest text-lg hover:bg-white/10 transition-colors rounded"
            >
              Guia do Iniciante
            </Link>
          </div>
        </div>
      </section>

      {/* Equipe Section */}
      <section className="container mx-auto px-4">
        <SectionHeader title="Nossa Equipe" icon={Users} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedMembers.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
