import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Exposiciones from "./pages/Exposiciones";
import Exposicion from "./pages/Exposicion";
import Artistas from "./pages/Artistas";
import Artista from "./pages/Artista";
import Agenda from "./pages/Agenda";
import Tienda from "./pages/Tienda";
import Membresia from "./pages/Membresia";
import Info from "./pages/Info";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/exposiciones" element={<Exposiciones />} />
        <Route path="/exposicion/:id" element={<Exposicion />} />
        <Route path="/artistas" element={<Artistas />} />
        <Route path="/artista/:id" element={<Artista />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/membresia" element={<Membresia />} />
        <Route path="/info" element={<Info />} />
      </Route>
    </Routes>
  );
}
