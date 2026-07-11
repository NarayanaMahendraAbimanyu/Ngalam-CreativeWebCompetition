import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import LoadingScreen from "./LoadingScreen"; // Pastikan path ini sesuai

const menuItems = [
  { label: "Kuliner", to: "/kuliner" },
  { label: "Budaya", to: "/budaya" },
  { label: "Wisata", to: "/wisata" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false); 
  const navigate = useNavigate();

  // Mendeteksi scroll layar untuk mengubah bentuk navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi navigasi dengan jeda yang lebih profesional (1.5 detik)
  const handleNavigation = (e, path) => {
    e.preventDefault(); 
    setOpen(false); 
    setIsNavigating(true); 

    setTimeout(() => {
      navigate(path); 
      setIsNavigating(false); 
    }, 1500); // Durasi diperlama menjadi 1500ms agar lebih smooth
  };

  return (
    <>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-300 ${
          isScrolled ? "pt-0 px-0" : "pt-4 px-4 md:pt-6 md:px-6"
        }`}
      >
        <nav
          className={`flex items-center justify-between w-full mx-auto px-4 md:px-8 py-3 md:py-4 transition-all duration-300 ${
            isScrolled
              ? "max-w-full rounded-none bg-white shadow-md"
              : "max-w-2xl rounded-full bg-white shadow-md"
          }`}
        >
          <Link 
            to="/" 
            onClick={(e) => handleNavigation(e, "/")}
            className="text-primary font-bold text-lg md:text-xl tracking-tight font-poppins shrink-0"
          >
            Ngalam
          </Link>

          {/* PERBAIKAN: onMouseLeave dipindah ke parent container (div) 
            agar efek hover tidak terputus (menjadi null) saat berpindah antar link.
          */}
          <div 
            className="hidden md:flex items-center gap-1 md:gap-2 relative"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={(e) => handleNavigation(e, item.to)} 
                onMouseEnter={() => setHoveredPath(item.to)}
                className={({ isActive }) =>
                  isActive
                    ? "relative px-2.5 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium font-poppins text-white z-10"
                    : "relative px-2.5 md:px-4 py-1.5 md:py-2 text-sm font-bold font-poppins text-colortext z-10 hover:text-primary transition-colors duration-200"
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-primary rounded-xl"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {hoveredPath === item.to && (
                      <motion.div
                        layoutId="hover-pill"
                        className="absolute inset-0 bg-primary/15 rounded-xl"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/40 transition-colors duration-200"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} strokeWidth={2} className="text-colortext" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} strokeWidth={3} className="text-colortext" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            /* PERUBAHAN: bg-secondary diganti menjadi bg-white agar warna popup putih solid */
            className="fixed top-20 left-4 right-4 z-60 md:hidden bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="flex flex-col py-2">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.2 }}
                >
                  <NavLink
                    to={item.to}
                    onClick={(e) => handleNavigation(e, item.to)} 
                    className={({ isActive }) =>
                      `block w-full text-center py-5 text-base font-bold font-poppins tracking-widest uppercase border-b border-black/8 last:border-b-0 transition-colors duration-200 ${
                        isActive ? "text-primary" : "text-colortext hover:text-primary"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-55 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Loading Screen Overlay Global */}
      <AnimatePresence>
        {isNavigating && <LoadingScreen />}
      </AnimatePresence>
    </>
  );
}