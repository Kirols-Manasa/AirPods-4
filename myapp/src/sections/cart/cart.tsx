 "use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

const cards = [
  {
    id: 1,
    image: "/images/helo.webp",
    alt: "A roaring leap in capabilities",
    boldText: "A roaring leap in capabilities.",
    description:
      "The powerful H2 chip comes to AirPods 4, making audio and calls sound better than ever. With a range of intelligent features, AirPods 4 adapt to virtually any listening environment — even when you want complete silence.",
  },
  {
    id: 2,
    image: "/images/cart.webp",
    alt: "Hang on every word",
    boldText: "Hang on every word.",
    description:
      "Using advanced computational audio, Voice Isolation minimizes background noise while clarifying the sound of your voice — even in loud or windy conditions. And with studio-quality audio recording, you can make incredible high-fidelity voice recordings at home or on the go.",
  },
  {
    id: 3,
    image: "/images/ohh.webp",
    alt: "Enjoy every note, beat, and vibe",
    boldText: "Enjoy every note, beat, and vibe.",
    description:
      "The acoustic architecture uses an Apple-designed low-distortion driver powered by a custom high dynamic range amplifier. Put simply, you hear music in exceptional detail, with deeper bass and crystal-clear highs.",
  },
  {
    id: 4,
    image: "/images/bnt.webp",
    alt: "Calibrates music to your ears",
    boldText: "Calibrates music to your ears.",
    description:
      "Adaptive EQ automatically tunes music to your ears. Inward-facing microphones detect what you're hearing, then adjust low and midrange frequencies to deliver rich detail in every song.",
  },
  {
    id: 5,
    image: "/images/zoom.webp",
    alt: "Real talk in real time",
    boldText: "Real talk in real time.",
    description:
      "Connect on FaceTime in crisp, HD quality with an AAC-ELD speech codec. And Group FaceTime calls sound more true to life than ever with support for Personalized Spatial Audio.",
  },
];

const DARK = "#05050a";

export default function Cart() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const moved = useRef(false);

  const measureCard = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (card) setCardWidth(card.offsetWidth + 12);
  }, []);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    measureCard();
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", measureCard);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", measureCard);
    };
  }, [checkScroll, measureCard]);

  const scrollOneCard = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      left: dir === "right" ? el.scrollWidth : 0,
      behavior: "smooth",
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    moved.current = false;
    startX.current = e.pageX;
    scrollStart.current = scrollRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 4) moved.current = true;
    scrollRef.current.scrollLeft = scrollStart.current - dx;
  };
  const onMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <>
      <style>{`
        .cart-scroll::-webkit-scrollbar { display: none; }
        .cart-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        .cart-card {
          flex-shrink: 0;
          width: clamp(180px, calc((100vw - 56px) / 3), 400px);
        }
        @media (min-width: 768px) {
          .cart-card { width: clamp(200px, calc((100vw - 88px) / 3), 400px); }
        }
        @media (min-width: 1024px) {
          .cart-card { width: clamp(220px, calc((100vw - 120px) / 3), 400px); }
        }
        @media (min-width: 1280px) {
          .cart-card { width: clamp(220px, calc((100vw - 152px) / 3), 400px); }
        }

        .cart-card-img {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #1c1c1e;
          border-radius: clamp(14px, 1.4vw, 20px);
          height: clamp(240px, calc((100vw - 56px) / 3 * 1.35), 520px);
          cursor: grab;
        }
        .cart-card-img:active {
          cursor: grabbing;
        }
        @media (min-width: 768px) {
          .cart-card-img { height: clamp(270px, calc((100vw - 88px) / 3 * 1.35), 520px); }
        }
        @media (min-width: 1024px) {
          .cart-card-img { height: clamp(300px, calc((100vw - 120px) / 3 * 1.35), 520px); }
        }
        @media (min-width: 1280px) {
          .cart-card-img { height: clamp(300px, calc((100vw - 152px) / 3 * 1.35), 520px); }
        }

        .cart-card-caption {
          padding-top: clamp(10px, 1vw, 18px);
          padding-left: 4px;
          padding-right: 4px;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0;
          cursor: default;
          user-select: text;
          -webkit-user-select: text;
        }
        @media (min-width: 768px) {
          .cart-card-caption { font-size: 12px; letter-spacing: 0.01em; }
        }
        @media (min-width: 1024px) {
          .cart-card-caption { font-size: 13px; }
        }
        @media (min-width: 1280px) {
          .cart-card-caption { font-size: clamp(11px, 0.9vw, 14px); }
        }

        .cart-card-bold {
          font-weight: 600;
          color: #f5f5f7;
        }

        .cart-section {
          padding-top:    clamp(32px, 4vw, 60px);
          padding-bottom: clamp(32px, 4vw, 60px);
        }
        @media (min-width: 1280px) {
          .cart-section {
            padding-top:    clamp(48px, 6vw, 80px);
            padding-bottom: clamp(48px, 6vw, 80px);
          }
        }

        .cart-scroll {
          padding-left:  16px;
          padding-right: 16px;
        }
        @media (min-width: 768px)  { .cart-scroll { padding-left: 32px;  padding-right: 32px;  } }
        @media (min-width: 1024px) { .cart-scroll { padding-left: 48px;  padding-right: 48px;  } }
        @media (min-width: 1280px) { .cart-scroll { padding-left: 64px;  padding-right: 64px;  } }

        .cart-arrow-bar { padding-right: 16px; }
        @media (min-width: 768px)  { .cart-arrow-bar { padding-right: 32px; } }
        @media (min-width: 1024px) { .cart-arrow-bar { padding-right: 48px; } }
        @media (min-width: 1280px) { .cart-arrow-bar { padding-right: 64px; } }

        

        
      `}</style>

      <section
        className="cart-section"
        style={{ width: "100%", position: "relative", overflow: "hidden", background: DARK }}
      >
       

        <div
          ref={scrollRef}
          className="cart-scroll"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "12px",
            paddingBottom: "clamp(20px, 2.5vw, 36px)",
            WebkitOverflowScrolling: "touch",
            position: "relative",
            zIndex: 1,
            userSelect: "none",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              data-card
              className="cart-card"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="cart-card-img">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  draggable={false}
                  sizes="(max-width: 767px) calc((100vw - 56px) / 3),
                         (max-width: 1023px) calc((100vw - 88px) / 3),
                         (max-width: 1279px) calc((100vw - 120px) / 3),
                         calc((100vw - 152px) / 3)"
                  className="object-cover object-center pointer-events-none"
                />
              </div>

              <p className="cart-card-caption">
                <span className="cart-card-bold">{card.boldText}</span>{" "}
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className="cart-arrow-bar"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "clamp(10px, 1.2vw, 18px)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <button
            onClick={() =>
              canScrollRight ? scrollOneCard("right") : scrollOneCard("left")
            }
            aria-label={canScrollRight ? "Next" : "Previous"}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "none",
              background: "#3a3a3c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "#555558")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "#3a3a3c")
            }
          >
            <svg
              width="14" height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: canScrollRight ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 0.3s ease",
              }}
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}