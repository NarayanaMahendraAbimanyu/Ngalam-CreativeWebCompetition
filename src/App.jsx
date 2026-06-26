import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/navbar";
import Hero from "./Hero";
import Makanan from "./pages/makanan";
import Budaya from "./pages/budaya";
import Wisata from "./pages/wisata";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/makanan" element={<Makanan />} />
        <Route path="/budaya" element={<Budaya />} />
        <Route path="/wisata" element={<Wisata />} />
      </Routes>
    </>
  );
}
