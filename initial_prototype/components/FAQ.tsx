import React from 'react';

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-background-dark border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Intro & Quick Cards */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">O que preciso para começar?</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Nunca treinou? Sem problemas. O BJJ Unicamp é o lugar perfeito para dar seus primeiros passos. Preparamos um guia rápido para facilitar sua integração.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-accent-red/10 border border-accent-red/30 rounded-xl hover:bg-accent-red/20 transition-colors">
                <span className="material-symbols-outlined text-primary mb-3 text-3xl">check_circle</span>
                <h4 className="font-bold mb-1">Iniciantes</h4>
                <p className="text-sm text-slate-400">Turmas específicas para todos os níveis.</p>
              </div>
              <div className="p-6 bg-accent-red/10 border border-accent-red/30 rounded-xl hover:bg-accent-red/20 transition-colors">
                <span className="material-symbols-outlined text-primary mb-3 text-3xl">dry_cleaning</span>
                <h4 className="font-bold mb-1">Vestimenta</h4>
                <p className="text-sm text-slate-400">Kimono ou roupa esportiva leve.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="flex flex-col gap-4">
            <details className="group bg-surface-dark border border-white/10 rounded-xl overflow-hidden transition-all open:ring-1 open:ring-primary/50" open>
              <summary className="flex cursor-pointer items-center justify-between p-6 list-none hover:bg-white/5 transition-colors">
                <p className="text-lg font-bold">Preciso de Kimono para a primeira aula?</p>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-primary">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                Não! Para as aulas experimentais, você pode vir de calça legging/bermuda e camiseta. Posteriormente, o uso do Kimono é obrigatório para as aulas de pano.
              </div>
            </details>

            <details className="group bg-surface-dark border border-white/10 rounded-xl overflow-hidden transition-all open:ring-1 open:ring-primary/50">
              <summary className="flex cursor-pointer items-center justify-between p-6 list-none hover:bg-white/5 transition-colors">
                <p className="text-lg font-bold">Como funcionam as aulas?</p>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-primary">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                Nossas aulas são divididas em aquecimento funcional, técnica do dia e "rola" (luta prática supervisionada). Iniciantes focam na defesa pessoal e fundamentos.
              </div>
            </details>

            <details className="group bg-surface-dark border border-white/10 rounded-xl overflow-hidden transition-all open:ring-1 open:ring-primary/50">
              <summary className="flex cursor-pointer items-center justify-between p-6 list-none hover:bg-white/5 transition-colors">
                <p className="text-lg font-bold">Valores e Inscrição</p>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-primary">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                Sendo um grupo universitário, buscamos os menores valores possíveis para alunos Unicamp. Entre no nosso grupo para consultar a tabela atualizada de taxas semestrais.
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;