import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import ScrollToTop from './components/ScrollToTop';
import { Home, Eventos, Loja, EventoDetalhes } from './pages';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/evento/:id" element={<EventoDetalhes />} />
          <Route path="/loja" element={<Loja />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
