import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";

const menuItems = [
  { label: "Kuliner", to: "/kuliner" },
  { label: "Budaya", to: "/budaya" },
  { label: "Wisata", to: "/wisata" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 px-4 md:pt-6 md:px-6"
      >
        <nav className="flex items-center justify-between w-full max-w-2xl px-4 md:px-8 py-3 md:py-4 rounded-full bg-secondary shadow-md">
          <Link to="/" className="text-primary font-bold text-lg md:text-xl tracking-tight font-poppins shrink-0">
            Ngalam
          </Link>

          <div className="hidden md:flex items-center gap-1 md:gap-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-20 left-4 right-4 z-60 md:hidden bg-secondary rounded-3xl shadow-xl overflow-hidden"
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
                    onClick={() => setOpen(false)}
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
    </>
  );
}