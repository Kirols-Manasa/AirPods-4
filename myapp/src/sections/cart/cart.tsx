 // cart.tsx
"use client";

import Image from "next/image";
import { memo } from "react";
import { useCartAnimation } from "./Animation";

const cards = [
  {
    id: 1,
    image: "/images/cart.webp",
    alt: "A roaring leap in capabilities",
    boldText: "A roaring leap in capabilities.",
    description:
      "The powerful H2 chip comes to AirPods 4, making audio and calls sound better than ever. With a range of intelligent features, AirPods 4 adapt to virtually any listening environment — even when you want complete silence.",
  },
  {
    id: 2,
    image: "/images/helo.webp",
    alt: "Hang on every word",
    boldText: "Hang on every word.",
    description:
      "Using advanced computational audio, Voice Isolation minimizes background noise while clarifying the sound of your voice — even in loud or windy conditions.",
  },
  {
    id: 3,
    image: "/images/ohh.webp",
    alt: "Enjoy every note, beat, and vibe",
    boldText: "Enjoy every note, beat, and vibe.",
    description:
      "The acoustic architecture uses an Apple-designed low-distortion driver powered by a custom high dynamic range amplifier.",
  },
  {
    id: 4,
    image: "/images/bnt.webp",
    alt: "Calibrates music to your ears",
    boldText: "Calibrates music to your ears.",
    description:
      "Adaptive EQ automatically tunes music to your ears. Inward-facing microphones detect what you're hearing, then adjust low and midrange frequencies.",
  },
  {
    id: 5,
    image: "/images/zoom.webp",
    alt: "Real talk in real time",
    boldText: "Real talk in real time.",
    description:
      "Connect on FaceTime in crisp, HD quality with an AAC-ELD speech codec. Group FaceTime calls sound more true to life than ever.",
  },
];

const Cart = memo(function Cart() {
  const { sectionRef } = useCartAnimation();

  const heroCard = cards[0]!;
  const miniCards = cards.slice(1);

  return (
    <>
      <style>{`
        .cart-section {
          background: #ffffff;
          padding: clamp(48px, 6vw, 88px) clamp(20px, 5vw, 72px);
        }

        /* ── header ── */
        .cart-header {
          margin-bottom: clamp(28px, 3.5vw, 48px);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 0.5px solid #e5e5e5;
          padding-bottom: 20px;
        }
        .cart-header-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #aaa;
          margin-bottom: 8px;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .cart-header-title {
          font-size: clamp(28px, 3.2vw, 44px);
          font-weight: 700;
          color: #111;
          letter-spacing: -.03em;
          line-height: 1.05;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* ── bento grid ── */
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: clamp(10px, 1.2vw, 16px);
        }

        /* ── hero cell ── */
        .cart-hero {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 1.6vw, 22px);
          border-top: 0.5px solid #e5e5e5;
          padding-top: clamp(20px, 2.5vw, 32px);
          padding-bottom: clamp(20px, 2.5vw, 32px);
          border-bottom: 0.5px solid #e5e5e5;
        }

        /* الصورة — fade ناعم وخفيف جدًا تحت بس، مفيش صندوق ظاهر */
        .cart-hero-img {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #f2f2f2;
          border-radius: clamp(12px, 1.4vw, 20px);
        }

        .cart-hero-caption {
          font-size: clamp(13px, 1.05vw, 16px);
          color: #888;
          line-height: 1.65;
          max-width: 80ch;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .cart-hero-bold {
          font-weight: 700;
          color: #111;
        }

        /* ── mini cells ── */
        .cart-minis {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.2vw, 16px);
        }

        .cart-mini {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-top: 0.5px solid #e5e5e5;
          padding-top: clamp(14px, 1.8vw, 22px);
        }

        .cart-mini-img {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #f2f2f2;
          border-radius: clamp(10px, 1.2vw, 16px);
        }

        .cart-mini-caption {
          font-size: clamp(11px, 0.95vw, 13px);
          color: #888;
          line-height: 1.55;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .cart-mini-bold {
          font-weight: 600;
          color: #111;
        }

        @media (max-width: 767px) {
          .cart-minis {
            grid-template-columns: 1fr 1fr;
          }
          .cart-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
        }
      `}</style>

      <section ref={sectionRef} className="cart-section" data-cart-section>

        {/* Header */}
        <div className="cart-header">
          <div>
            <p className="cart-header-eyebrow" data-cart-label>AirPods 4</p>
            <h2 className="cart-header-title" data-cart-heading>
              Engineered for<br />every moment.
            </h2>
          </div>
        </div>

        <div className="cart-grid" data-cart-grid>

          {/* Hero */}
          <div className="cart-hero" data-cart-hero>
            <div className="cart-hero-img" data-cart-hero-img>
              <Image
                src={heroCard.image}
                alt={heroCard.alt}
                fill
                draggable={false}
                sizes="100vw"
                className="object-cover object-center pointer-events-none"
                data-cart-hero-photo
                loading="lazy"
                quality={70}
                decoding="async"
                placeholder="empty"
              />
            </div>
            <p className="cart-hero-caption" data-cart-hero-caption>
              <span className="cart-hero-bold">{heroCard.boldText}</span>{" "}
              {heroCard.description}
            </p>
          </div>

          {/* Minis */}
          <div className="cart-minis" data-cart-minis>
            {miniCards.map((card) => (
              <div key={card.id} className="cart-mini" data-cart-mini>
                <div className="cart-mini-img" data-cart-mini-img>
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 22vw, 22vw"
                    className="object-cover object-center pointer-events-none"
                    data-cart-mini-photo
                    loading="lazy"
                    quality={70}
                    decoding="async"
                    placeholder="empty"
                  />
                </div>
                <p className="cart-mini-caption" data-cart-mini-caption>
                  <span className="cart-mini-bold">{card.boldText}</span>{" "}
                  {card.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </section>
    </>
  );
});

export default Cart;