import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Mail,
  Cake as CakeIcon,
  Camera,
  ChevronDown,
  PartyPopper,
  Gift,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { config } from "./config";
import { Button } from "./components/Button";

/* ---------- helpers ---------- */
function getTarget() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let target = new Date(now.getFullYear(), config.birthday.month - 1, config.birthday.day);
  const isToday = target.getTime() === today.getTime();
  if (target < today) target = new Date(now.getFullYear() + 1, config.birthday.month - 1, config.birthday.day);
  return { target, isToday };
}

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- starfield ---------- */
function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.2,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 5,
      })),
    []
  );
  return (
    <div className="stars">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- section divider ---------- */
function Divider({ icon: Icon }) {
  return (
    <div className="divider text-sm">
      <Icon size={18} strokeWidth={1.5} />
    </div>
  );
}

/* ---------- floating accents ---------- */
function Floaties() {
  const icons = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        Icon: i % 3 === 0 ? Sparkles : Heart,
        left: Math.random() * 100,
        size: 12 + Math.random() * 16,
        duration: 10 + Math.random() * 10,
        delay: -Math.random() * 16,
      })),
    []
  );
  return icons.map(({ id, Icon, left, size, duration, delay }) => (
    <span
      key={id}
      className="floaty"
      style={{ left: `${left}%`, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <Icon size={size} strokeWidth={1.5} fill="currentColor" fillOpacity={0.25} />
    </span>
  ));
}

/* ---------- confetti ---------- */
function Confetti({ burst }) {
  const colors = ["#e2b79d", "#d8a0c0", "#a6b4d8", "#deb487", "#c98e9e"];
  const pieces = useMemo(
    () =>
      burst === 0
        ? []
        : Array.from({ length: 90 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            color: colors[i % colors.length],
            duration: 2.5 + Math.random() * 2.5,
            delay: Math.random() * 0.8,
            round: Math.random() > 0.5,
          })),
    [burst]
  );
  return pieces.map((p) => (
    <span
      key={`${burst}-${p.id}`}
      className="confetti"
      style={{
        left: `${p.left}%`,
        background: p.color,
        borderRadius: p.round ? "50%" : "2px",
        animationDuration: `${p.duration}s`,
        animationDelay: `${p.delay}s`,
      }}
    />
  ));
}

/* ---------- countdown ---------- */
function Countdown() {
  const [{ target, isToday }] = useState(getTarget);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (isToday) {
    return (
      <p className="pop flex items-center gap-2 text-xl font-medium text-[#e2b79d]">
        <PartyPopper size={22} /> Hari ni hari kau!
      </p>
    );
  }
  const diff = Math.max(0, target.getTime() - now);
  const units = [
    ["Hari", Math.floor(diff / 864e5)],
    ["Jam", Math.floor(diff / 36e5) % 24],
    ["Min", Math.floor(diff / 6e4) % 60],
    ["Saat", Math.floor(diff / 1e3) % 60],
  ];
  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {units.map(([label, v]) => (
        <div key={label} className="glass w-16 sm:w-20 rounded-2xl py-3">
          <div className="accent-text font-display text-2xl sm:text-3xl font-medium tabular-nums">
            {String(v).padStart(2, "0")}
          </div>
          <div className="text-[11px] uppercase tracking-widest text-white/50">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- cake ---------- */
function Cake({ blown, onBlow }) {
  return (
    <svg
      viewBox="0 0 200 190"
      className="w-56 mx-auto cursor-pointer select-none bob"
      onClick={onBlow}
      role="button"
      aria-label="Tiup lilin"
    >
      <ellipse cx="100" cy="176" rx="85" ry="10" fill="#000" opacity=".3" />
      <rect x="30" y="115" width="140" height="55" rx="10" fill="#c98e9e" />
      <rect x="50" y="75" width="100" height="45" rx="10" fill="#d8a0c0" />
      <path d="M30 125 q10 14 20 0 q10 14 20 0 q10 14 20 0 q10 14 20 0 q10 14 20 0 q10 14 20 0 q10 14 20 0 v-10 h-140z" fill="#f4f1ec" opacity=".92" />
      <path d="M50 85 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 v-10 h-96z" fill="#f4f1ec" opacity=".92" />
      <rect x="96" y="47" width="8" height="30" rx="2" fill="#e2b79d" />
      {!blown && (
        <g className="flame">
          <ellipse cx="100" cy="36" rx="7" ry="12" fill="#deb487" />
          <ellipse cx="100" cy="40" rx="3.5" ry="6" fill="#fff7ed" />
        </g>
      )}
      {blown && <path d="M100 42 q-6 -12 4 -24" stroke="#cbd5e1" strokeWidth="2" fill="none" opacity=".6" />}
    </svg>
  );
}

/* ---------- photo fan (hero) ---------- */
const fanSlots = [
  { width: "w-[38%]", layout: "-mr-6 z-10", rotate: -6, ty: 20 },
  { width: "w-[42%]", layout: "z-20", rotate: 0, ty: -10 },
  { width: "w-[38%]", layout: "-ml-6 z-10", rotate: 6, ty: 20 },
];

function PhotoFan({ photos }) {
  const slots = [0, 1, 2].map((i) => photos[i] ?? null);
  return (
    <motion.div
      className="relative mx-auto flex w-full max-w-md items-center justify-center"
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {slots.map((p, i) => {
        const slot = fanSlots[i];
        return (
          <motion.div
            key={i}
            className={`relative aspect-[4/5] shrink-0 overflow-hidden rounded-2xl shadow-2xl outline outline-white/10 ${slot.width} ${slot.layout}`}
            style={{ rotate: slot.rotate, y: slot.ty }}
          >
            {p?.src ? (
              <img src={p.src} alt={p.caption || ""} className="size-full object-cover" loading="lazy" />
            ) : (
              <div className="flex size-full items-center justify-center bg-gradient-to-br from-white/10 to-white/0 text-white/30">
                <Camera size={28} strokeWidth={1.25} />
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ---------- splash screen ---------- */
function Splash({ onOpen }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-[#0f0e13] px-6 text-center"
      exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="aurora" />
      <div className="grain" />
      <Stars />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <motion.span
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#e2b79d]"
        >
          <Heart size={38} strokeWidth={1.25} fill="currentColor" fillOpacity={0.2} />
        </motion.span>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Untuk</p>
          <h1 className="font-display italic text-3xl sm:text-4xl text-balance mt-2">
            <span className="accent-text">{config.name}</span>
          </h1>
        </div>

        <p className="max-w-xs text-sm text-white/50 text-balance">
          Ada sesuatu yang istimewa menanti kau...
        </p>

        <Button onClick={onOpen} className="mt-2">
          <Gift size={16} /> Buka
        </Button>
      </motion.div>
    </motion.div>
  );
}

/* ---------- app ---------- */
export default function App() {
  const [blown, setBlown] = useState(false);
  const [burst, setBurst] = useState(0);
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = !opened || lightbox !== null ? "hidden" : "";
  }, [opened, lightbox]);

  const openSite = () => {
    setOpened(true);
    audioRef.current?.play().catch(() => {});
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying((p) => !p);
  };

  const blow = () => {
    if (blown) { setBlown(false); return; }
    setBlown(true);
    setBurst((b) => b + 1);
  };

  const photos = config.photos.length
    ? config.photos
    : Array.from({ length: 6 }, (_, i) => ({ src: null, caption: `Gambar ${i + 1}` }));

  const tilts = useMemo(
    () => photos.map(() => (Math.random() * 6 - 3).toFixed(1)),
    [photos.length]
  );

  return (
    <div className="font-sans min-h-screen relative">
      <AnimatePresence>{!opened && <Splash onOpen={openSite} />}</AnimatePresence>

      {config.music && <audio ref={audioRef} src={config.music} loop preload="auto" />}

      {opened && config.music && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleMusic}
          className="glass fixed bottom-5 right-5 z-50 rounded-full p-3 text-white/70 hover:text-white"
          aria-label={playing ? "Pause muzik" : "Main muzik"}
        >
          {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </motion.button>
      )}

      <div className="aurora" />
      <div className="grain" />
      <Stars />
      <Floaties />
      <Confetti burst={burst} />

      {/* Hero */}
      <header className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 gap-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-white/60"
        >
          <Sparkles size={14} /> Genap {config.age} Tahun
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl font-medium leading-tight text-balance"
        >
          Happy Birthday,
          <br />
          <span className="accent-text italic">{config.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md text-sm sm:text-base text-white/60 text-balance"
        >
          Selamat ulang tahun ke-{config.age} buat insan yang sentiasa menceriakan dan memberi makna dalam hidup saya setiap hari.
        </motion.p>

        <Countdown />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#letter">
            <Button>
              <Mail size={16} /> Baca Surat
            </Button>
          </a>
          <a href="#gallery">
            <Button variant="outline">
              <Camera size={16} /> Senyuman Manismu
            </Button>
          </a>
        </motion.div>

        <PhotoFan photos={photos} />

        <a href="#letter" className="mt-2 text-white/40 bob">
          <ChevronDown size={20} />
        </a>
      </header>

      {/* Letter */}
      <section id="letter" className="relative z-10 max-w-xl mx-auto px-6 py-24">
        <Reveal className="mb-10">
          <Divider icon={Mail} />
        </Reveal>
        <div className="glass rounded-3xl px-6 sm:px-10 py-10 space-y-4 text-center">
          {config.letter.map((line, i) => (
            <Reveal key={i} delay={i * 120}>
              {i === 0 ? (
                <p className="font-display italic text-2xl sm:text-3xl text-[#e2b79d] pb-2">{line}</p>
              ) : (
                <p className="text-lg sm:text-xl font-light leading-relaxed text-white/85">{line}</p>
              )}
            </Reveal>
          ))}
          <Reveal delay={200}>
            <p className="font-display italic text-xl text-[#e2b79d] pt-4">— {config.from}</p>
          </Reveal>
        </div>
      </section>

      {/* Cake */}
      <section className="relative z-10 py-16 px-6 text-center">
        <Reveal className="mb-10">
          <Divider icon={CakeIcon} />
        </Reveal>
        <Reveal>
          <h2 className="font-display italic text-3xl sm:text-4xl text-white/90 mb-10">Jom tiup lilin!</h2>
          <div className="glass glow-pulse inline-block rounded-[2.5rem] px-10 py-10">
            <Cake blown={blown} onBlow={blow} />
          </div>
          <p className="mt-8 min-h-12 text-white/70 text-lg flex items-center justify-center gap-2">
            {blown ? <span className="pop inline-flex items-center gap-2"><PartyPopper size={18} className="text-[#e2b79d]" />{config.blowMessage}</span> : "Tekan kek tu"}
          </p>
        </Reveal>
      </section>

      {/* Gallery */}
      <section id="gallery" className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <Reveal className="mb-10">
          <Divider icon={Camera} />
        </Reveal>
        <Reveal>
          <h2 className="font-display italic text-3xl sm:text-4xl text-white/90 text-center mb-12">Senyuman Manismu</h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
          {photos.map((p, i) => (
            <Reveal key={i} delay={(i % 3) * 120}>
              <figure
                className={`polaroid hover:scale-105 hover:rotate-0 transition duration-300 ${p.src ? "cursor-pointer" : ""}`}
                style={{ transform: `rotate(${tilts[i]}deg)` }}
                onClick={() => p.src && setLightbox(i)}
              >
                {p.src ? (
                  <img src={p.src} alt={p.caption} className="aspect-square w-full object-cover" loading="lazy" />
                ) : (
                  <div className="aspect-square flex items-center justify-center text-[#9a8f86] bg-gradient-to-br from-[#e9e3da] to-[#dcd3c6]">
                    <Camera size={32} strokeWidth={1.25} />
                  </div>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="relative z-10 text-center py-16 px-6 text-white/40 text-sm">
        <Divider icon={Heart} />
        <p className="mt-6">Dibuat dengan sayang oleh {config.from}</p>
      </footer>

      <AnimatePresence>
        {lightbox !== null && photos[lightbox]?.src && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              key={lightbox}
              src={photos[lightbox].src}
              alt={photos[lightbox].caption || ""}
              className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 text-white/70 hover:text-white"
              aria-label="Tutup"
            >
              <X size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
