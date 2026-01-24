import React from 'react';
import { SCHEDULE } from '../constants';

const Schedule: React.FC = () => {
  return (
    <section id="horarios" className="py-24 bg-background-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h2 className="text-4xl font-black mb-12 text-center uppercase tracking-tight">Horários e Localização</h2>
        
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Schedule Table */}
          <div className="lg:col-span-7 overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-accent-red text-left">
                  <th className="p-4 font-bold text-white uppercase text-xs tracking-widest">Horário</th>
                  <th className="p-4 font-bold text-white uppercase text-xs tracking-widest">Seg / Qua / Sex</th>
                  <th className="p-4 font-bold text-white uppercase text-xs tracking-widest">Ter / Qui</th>
                </tr>
              </thead>
              <tbody className="text-slate-300 bg-surface-dark">
                {SCHEDULE.map((item, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-primary whitespace-nowrap">{item.time}</td>
                    <td className="p-4">{item.mwf}</td>
                    <td className="p-4">{item.tt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Location Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-dark border border-white/10 rounded-xl p-6 h-full hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <h3 className="font-bold text-lg">Como chegar</h3>
              </div>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Estamos localizados no Ginásio Multidisciplinar da Unicamp (GMU). A entrada é pela lateral esquerda, sala de lutas 02.
              </p>
              
              <div className="rounded-lg overflow-hidden h-48 bg-zinc-900 flex items-center justify-center border border-white/10 relative group">
                 {/* Map Placeholder or Interactive Map */}
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=-22.814, -47.065&zoom=15&size=600x300&sensor=false')] bg-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
                <div className="text-center p-4 relative z-10 bg-black/60 rounded-xl backdrop-blur-sm border border-white/10">
                  <span className="material-symbols-outlined text-4xl text-primary mb-2">map</span>
                  <p className="text-xs uppercase tracking-widest text-slate-300 font-bold">Ginásio GMU</p>
                  <p className="text-[10px] text-slate-400 mt-1">Barão Geraldo, Campinas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;