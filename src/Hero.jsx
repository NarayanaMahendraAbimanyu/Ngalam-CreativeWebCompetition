import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import AboutSlider from "./components/aboutSlider";
import malangCity from "./assets/malang_city.png";
import cloud from "./assets/cloud.png";

const clouds = [
  {
    id: 1,
    bottom: "-20px",
    left: "-5%",
    width: "280px",
    duration: 4,
    delay: 0,
    amplitude: 10,
    from: "left",
  },
  {
    id: 2,
    bottom: "-50px",
    left: "3%",
    width: "300px",
    duration: 5,
    delay: 0.3,
    amplitude: 8,
    from: "left",
  },
  {
    id: 3,
    bottom: "-15px",
    left: "12%",
    width: "270px",
    duration: 3.8,
    delay: 0.1,
    amplitude: 12,
    from: "left",
  },
  {
    id: 4,
    bottom: "-45px",
    left: "20%",
    width: "290px",
    duration: 4.5,
    delay: 0.5,
    amplitude: 9,
    from: "left",
  },
  {
    id: 5,
    bottom: "-10px",
    left: "28%",
    width: "275px",
    duration: 3.5,
    delay: 0.2,
    amplitude: 11,
    from: "left",
  },
  {
    id: 6,
    bottom: "-55px",
    left: "36%",
    width: "295px",
    duration: 5,
    delay: 0.6,
    amplitude: 8,
    from: "left",
  },
  {
    id: 7,
    bottom: "-20px",
    left: "44%",
    width: "280px",
    duration: 4.2,
    delay: 0.4,
    amplitude: 10,
    from: "right",
  },
  {
    id: 8,
    bottom: "-50px",
    left: "52%",
    width: "300px",
    duration: 4.8,
    delay: 0.7,
    amplitude: 9,
    from: "right",
  },
  {
    id: 9,
    bottom: "-15px",
    left: "60%",
    width: "270px",
    duration: 5.5,
    delay: 0.3,
    amplitude: 7,
    from: "right",
  },
  {
    id: 10,
    bottom: "-45px",
    left: "68%",
    width: "290px",
    duration: 4.3,
    delay: 0.8,
    amplitude: 8,
    from: "right",
  },
  {
    id: 11,
    bottom: "-10px",
    left: "76%",
    width: "275px",
    duration: 5.2,
    delay: 0.5,
    amplitude: 6,
    from: "right",
  },
  {
    id: 12,
    bottom: "-55px",
    left: "84%",
    width: "295px",
    duration: 4.7,
    delay: 0.9,
    amplitude: 7,
    from: "right",
  },
  {
    id: 13,
    bottom: "-25px",
    left: "92%",
    width: "280px",
    duration: 5,
    delay: 0.6,
    amplitude: 8,
    from: "right",
  },
  {
    id: 14,
    bottom: "-80px",
    left: "-3%",
    width: "310px",
    duration: 4.5,
    delay: 0.2,
    amplitude: 7,
    from: "left",
  },
  {
    id: 15,
    bottom: "-75px",
    left: "16%",
    width: "300px",
    duration: 5,
    delay: 0.7,
    amplitude: 8,
    from: "left",
  },
  {
    id: 16,
    bottom: "-80px",
    left: "34%",
    width: "315px",
    duration: 4.8,
    delay: 0.4,
    amplitude: 6,
    from: "left",
  },
  {
    id: 17,
    bottom: "-75px",
    left: "52%",
    width: "305px",
    duration: 5.3,
    delay: 0.9,
    amplitude: 7,
    from: "right",
  },
  {
    id: 18,
    bottom: "-80px",
    left: "70%",
    width: "310px",
    duration: 4.6,
    delay: 0.6,
    amplitude: 8,
    from: "right",
  },
  {
    id: 19,
    bottom: "-75px",
    left: "88%",
    width: "300px",
    duration: 5.1,
    delay: 1.0,
    amplitude: 6,
    from: "right",
  },
];

function FadeInWhenVisible({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const sectionDuaRef = useRef(null);

  const scrollToSectionDua = () => {
    sectionDuaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-secondary">
      <div className="relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 pt-32 lg:pt-52 pb-48 max-w-6xl mx-auto gap-10">
          <div className="max-w-md w-full">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block text-sm font-poppins text-colortext px-4 py-3 rounded-full mb-2 shadow"
            >
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-colortext leading-tight"
            >
              Explore the <br /> City of{" "}
              <span className="text-primary relative inline-block">
                Malang
                <svg
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 left-0 w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 6 Q50 0 100 6 Q150 12 200 6"
                    stroke="#128C3E"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <polygon points="204,6 198,3 198,9" fill="#128C3E" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-5 text-colortext font-poppins text-sm md:text-base leading-relaxed"
            >
              Kota Malang dikenal sebagai pusat pendidikan, pariwisata, dan
              sejarah di kawasan Malang Raya.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex items-center gap-4"
            >
              <button
                onClick={scrollToSectionDua}
                className="bg-primary text-white font-poppins font-semibold px-6 py-3 lg:px-7 lg:py-3.5 rounded-full hover:bg-green-700 hover:-translate-y-1 transition-all shadow duration-200 text-sm md:text-base cursor-pointer"
              >
                Tentang Malang
              </button>
              <Link
                to="/wisata"
                className="flex items-center gap-2 font-poppins font-medium text-colortext bg-white/60 backdrop-blur-sm px-4 py-3 lg:px-5 lg:py-3.5 rounded-full hover:text-primary hover:-translate-y-1 shadow transition-all duration-200 text-sm md:text-base"
              >
                Lihat Wisata
                <span className="bg-primary text-white rounded-full w-6 h-6 lg:w-7 lg:h-7 flex items-center justify-center text-xs lg:text-sm">
                  ↗
                </span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="shrink-0 w-full lg:w-auto relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-3xl p-3"
              style={{ border: "2px solid rgba(18, 140, 62, 0.35)" }}
            >
              <img
                src={malangCity}
                alt="Malang City"
                className="w-full lg:w-120 h-72 lg:h-80 object-cover rounded-2xl"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-5 -left-6 bg-secondary rounded-2xl px-4 py-2 shadow-lg"
            >
              <p className="text-xl font-bold font-poppins text-primary">
                3,6 Juta
              </p>
              <p className="text-xs font-poppins text-gray-500">
                Jiwa Penduduk
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-4 -right-6 bg-secondary rounded-2xl px-4 py-2 shadow-lg"
            >
              <p className="text-xl font-bold font-poppins text-primary">50+</p>
              <p className="text-xs font-poppins text-gray-500">
                Destinasi Wisata
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="absolute -bottom-5 right-10 bg-secondary rounded-2xl px-4 py-2 shadow-lg"
            >
              <p className="text-xl font-bold font-poppins text-primary">30+</p>
              <p className="text-xs font-poppins text-gray-500">Makanan Khas</p>
            </motion.div>
          </motion.div>
        </div>

        <div
          className="relative w-full"
          style={{ height: "350px", marginTop: "-260px" }}
        >
          {clouds.map((c) => (
            <motion.img
              key={c.id}
              src={cloud}
              alt=""
              style={{
                position: "absolute",
                bottom: parseInt(c.bottom) + 100 + "px",
                left: c.left,
                width: c.width,
              }}
              className="hidden md:block"
              initial={{ x: c.from === "left" ? "-120%" : "120%", opacity: 0 }}
              animate={[
                {
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 1.2,
                    delay: c.delay * 0.5,
                    ease: "easeOut",
                  },
                },
                {
                  y: [0, -c.amplitude, 0],
                  transition: {
                    duration: c.duration,
                    delay: c.delay * 0.5 + 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                },
              ]}
            />
          ))}

          {[
            { left: "-5%", bottom: "120px", width: "22vw", from: "left" },
            { left: "8%", bottom: "100px", width: "20vw", from: "left" },
            { left: "18%", bottom: "118px", width: "21vw", from: "left" },
            { left: "28%", bottom: "95px", width: "22vw", from: "left" },
            { left: "38%", bottom: "115px", width: "20vw", from: "left" },
            { left: "48%", bottom: "100px", width: "21vw", from: "right" },
            { left: "58%", bottom: "118px", width: "22vw", from: "right" },
            { left: "68%", bottom: "95px", width: "20vw", from: "right" },
            { left: "78%", bottom: "115px", width: "21vw", from: "right" },
            { left: "88%", bottom: "100px", width: "22vw", from: "right" },
            { left: "-3%", bottom: "75px", width: "24vw", from: "left" },
            { left: "13%", bottom: "72px", width: "23vw", from: "left" },
            { left: "28%", bottom: "75px", width: "24vw", from: "left" },
            { left: "44%", bottom: "72px", width: "23vw", from: "right" },
            { left: "60%", bottom: "75px", width: "24vw", from: "right" },
            { left: "76%", bottom: "72px", width: "23vw", from: "right" },
            { left: "90%", bottom: "75px", width: "22vw", from: "right" },
          ].map((c, i) => (
            <motion.img
              key={`mobile-${i}`}
              src={cloud}
              alt=""
              className="block md:hidden"
              style={{
                position: "absolute",
                bottom: c.bottom,
                left: c.left,
                width: c.width,
              }}
              initial={{ x: c.from === "left" ? "-120%" : "120%", opacity: 0 }}
              animate={[
                {
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 1.2,
                    delay: i * 0.07,
                    ease: "easeOut",
                  },
                },
                {
                  y: [0, -6, 0],
                  transition: {
                    duration: 3.5 + i * 0.2,
                    delay: i * 0.07 + 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                },
              ]}
            />
          ))}
        </div>
      </div>

      <div
        ref={sectionDuaRef}
        className="px-8 lg:px-12 py-16 max-w-6xl mx-auto text-center"
      >
        <FadeInWhenVisible delay={0.1}>
          <h2 className="text-lg md:text-3xl font-bold font-poppins text-colortext mb-10">
            Mengenal <br />
            <span className="text-primary text-2xl md:text-5xl">
              KOTA MALANG
            </span>
          </h2>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.4}>
          <AboutSlider />
        </FadeInWhenVisible>
      </div>
    </div>
  );
}
