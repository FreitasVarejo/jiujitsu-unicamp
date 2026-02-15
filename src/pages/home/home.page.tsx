import { Link } from "react-router-dom";
import { Users, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionHeader } from "./_components/SectionHeader";
import { MemberCard, beltConfig } from "./_components/MemberCard";
import { mediaService, MemberInfo } from "@/services/mediaService";

const Home = () => {
  const [members, setMembers] = useState<MemberInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await mediaService.getAllMembers();
        const sorted = [...data].sort((a, b) => {
          const weightA = beltConfig[a.belt]?.weight || 0;
          const weightB = beltConfig[b.belt]?.weight || 0;
          return weightB - weightA;
        });
        setMembers(sorted);
      } catch (error) {
        console.error("Erro ao carregar membros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://placehold.co/1920x1080/1a1a1a/d26030?text=Jiu-Jitsu+Unicamp')",
          }}
        ></div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <img
            src={mediaService.getMediaUrl("/drive/logo.webp")}
            alt="Logo Jiu-Jitsu Unicamp"
            className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8 drop-shadow-2xl"
          />
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tighter">
            Jiu-Jitsu <span className="text-primary">Unicamp</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Defesa pessoal, competição e comunidade. Junte-se à equipe oficial
            da universidade.
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

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
