import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FAQ from './components/FAQ';
import Products from './components/Products';
import Events from './components/Events';
import Schedule from './components/Schedule';
import Team from './components/Team';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-white">
      <Header />
      <main>
        <Hero />
        <FAQ />
        <Products />
        <Events />
        <Schedule />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default App;