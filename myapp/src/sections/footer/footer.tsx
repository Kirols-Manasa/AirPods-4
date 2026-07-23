 "use client";

import { useFooterAnimations } from "./Animation";

export default function Footer() {
  const {
    footer,
    brand,
    addColHeader,
    addColLinks,
    divider,
    bottomBar,
  } = useFooterAnimations();

  return (
    <footer
      ref={footer}
      className="w-full bg-[#f5f5f7] pt-16 sm:pt-20 lg:pt-[120px]"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

        {/* Top grid */}
        <div className="
          grid gap-y-8 pb-10
          grid-cols-2
          sm:grid-cols-4 sm:gap-x-8 sm:pb-16
          lg:grid-cols-[1fr_auto_auto_auto] lg:gap-x-16 lg:pb-[100px]
          xl:gap-x-20
        ">

          {/* Brand */}
          <div
            ref={brand}
            className="col-span-2 sm:col-span-4 lg:col-span-1"
            style={{ willChange: "clip-path" }}
          >
            <h2 className="text-[13px] font-semibold text-[#1d1d1f] mb-2 sm:mb-3">AirPods 4</h2>
            <p className="text-[12px] text-[#6e6e73] leading-relaxed max-w-[260px] m-0">
              The most advanced and comfortable open‑ear headphones Apple has ever created.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p
              ref={addColHeader}
              className="text-[11px] font-bold tracking-[0.06em] uppercase text-[#1d1d1f] mb-3 sm:mb-4 m-0"
              style={{ willChange: "clip-path, opacity" }}
            >
              Shop
            </p>
            <ul
              ref={addColLinks}
              className="flex flex-col gap-2 sm:gap-3 list-none m-0 p-0"
              style={{ willChange: "transform, opacity" }}
            >
              <li><a onClick={e => e.preventDefault()} href="#" className="text-[12px] text-[#6e6e73] no-underline hover:text-[#1d1d1f] transition-colors duration-150 cursor-pointer">AirPods 4</a></li>
              <li><a onClick={e => e.preventDefault()} href="#" className="text-[12px] text-[#6e6e73] no-underline hover:text-[#1d1d1f] transition-colors duration-150 cursor-pointer">AirPods Pro 2</a></li>
              <li><a onClick={e => e.preventDefault()} href="#" className="text-[12px] text-[#6e6e73] no-underline hover:text-[#1d1d1f] transition-colors duration-150 cursor-pointer">AirPods Max</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p
              ref={addColHeader}
              className="text-[11px] font-bold tracking-[0.06em] uppercase text-[#1d1d1f] mb-3 sm:mb-4 m-0"
              style={{ willChange: "clip-path, opacity" }}
            >
              Support
            </p>
            <ul
              ref={addColLinks}
              className="flex flex-col gap-2 sm:gap-3 list-none m-0 p-0"
              style={{ willChange: "transform, opacity" }}
            >
              <li><a onClick={e => e.preventDefault()} href="#" className="text-[12px] text-[#6e6e73] no-underline hover:text-[#1d1d1f] transition-colors duration-150 cursor-pointer">Help Center</a></li>
              <li><a onClick={e => e.preventDefault()} href="#" className="text-[12px] text-[#6e6e73] no-underline hover:text-[#1d1d1f] transition-colors duration-150 cursor-pointer">Product Info</a></li>
              <li><a onClick={e => e.preventDefault()} href="#" className="text-[12px] text-[#6e6e73] no-underline hover:text-[#1d1d1f] transition-colors duration-150 cursor-pointer">Service</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p
              ref={addColHeader}
              className="text-[11px] font-bold tracking-[0.06em] uppercase text-[#1d1d1f] mb-3 sm:mb-4 m-0"
              style={{ willChange: "clip-path, opacity" }}
            >
              Legal
            </p>
            <ul
              ref={addColLinks}
              className="flex flex-col gap-2 sm:gap-3 list-none m-0 p-0"
              style={{ willChange: "transform, opacity" }}
            >
              <li><a onClick={e => e.preventDefault()} href="#" className="text-[12px] text-[#6e6e73] no-underline hover:text-[#1d1d1f] transition-colors duration-150 cursor-pointer">Privacy Policy</a></li>
              <li><a onClick={e => e.preventDefault()} href="#" className="text-[12px] text-[#6e6e73] no-underline hover:text-[#1d1d1f] transition-colors duration-150 cursor-pointer">Terms of Use</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <hr
          ref={divider}
          className="border-0 border-t border-[#d2d2d7] m-0"
          style={{ willChange: "transform" }}
        />

        {/* Bottom bar */}
        <div
          ref={bottomBar}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-6 pb-10 sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-20"
          style={{ willChange: "clip-path, opacity" }}
        >
          <p className="text-[12px] text-[#6e6e73] m-0">© 2026 Kirols Manasa. All rights reserved.</p>
          <div className="flex gap-4 items-center">
            <a
              href="https://github.com/Kirols-Manasa/AirPods-4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[#6e6e73] underline underline-offset-2 hover:text-[#1d1d1f] transition-colors duration-150"
            >
              View on GitHub
            </a>
            <button
              onClick={e => e.preventDefault()}
              className="text-[12px] text-[#6e6e73] underline underline-offset-2 bg-transparent border-none p-0 cursor-pointer hover:text-[#1d1d1f] transition-colors duration-150"
            >
              Site Map
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}