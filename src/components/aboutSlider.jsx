import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";

const slides = [
  {
    id: 1,
    image: slide1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-[30px] md:h-[30px] shrink-0">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          fill="#128C3E"
          opacity="0.15"
        />
        <circle cx="8" cy="8" r="1.5" fill="#128C3E" />
        <line
          x1="11"
          y1="8"
          x2="18"
          y2="8"
          stroke="#128C3E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="8" cy="12" r="1.5" fill="#128C3E" />
        <line
          x1="11"
          y1="12"
          x2="18"
          y2="12"
          stroke="#128C3E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="8" cy="16" r="1.5" fill="#128C3E" />
        <line
          x1="11"
          y1="16"
          x2="16"
          y2="16"
          stroke="#128C3E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="17" cy="17" r="4" fill="#128C3E" />
        <path
          d="M15.5 17l1 1 2-2"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Kota Terbesar!",
    desc: (
      <>
        Kota Malang merupakan{" "}
        <span className="text-primary font-semibold">
          Kota terbesar Kedua di Jawa Timur
        </span>{" "}
        setelah Surabaya. Sebagai pusat ekonomi dan sosial di wilayah bagian
        selatan Jawa Timur.
      </>
    ),
  },
  {
    id: 2,
    image: slide2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-[30px] md:h-[30px] shrink-0">
        <rect
          x="4"
          y="2"
          width="13"
          height="18"
          rx="2"
          fill="#128C3E"
          opacity="0.2"
        />
        <rect
          x="4"
          y="2"
          width="13"
          height="18"
          rx="2"
          stroke="#128C3E"
          strokeWidth="1.5"
        />
        <line
          x1="7"
          y1="7"
          x2="14"
          y2="7"
          stroke="#128C3E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="7"
          y1="10"
          x2="14"
          y2="10"
          stroke="#128C3E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="7"
          y1="13"
          x2="11"
          y2="13"
          stroke="#128C3E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M17 4h1a2 2 0 012 2v14a2 2 0 01-2 2H8"
          stroke="#128C3E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Julukan Malang!",
    desc: (
      <>
        Malang memiliki julukan sebagai{" "}
        <span className="font-semibold text-primary">
          &quot;Kota Pendidikan&quot;
        </span>{" "}
        karena densitas perguruan tinggi yang sangat tinggi. Kota ini menjadi
        rumah bagi puluhan universitas, institut, dan politeknik, baik negeri
        maupun swasta.
      </>
    ),
  },
  {
    id: 3,
    image: slide3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-[30px] md:h-[30px] shrink-0">
        <rect
          x="4"
          y="2"
          width="13"
          height="18"
          rx="2"
          fill="#128C3E"
          opacity="0.2"
        />
        <rect
          x="4"
          y="2"
          width="13"
          height="18"
          rx="2"
          stroke="#128C3E"
          strokeWidth="1.5"
        />
        <line
          x1="7"
          y1="7"
          x2="14"
          y2="7"
          stroke="#128C3E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="7"
          y1="10"
          x2="14"
          y2="10"
          stroke="#128C3E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="7"
          y1="13"
          x2="11"
          y2="13"
          stroke="#128C3E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M17 4h1a2 2 0 012 2v14a2 2 0 01-2 2H8"
          stroke="#128C3E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Wisata di Malang!",
    desc: (
      <>
        Malang menjadi salah satu destinasi{" "}
        <span className="text-primary font-semibold">
          Wisata favorit untuk di kunjungi.
        </span>{" "}
        Selain suasananya yang ngangenin, tempat wisata di Malang juga ada
        banyak banget. Salah satu wisata terkenal di Malang adalah Jatim Park 1,
        2 & 3.
      </>
    ),
  },
];

const imageVariants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%" }),
  center: { x: 0 },
  exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%" }),
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.15 },
  },
};

export default function AboutSlider() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const prev = () => {
    setDir(-1);
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setDir(1);
    setIndex((i) => (i + 1) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <div className="relative w-full max-w-3xl mx-auto px-8 md:px-14">
      <div className="relative flex items-center">
        <button
          onClick={prev}
          className="w-10 h-10 md:w-[56px] md:h-[56px] flex items-center justify-center absolute -left-5 sm:-left-6 md:-left-12 z-10 rounded-full bg-primary text-secondary/80 hover:text-white hover:bg-green-700 scale-90 hover:scale-95 active:scale-80 transition-all duration-400 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={5} />
        </button>

        <div
          className="relative flex-1 rounded-3xl"
          style={{ border: "2px solid rgba(18, 140, 62, 0.4)", padding: "8px" }}
        >
          <div
            className="relative w-full overflow-hidden rounded-2xl aspect-[4/5] sm:aspect-square md:aspect-[4/3]"
          >
            <AnimatePresence custom={dir} initial={false}>
              <motion.div
                key={slide.id}
                custom={dir}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                <motion.div
                  key={`card-${slide.id}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute bottom-4 left-4 right-4 md:bottom-auto md:right-auto md:top-1/2 md:-translate-y-1/2 md:left-5 border-primary border-2 bg-secondary/95 md:bg-secondary backdrop-blur-sm md:backdrop-blur-none rounded-xl shadow-xl md:max-w-65 p-3 sm:p-4 md:py-[12px] md:px-[20px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="shrink-0">{slide.icon}</span>
                    <h3 className="font-bold font-poppins text-colortext text-sm md:text-base leading-tight">
                      {slide.title}
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs leading-relaxed md:text-sm md:leading-relaxed font-poppins text-gray-600 text-left">
                    {slide.desc}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={next}
          className="w-10 h-10 md:w-[56px] md:h-[56px] flex items-center justify-center absolute -right-5 sm:-right-6 md:-right-12 z-10 rounded-full bg-primary hover:bg-green-700 text-secondary/80 hover:text-white scale-90 hover:scale-95 active:scale-80 transition-all duration-400 shadow-lg"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={5} />
        </button>
      </div>

      <div className="mt-4 md:mt-6 flex justify-center gap-1">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDir(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-2 rounded-full transition-all duration-200 ${
              i === index ? "bg-primary w-6" : "bg-gray-300 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}