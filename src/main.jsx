import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { Cake, Navigation, Sparkles } from "lucide-react";
import invitationBackground from "./assets/vihaan-birthday-background.png";
import storyPhoto from "./assets/vihaan-story-photo.png";
import "./styles.css";

// Update birthday details, venues, map links and image paths here.
const BIRTHDAY = {
  name: "Vihaan Dev",
  parents: { dad: "Karthik", mom: "Jansy" },
  dateShort: "06 · 12 · 2026",
  countdownTarget: "2026-12-06T19:00:00+05:30",
  image: "", // Example: `${import.meta.env.BASE_URL}vihaan-birthday.jpg`
  events: [
    {
      label: "CAKE CUTTING",
      time: "7:00 PM",
      venue: "M Central",
      address: ["T. Nagar, Chennai"],
      map: "https://www.google.com/maps/search/?api=1&query=M%20Central%2C%20T.%20Nagar%2C%20Chennai",
      icon: Cake,
    },
  ],
};
const firstName = BIRTHDAY.name.split(" ")[0];

function Countdown() {
  const getRemaining = () => {
    const target = new Date(BIRTHDAY.countdownTarget).getTime();
    const diff = target - Date.now();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(getRemaining);
  useEffect(() => {
    const timer = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);
  if (!time) return <p className="countdown-message" aria-live="polite">The celebration has begun!</p>;
  return <div className="countdown">{Object.entries(time).map(([label, value]) => <div className="count-box" key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>;
}

function FloralDivider() { return <div className="divider"><span>✦</span><i></i><span>♡</span><i></i><span>✦</span></div>; }

const HEART_PATH_DATA = "M .5 .95 C .43 .87 .05 .62 .05 .38 C .05 .22 .16 .1 .31 .1 C .4 .1 .47 .17 .5 .27 C .53 .17 .6 .1 .69 .1 C .84 .1 .95 .22 .95 .38 C .95 .62 .57 .87 .5 .95 Z";

function ScratchCard({ onReveal }) {
  const canvasRef = useRef(null);
  const lastPoint = useRef(null);
  const strokes = useRef(0);
  const revealedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !context) throw new Error("The scratch card requires canvas support.");

    const { width, height } = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    context.scale(scale, scale);

    const foil = context.createLinearGradient(0, 0, width, height);
    foil.addColorStop(0, "#f7e5d7");
    foil.addColorStop(0.2, "#f1d8c8");
    foil.addColorStop(0.48, "#f8eadd");
    foil.addColorStop(0.72, "#edcfbf");
    foil.addColorStop(1, "#f5e1d2");
    context.fillStyle = foil;
    context.fillRect(0, 0, width, height);

    for (let y = 0; y < height; y += 2) {
      context.strokeStyle = y % 4 === 0 ? "rgba(255,255,255,.14)" : "rgba(126,82,64,.045)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    const sheen = context.createLinearGradient(0, 0, width, 0);
    sheen.addColorStop(0, "rgba(255,255,255,.05)");
    sheen.addColorStop(0.5, "rgba(255,255,255,.24)");
    sheen.addColorStop(1, "rgba(255,255,255,.05)");
    context.fillStyle = sheen;
    context.fillRect(0, 0, width, height);

    const fold = context.createLinearGradient(width * 0.42, 0, width * 0.58, 0);
    fold.addColorStop(0, "rgba(151,91,75,.12)");
    fold.addColorStop(0.43, "rgba(255,255,255,.28)");
    fold.addColorStop(0.5, "rgba(255,255,255,.46)");
    fold.addColorStop(0.58, "rgba(151,91,75,.1)");
    fold.addColorStop(1, "rgba(255,255,255,.08)");
    context.fillStyle = fold;
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "#765047";
    context.lineWidth = 1.5;
    context.lineCap = "round";
    context.lineJoin = "round";
    const centerX = width / 2;
    const centerY = height * 0.34 - 16;
    context.beginPath();
    context.moveTo(centerX - 7, centerY + 7);
    context.lineTo(centerX - 7, centerY - 2);
    context.quadraticCurveTo(centerX - 7, centerY - 5, centerX - 4, centerY - 5);
    context.quadraticCurveTo(centerX - 1, centerY - 5, centerX - 1, centerY - 2);
    context.lineTo(centerX - 1, centerY + 2);
    context.lineTo(centerX + 5, centerY - 3);
    context.quadraticCurveTo(centerX + 8, centerY - 5, centerX + 9, centerY - 2);
    context.lineTo(centerX + 3, centerY + 8);
    context.quadraticCurveTo(centerX + 1, centerY + 11, centerX - 3, centerY + 10);
    context.lineTo(centerX - 7, centerY + 8);
    context.stroke();

    context.fillStyle = "#68453e";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "500 11px Cormorant Garamond, serif";
    context.fillText("A little surprise awaits…", centerX, height * 0.46);
    context.font = "700 8px DM Sans, sans-serif";
    context.fillText("SCRATCH TO REVEAL", centerX, height * 0.54);
    context.strokeStyle = "rgba(104,69,62,.58)";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(width * 0.37, height * 0.61);
    context.lineTo(width * 0.63, height * 0.61);
    context.stroke();
  }, []);

  function getPoint(event) {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function reveal() {
    if (revealedRef.current) return;
    revealedRef.current = true;
    lastPoint.current = null;
    setRevealed(true);
    const bounds = canvasRef.current.getBoundingClientRect();
    onReveal({ x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 });
  }

  function checkReveal() {
    if (revealedRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const heartPath = new Path2D(HEART_PATH_DATA);
    context.setTransform(1, 0, 0, 1, 0, 0);
    let cleared = 0;
    let sampled = 0;
    for (let y = 2; y < canvas.height; y += 6) {
      for (let x = 2; x < canvas.width; x += 6) {
        if (!context.isPointInPath(heartPath, x / canvas.width, y / canvas.height)) continue;
        sampled += 1;
        if (pixels[(y * canvas.width + x) * 4 + 3] < 32) cleared += 1;
      }
    }
    if (sampled > 0 && cleared / sampled >= 0.5) reveal();
  }

  function scratch(event) {
    if (revealedRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const point = getPoint(event);
    const rect = canvas.getBoundingClientRect();
    const heartPath = new Path2D(HEART_PATH_DATA);
    context.setTransform(1, 0, 0, 1, 0, 0);
    const insideHeart = context.isPointInPath(heartPath, point.x / rect.width, point.y / rect.height);
    context.setTransform(canvas.width / rect.width, 0, 0, canvas.height / rect.height, 0, 0);
    if (!insideHeart) {
      lastPoint.current = null;
      return;
    }
    context.globalCompositeOperation = "destination-out";
    context.lineWidth = 44;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    if (lastPoint.current) {
      context.moveTo(lastPoint.current.x, lastPoint.current.y);
    } else {
      context.moveTo(point.x, point.y);
    }
    context.lineTo(point.x, point.y);
    context.stroke();
    lastPoint.current = point;
    strokes.current += 1;
    if (strokes.current % 3 === 0) checkReveal();
  }

  function handleKeyDown(event) {
    if (!revealed && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      reveal();
    }
  }

  return <div
    className={`scratch-card${revealed ? " is-revealed" : ""}`}
    role="button"
    tabIndex={0}
    aria-label={revealed ? "Birthday date: 6th December 2026" : "Scratch to reveal the birthday date"}
    onKeyDown={handleKeyDown}
    onPointerDown={(event) => {
      if (revealedRef.current) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      scratch(event);
    }}
    onPointerMove={(event) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) scratch(event);
    }}
    onPointerUp={(event) => {
      lastPoint.current = null;
      if (!revealedRef.current) checkReveal();
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    }}
    onPointerCancel={() => { lastPoint.current = null; }}
    onTransitionEnd={(event) => {
      if (revealed && event.target === canvasRef.current && event.propertyName === "opacity") {
        const canvas = canvasRef.current;
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      }
    }}
  >
    <svg className="scratch-defs" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="birthday-heart-clip" clipPathUnits="objectBoundingBox">
          <path d={HEART_PATH_DATA} />
        </clipPath>
      </defs>
    </svg>
    <div className="scratch-inner">
      <svg className="heart-border" viewBox="0 0 100 100" aria-hidden="true">
        <path d={HEART_PATH_DATA} />
      </svg>
      <span className="scratch-ornament" aria-hidden="true">✦</span>
      <span className="scratch-date" aria-hidden={!revealed}>
        <span className="scratch-date-intro">Our big day on</span>
        <span className="scratch-date-day">06</span>
        <span className="scratch-date-month">December</span>
        <span className="scratch-date-year">2026</span>
      </span>
      <canvas className="scratch-foil" ref={canvasRef} aria-hidden="true" />
    </div>
  </div>
}

function CelebrationBurst({ origin }) {
  const particles = useMemo(() => {
    const colors = ["#651b2b", "#9d3f58", "#d88b9c", "#fff4e8", "#c79b55"];
    const heartParticles = Array.from({ length: 180 }, (_, index) => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.8;
      const distance = 110 + Math.random() * Math.hypot(window.innerWidth, window.innerHeight) * 0.72;
      const driftX = Math.cos(angle) * distance;
      const driftY = Math.sin(angle) * distance;
      return {
        id: `heart-${index}`,
        glyph: Math.random() > 0.2 ? "♥" : "♡",
        style: {
          left: `${origin.x}px`,
          top: `${origin.y}px`,
          color: colors[Math.floor(Math.random() * colors.length)],
          fontSize: `${9 + Math.random() * 14}px`,
          "--drift-x": `${driftX}px`,
          "--drift-y": `${driftY}px`,
          "--spin": `${Math.random() * 540 - 270}deg`,
          "--duration": `${2.1 + Math.random() * 0.9}s`,
          "--delay": `${Math.random() * 0.18}s`,
        },
      };
    });
    const sparkles = Array.from({ length: 24 }, (_, index) => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.8;
      const distance = 90 + Math.random() * Math.hypot(window.innerWidth, window.innerHeight) * 0.68;
      return {
        id: `sparkle-${index}`,
        glyph: Math.random() > 0.5 ? "✦" : "✧",
        style: {
          left: `${origin.x}px`,
          top: `${origin.y}px`,
          color: colors[2 + Math.floor(Math.random() * 3)],
          fontSize: `${8 + Math.random() * 9}px`,
          "--drift-x": `${Math.cos(angle) * distance}px`,
          "--drift-y": `${Math.sin(angle) * distance}px`,
          "--spin": `${Math.random() * 360}deg`,
          "--duration": `${1.8 + Math.random() * 0.8}s`,
          "--delay": `${Math.random() * 0.15}s`,
        },
      };
    });
    return [...heartParticles, ...sparkles];
  }, [origin]);

  return createPortal(
    <div className="celebration-burst" aria-hidden="true">
      {particles.map(({ id, glyph, style }) =>
        <span key={id} className={id.startsWith("heart") ? "burst-heart" : "burst-sparkle"} style={style}>{glyph}</span>
      )}
    </div>,
    document.body,
  );
}

function App() {
  const [celebration, setCelebration] = useState(null);
  useEffect(() => {
    if (!celebration) return undefined;
    const timer = setTimeout(() => setCelebration(null), 3200);
    return () => clearTimeout(timer);
  }, [celebration]);

  return <>
  <div className="site" style={{
    "--invitation-photo": `url("${invitationBackground}")`,
  }}>
    <main>
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="small-caps">WITH LOVE, JOY &amp; THE BLESSINGS OF OUR FAMILY</div>
          <div className="sparkle-mark" aria-hidden="true">✦</div>
          <h1>{BIRTHDAY.name}</h1>
          <div className="turning">is turning <em>ONE!</em></div>
          <p className="subtitle">Our little bundle of joy is turning one, and we would love for you to be part of this special milestone.</p>
          <ScratchCard onReveal={setCelebration} />
        </div>
      </section>

      <section className="intro section">
        <div className="ornament">✦</div>
        <div className="small-caps">ONE YEAR OF LOVE &amp; JOY</div>
        <h2>One beautiful year with our little sunshine.</h2>
        <p>With grateful hearts and endless joy, we invite you to celebrate one wonderful year of {BIRTHDAY.name}'s life with us.</p>
        <FloralDivider />
        <Countdown />
      </section>

      <section id="celebration" className="section details-section">
        <div className="small-caps">THE CELEBRATION</div>
        <h2>Come celebrate {firstName}'s first big milestone!</h2>
        <p className="section-lede">One year of giggles, cuddles, smiles and precious memories — let's make his first birthday unforgettable.</p>
        <div className="event-grid">{BIRTHDAY.events.map(({ label, time, dateLabel, venue, description, address, map, icon: Icon }) => {
          return <article className="event-card" key={label}>
          <div className="event-icon"><Icon size={28}/></div><div className="small-caps">{label}</div>
          {dateLabel ? <h3 className="event-date">{dateLabel}</h3> : <h3>{time}</h3>}
          {dateLabel && <h4 className="event-time">{time}</h4>}{venue && <h4>{venue}</h4>}
          {description ? <p>{description}</p> : <p>{address.map((line) => <React.Fragment key={line}>{line}<br/></React.Fragment>)}</p>}
          {map && <a className="map-btn" href={map} target="_blank" rel="noreferrer"><Navigation size={17}/> Get Directions</a>}
        </article>})}</div>
      </section>

      <section id="story" className="photo-story">
        <div className="story-image">
          <Sparkles className="story-sparkle" size={34} aria-hidden="true"/>
          <img src={storyPhoto} alt={`${BIRTHDAY.name} enjoying a ride`} />
        </div>
        <div className="story-copy">
          <div className="small-caps">A LITTLE BOY, A BIG BLESSING</div>
          <h2>One year of {firstName}.<br/>A lifetime of love.</h2>
          <p>From his very first smile to every little milestone, {firstName} has filled our hearts with more love than we could ever imagine.</p>
          <p>Come celebrate this beautiful beginning with us.</p>
          <FloralDivider />
          <p className="script">“A year of tiny moments, big smiles and endless love.”</p>
        </div>
      </section>

      <section id="details" className="thankyou section">
        <div className="ornament">✦</div>
        <h2>Thank you for being<br/>part of {firstName}'s story.</h2>
        <p>Your love, blessings and presence will make his first birthday even more special.</p>
        <div className="with-love">With love,</div>
        <div className="signature">{BIRTHDAY.parents.dad} &amp; {BIRTHDAY.parents.mom}</div>
        <div className="small-caps">Celebrating our little one, {BIRTHDAY.name}</div>
        <div className="date-footer">{BIRTHDAY.dateShort}</div>
      </section>
    </main>
  </div>
  {celebration && <CelebrationBurst origin={celebration} />}
  </>;
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("The app root element was not found.");

const root = import.meta.hot?.data.root ?? createRoot(rootElement);
if (import.meta.hot) {
  import.meta.hot.dispose((data) => {
    data.root = root;
  });
}
root.render(<App />);
