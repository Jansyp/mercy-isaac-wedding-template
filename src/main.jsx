import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { CalendarDays, Clock3, MapPin, Navigation, Heart, Cross, ChevronDown } from "lucide-react";
import "./styles.css";

const WEDDING_DATE = new Date("2026-10-26T16:00:00+05:30");

function Countdown() {
  const getRemaining = () => {
    const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(getRemaining());

  useEffect(() => {
    const timer = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown">
      {Object.entries(time).map(([label, value]) => (
        <div className="count-box" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function FloralDivider() {
  return <div className="divider"><span>✦</span><i></i><span>♡</span><i></i><span>✦</span></div>;
}

function App() {
  const churchMap = "https://www.google.com/maps/search/?api=1&query=GTAG+Church+Puzhuthivakkam+Main+Road+Madipakkam+Chennai+600091";
  const receptionMap = "https://www.google.com/maps/search/?api=1&query=Vani+Palace+Echankadu+Junction+HP+Bunk+Boopathy+Nagar+Tambaram+600117";

  return (
    <div className="site">
      <header className="nav">
        <a className="brand" href="#home">G & R <span>•</span> 26.10.2026</a>
        <nav>
          <a href="#wedding">Wedding</a>
          <a href="#story">Our Story</a>
          <a href="#details">Details</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="small-caps">WITH GOD'S GRACE & THE BLESSING OF OUR PARENTS</div>
            <div className="cross-mark">✝</div>
            <h1>Geetha <em>&</em> Ram</h1>
            <p className="subtitle">Joyfully invite you to celebrate the beginning of their life together in Christ.</p>
            <blockquote>
              “Therefore what God has joined together,<br />
              let no one separate.”
              <small>— Mark 10:9</small>
            </blockquote>
            <a href="#wedding" className="primary-btn">View Wedding Details <ChevronDown size={18}/></a>
          </div>
        </section>

        <section className="intro section">
          <div className="ornament">✦</div>
          <div className="small-caps">TWO HEARTS, ONE FAITH</div>
          <h2>One beautiful journey together.</h2>
          <p>With grateful hearts and joyful spirits, we invite you to be part of our special day as we begin this new chapter together.</p>
          <FloralDivider />
          <Countdown />
        </section>

        <section id="wedding" className="section details-section">
          <div className="small-caps">THE CELEBRATION</div>
          <h2>Join us as we say “I do”</h2>
          <div className="date-line"><CalendarDays size={20}/> Monday · October 26, 2026</div>

          <div className="event-grid">
            <article className="event-card">
              <div className="event-icon"><Cross size={28}/></div>
              <div className="small-caps">WEDDING CEREMONY</div>
              <h3>4:00 PM</h3>
              <h4>GTAG Church</h4>
              <p>Puzhuthivakkam Main Road<br/>Madipakkam<br/>Chennai – 600091</p>
              <a className="map-btn" href={churchMap} target="_blank" rel="noreferrer"><Navigation size={17}/> Get Directions</a>
            </article>

            <article className="event-card">
              <div className="event-icon"><Heart size={28}/></div>
              <div className="small-caps">RECEPTION</div>
              <h3>7:00 PM</h3>
              <h4>Vani Palace</h4>
              <p>Echankadu Junction HP Bunk<br/>Boopathy Nagar<br/>Tambaram – 600117</p>
              <a className="map-btn" href={receptionMap} target="_blank" rel="noreferrer"><Navigation size={17}/> Get Directions</a>
            </article>
          </div>
        </section>

        <section id="story" className="photo-story">
          <div className="story-image">
            <img src={`${import.meta.env.BASE_URL}invitation-reference.jpg`} alt="Geetha and Ram wedding invitation artwork" />
          </div>
          <div className="story-copy">
            <div className="small-caps">A NEW CHAPTER</div>
            <h2>Two lives, one promise.</h2>
            <p>Surrounded by family, friends and faith, Geetha and Ram begin their married life with hearts full of gratitude and hope.</p>
            <FloralDivider />
            <p className="script">“Where there is love, there is a beautiful beginning.”</p>
          </div>
        </section>

        <section id="details" className="section family-section">
          <div className="small-caps">WITH THE BLESSINGS OF OUR FAMILIES</div>
          <h2>Our Families</h2>
          <div className="family-grid">
            <div className="family-card">
              <span>Bride</span>
              <h3>M. Geetha Priyadarshini</h3>
              <p>“Mercy”</p>
            </div>
            <div className="family-card">
              <span>Groom</span>
              <h3>S. Ramachandran</h3>
              <p>“Isaac”</p>
            </div>
          </div>
        </section>

        <section className="thankyou section">
          <div className="ornament">✝</div>
          <h2>Thank you for<br/>being part of our story.</h2>
          <p>Your prayers, presence and blessings will make our wedding day even more special.</p>
          <div className="signature">Geetha & Ram</div>
          <div className="small-caps">26 · 10 · 2026</div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
