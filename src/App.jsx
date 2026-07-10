import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import NgalamChat from "./components/NgalamChat";
import Hero from "./Hero";
import Makanan from "./pages/makanan";
import Kuliner from "./pages/kuliner";
import Budaya from "./pages/budaya";
import Wisata from "./pages/wisata";

export default function App() {
  return (
    <>

      <Navbar />
      <NgalamChat />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/makanan" element={<Makanan />} />
        <Route path="/kuliner" element={<Kuliner />} />
        <Route path="/budaya" element={<Budaya />} />
        <Route path="/wisata" element={<Wisata />} />
      </Routes>
    </>
  );
}
