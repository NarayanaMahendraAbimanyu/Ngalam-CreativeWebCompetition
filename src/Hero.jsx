import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import AboutSlider from "./components/aboutSlider";
import Footer from "./components/footer";
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
  const navigate = useNavigate();
  const sectionDuaRef = useRef(null);
  const canvasRef = useRef(null);

  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSectionDua = () => {
    sectionDuaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let dots = [];

    const spacing = 26;
    const radius = 2;
    const maxDistance = 100;
    const pushStrength = 0.4;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initDots();
    };

    const initDots = () => {
      dots = [];
      const cols = Math.floor(canvas.width / spacing);
      const rows = Math.floor(canvas.height / spacing);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          dots.push({
            baseX: i * spacing,
            baseY: j * spacing,
            x: i * spacing,
            y: j * spacing,
          });
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(18, 140, 62, 0.8)";

      dots.forEach((dot) => {
        const dx = mouse.current.x - dot.baseX;
        const dy = mouse.current.y - dot.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetX = dot.baseX;
        let targetY = dot.baseY;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          targetX = dot.baseX - dx * force * pushStrength;
          targetY = dot.baseY - dy * force * pushStrength;
        }

        dot.x += (targetX - dot.x) * 0.15;
        dot.y += (targetY - dot.y) * 0.15;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;

    if (e.target.closest('button, a, [role="button"]')) {
      mouse.current = { x: -1000, y: -1000 };
      return;
    }

    const rect = canvasRef.current.getBoundingClientRect();
    mouse.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mouse.current = { x: -1000, y: -1000 };
  };

  return (
    <div className="bg-secondary">
      <div
        className="relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 85%)",
            maskImage: "linear-gradient(to bottom, black 65%, transparent 85%)",
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 pt-32 lg:pt-52 pb-48 max-w-6xl mx-auto gap-10">
          <div className="max-w-md w-full">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block text-sm font-poppins text-colortext px-4 py-3 rounded-full mb-2 shadow"
            />

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
              <span className="text-[#4A2E1B] block">Explore the</span>
              <span className="text-[#4A2E1B] block">City of</span>
              <span className="text-[#14532d] block">Malang</span>
            </h1>

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
                className="bg-primary text-white font-poppins font-semibold px-6 py-3 lg:px-7 lg:py-3.5 rounded-full hover:bg-green-700 hover:-translate-y-1 transition-all shadow duration-200 text-sm md:text-base cursor-pointer relative z-20"
              >
                Tentang Malang
              </button>
              <a href="/wisata" className="bg-white text-[#14532d] font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all flex items-center gap-3 border border-gray-100">
                Lihat Wisata
                <span className="bg-[#14532d] text-white rounded-full p-1.5 flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
              </a>
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
              className="absolute -bottom-5 -left-6 bg-white rounded-2xl px-4 py-2 shadow-lg"
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
              className="absolute top-4 -right-6 bg-white rounded-2xl px-4 py-2 shadow-lg"
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
              className="absolute -bottom-5 right-10 bg-white rounded-2xl px-4 py-2 shadow-lg"
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

      <div className="w-full bg-[#F8F4E1] py-24 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 border-b border-emerald-900/10 pb-8">
            <div className="w-full md:w-1/2">
              <span className="text-[#14532d] font-bold tracking-widest uppercase mb-2 inline-block text-sm">
                Berita & Agenda
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#14532d] leading-tight">
                Prestasi Terkini
              </h2>
            </div>
            <div className="w-full md:w-1/2 md:pt-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                Kota Malang terus berkomitmen mengukir sejarah melalui berbagai
                inovasi dan penghargaan di tingkat nasional, menjadikannya kota
                cerdas yang terus maju.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden group shadow-lg h-[400px] lg:h-[450px]">
              <img
                src="https://malangkota.go.id/wp-content/uploads/2025/12/1232-370x280.jpeg"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="PPA Award"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14532d]/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-emerald-200 text-sm font-bold mb-2">Jul, 8 2026</p>
                <h3 className="text-3xl font-bold text-white mb-4 leading-snug">
                  Penghargaan PPA Award Nasional
                </h3>
                <p className="text-emerald-50/90 text-sm mb-4 line-clamp-2">
                  Pemerintah Kota Malang berhasil meraih dua penghargaan bergengsi dari Kementerian Dalam Negeri RI atas kinerja luar biasa dalam tata kelola pemerintahan.
                </p>
                <a
                  href="https://malangkota.go.id/2025/12/01/raih-dua-penghargaan-kemendagri-ri-apresiasi-kinerja-pemkot-malang/"
                  className="inline-flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm border border-white/30 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-white/40 transition-colors"
                >
                  Lihat ➔
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-8 h-[450px]">
              <div className="flex-1 flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-lg group">
                <div className="w-full sm:w-2/5 h-40 sm:h-full overflow-hidden">
                  <img
                    src="https://malangkota.go.id/wp-content/uploads/2025/11/IMG_20251108_081545-370x280.jpg"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Perpamsi"
                  />
                </div>
                <div className="w-full sm:w-3/5 p-6 flex flex-col justify-center">
                  <p className="text-gray-400 text-xs font-bold mb-2">Jul, 7 2026</p>
                  <h3 className="text-lg font-bold text-[#14532d] mb-4 leading-snug">
                    Penghargaan Perpamsi Terbaik
                  </h3>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                    Kota Malang kembali menorehkan prestasi dengan meraih penghargaan Inovasi Membangun Negeri 2025 berkat program kreatif berkelanjutan.
                  </p>
                  <a
                    href="https://malangkota.go.id/2025/11/08/kota-malang-raih-penghargaan-inovasi-membangun-negeri-2025/"
                    className="text-[#14532d] font-bold hover:text-emerald-600 flex items-center gap-1 text-sm w-fit"
                  >
                    Lihat ➔
                  </a>
                </div>
              </div>

              <div className="flex-1 flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-lg group">
                <div className="w-full sm:w-2/5 h-40 sm:h-full overflow-hidden">
                  <img
                    src="https://malangkota.go.id/wp-content/uploads/2025/11/detikJatim-Award-2025.-370x280.jpg"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Inovasi"
                  />
                </div>
                <div className="w-full sm:w-3/5 p-6 flex flex-col justify-center">
                  <p className="text-gray-400 text-xs font-bold mb-2">Jul, 7 2026</p>
                  <h3 className="text-lg font-bold text-[#14532d] mb-4 leading-snug">
                    Inovasi Layanan Publik Unggulan
                  </h3>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                    Melalui program 1.000 Event, Pemkot Malang sukses menyabet Anugerah Program Ekonomi Terpuji yang berdampak signifikan pada kemajuan lokal.
                  </p>
                  <a
                    href="https://malangkota.go.id/2025/11/05/galakkan-1-000-event-pemkot-malang-raih-anugerah-program-ekonomi-terpuji/"
                    className="text-[#14532d] font-bold hover:text-emerald-600 flex items-center gap-1 text-sm w-fit"
                  >
                    Lihat ➔
                  </a>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://malangkota.go.id/category/berita/prestasi-dan-inovasi/"
            className="flex justify-between items-center w-full bg-[#e2f1e8] text-[#14532d] px-8 py-5 rounded-xl hover:bg-[#d1e8d9] transition-colors shadow-sm font-bold text-lg"
          >
            <span>Prestasi Lainnya</span>
            <span className="text-xl">❯</span>
          </a>
        </div>
      </div>

      <div className="w-full bg-[#F8F4E1] pb-24 px-8 md:px-24">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight mb-4">
            Temukan destinasimu <span className="text-[#14532d]">di Malang</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl font-medium">
            Jelajahi berbagai pilihan wisata memukau yang telah kami kurasi khusus untuk pengalaman liburan tak terlupakan Anda di Malang Raya.
          </p>
        </div>
        <div className="max-w-7xl mx-auto mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Pilih Destinasi Anda</h3>
        </div>
        <div className="max-w-7xl mx-auto flex overflow-x-auto gap-5 pb-8 hide-scrollbar snap-x cursor-grab">
          <a href="/wisata" className="min-w-[280px] md:min-w-[320px] h-[220px] relative rounded-3xl overflow-hidden snap-center flex-shrink-0 group shadow-lg">
            <img src="https://cdn1-production-images-kly.akamaized.net/DomYxhCBoq9cI7i9C4zyaa0w8Os=/500x281/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4121342/original/002781100_1660277512-Gunung_Bromo.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Alam" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-6 left-6"><span className="text-white font-bold text-3xl tracking-wide">Alam</span></div>
          </a>
          <a href="/budaya" className="min-w-[280px] md:min-w-[320px] h-[220px] relative rounded-3xl overflow-hidden snap-center flex-shrink-0 group shadow-lg">
            <img src="https://malang.disway.id/upload/188f5262a0a59feafb2dc6aa648210b9.jpeg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Budaya" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-6 left-6"><span className="text-white font-bold text-3xl tracking-wide">Budaya</span></div>
          </a>
          <a href="/budaya" className="min-w-[280px] md:min-w-[320px] h-[220px] relative rounded-3xl overflow-hidden snap-center flex-shrink-0 group shadow-lg">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjHLRnYRjBJnxPnY-bQklmn-RhnplxwRZ_0a5kEXGy_hsKRL9Dz1OE5I0&s=10" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Sejarah" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-6 left-6"><span className="text-white font-bold text-3xl tracking-wide">Sejarah</span></div>
          </a>
          <a href="/kuliner" className="min-w-[280px] md:min-w-[320px] h-[220px] relative rounded-3xl overflow-hidden snap-center flex-shrink-0 group shadow-lg">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6TshJVpTPBgelYvx99vFyDk8YZWttk2aVTb_-5o-cQv9NgPphu0gQ4-9m&s=10" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Kuliner" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-6 left-6"><span className="text-white font-bold text-3xl tracking-wide">Kuliner</span></div>
          </a>
          <a href="/wisata" className="min-w-[220px] h-[220px] bg-white border border-gray-200 rounded-3xl snap-center flex-shrink-0 flex flex-col items-center justify-center hover:border-[#14532d] hover:shadow-xl transition-all group">
            <span className="text-5xl text-gray-300 group-hover:text-[#14532d] mb-2 leading-none tracking-widest">...</span>
            <span className="text-xl font-bold text-gray-800 group-hover:text-[#14532d]">Lainnya</span>
          </a>
        </div>
      </div>

      <div className="w-full bg-[#F8F4E1] px-8 md:px-24 pb-24">
        <div className="max-w-7xl mx-auto bg-[#14532d] rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          <div className="p-12 md:p-16 flex-1 flex flex-col justify-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-10 leading-tight">Temukan hal baru<br/>anda di Malang</h2>
            <div className="flex flex-col gap-5 text-emerald-50 text-lg font-medium mb-12">
              <div className="flex items-center gap-4"><div className="bg-white text-[#14532d] rounded-full p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div> Eksplorasi Digital Tanpa Batas</div>
              <div className="flex items-center gap-4"><div className="bg-white text-[#14532d] rounded-full p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div> Peta Wisata Interaktif Real-time</div>
              <div className="flex items-center gap-4"><div className="bg-white text-[#14532d] rounded-full p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div> Tour Guide AI Personal (Ngalam Chat)</div>
              <div className="flex items-center gap-4"><div className="bg-white text-[#14532d] rounded-full p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div> Rincian Biaya & Akses Termudah</div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="/wisata" className="bg-[#F8F4E1] text-[#14532d] font-bold py-3 px-8 rounded-full hover:bg-white transition-colors shadow-md text-center">Cari destinasimu</a>
              <a href="/budaya" className="bg-transparent border-2 border-[#F8F4E1] text-[#F8F4E1] font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors text-center">Cari di malang</a>
            </div>
          </div>
          <div className="w-full lg:w-[45%] h-[400px] lg:h-auto">
            <img src="https://tugujatim.id/wp-content/uploads/2021/09/333ddf83-dbe8-44fb-b02c-1f02d1f8ac73.jpg" alt="Eksplorasi Malang" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
}
