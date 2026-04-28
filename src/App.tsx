import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { Home, EventsPage, Loja, EventDetailsPage, NotFound } from "./pages";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventos" element={<EventsPage />} />
          <Route path="/evento/:id" element={<EventDetailsPage />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
