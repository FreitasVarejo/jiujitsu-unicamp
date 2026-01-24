import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105" 
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('https://www.proec.unicamp.br/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-20-at-15.30.04.jpeg#/')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight">
          DOMINE A ARTE <br className="md:hidden" />
          SUAVE NA <span className="text-primary">UNICAMP</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          A maior comunidade de Brazilian Jiu-Jitsu universitário. Treinos de alto nível, integração e disciplina para alunos de todos os cursos.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" className="flex items-center gap-2 bg-primary text-white font-black px-8 py-4 rounded-xl text-lg hover:bg-white hover:text-background-dark transition-all shadow-lg hover:shadow-primary/50">
            <span className="material-symbols-outlined">chat</span>
            Entre no grupo do WhatsApp
          </a>
          <a href="#horarios" className="px-8 py-4 border-2 border-white/20 hover:border-primary rounded-xl font-bold transition-all hover:bg-white/5">
            Ver Horários
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;