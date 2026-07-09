import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react'; // Menggunakan ikon profesional bawaan lucide

export default function LoadingScreen() {
  const textLoading = ["M", "E", "M", "U", "A", "T", ".", ".", "."];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      // z-40 diletakkan di bawah Navbar (z-50)
      // bg color dengan opacity dan backdrop-blur menciptakan efek Glassmorphism
      className="fixed inset-0 z-40 bg-[#F8F4E1]/50 backdrop-blur-md flex flex-col items-center justify-center font-poppins"
    >
      
      {/* Container Animasi Ikon Peta */}
      <div className="relative flex items-center justify-center mb-8 h-24 w-24">
        
        {/* Efek Gelombang (Ripple) Elegan - Hanya 1 warna agar selaras */}
        <motion.div
          className="absolute w-16 h-16 bg-[#128C3E] rounded-full"
          animate={{ scale: [1, 2.2], opacity: [0.25, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        
        {/* Ikon Utama - Desain bersih dan solid */}
        <motion.div
          className="relative z-10 w-14 h-14 bg-[#128C3E] rounded-full flex items-center justify-center shadow-lg border-2 border-white/80"
          animate={{ y: ["-10%", "10%"] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <MapPin size={26} strokeWidth={2.5} className="text-white" />
        </motion.div>
        
      </div>

      {/* Animasi Teks dengan Efek Fade In-Out yang Halus (Tidak loncat-loncat) */}
      <div className="flex gap-[2px] text-[#543310] font-bold text-sm md:text-base tracking-[0.15em] ml-2 uppercase">
        {textLoading.map((letter, index) => (
          <motion.span
            key={index}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ 
              duration: 1.2, 
              repeat: Infinity, 
              delay: index * 0.1,
              ease: "easeInOut" 
            }}
            className={letter === "." ? "text-[#128C3E]" : ""}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      
    </motion.div>
  );
}