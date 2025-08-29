"use client";
import React, { useState } from "react";
import { BookMarked } from "lucide-react";
import { Colors, Liquid } from "./ui/liquid-gradient";
import { useMediaQuery } from "../hooks/use-media-query";

type ColorKey =
  | "color1"
  | "color2"
  | "color3"
  | "color4"
  | "color5"
  | "color6"
  | "color7"
  | "color8"
  | "color9"
  | "color10"
  | "color11"
  | "color12"
  | "color13"
  | "color14"
  | "color15"
  | "color16"
  | "color17";

const COLORS: Colors = {
  color1: "#FFFFFF",
  color2: "#1E10C5",
  color3: "#9089E2",
  color4: "#FCFCFE",
  color5: "#F9F9FD",
  color6: "#B2B8E7",
  color7: "#0E2DCB",
  color8: "#0017E9",
  color9: "#4743EF",
  color10: "#7D7BF4",
  color11: "#0B06FC",
  color12: "#C5C1EA",
  color13: "#1403DE",
  color14: "#B6BAF6",
  color15: "#C1BEEB",
  color16: "#290ECB",
  color17: "#3F4CC0",
};
const GitHubButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="flex justify-center">
      <a
        href=""
        target="_self"
        // target="_blank" // opens new page
        className="group relative mx-auto inline-block h-[2.7em] w-12 rounded-lg border-2 border-black bg-white xl:w-36 dark:border-white dark:bg-black"
      >
        <div className="absolute top-[8.57%] left-1/2 h-[128.57%] w-[112.81%] -translate-x-1/2 opacity-60 blur-[15px] filter">
          <span className="absolute inset-0 rounded-lg bg-[#d9d9d9] blur-[6.5px] filter"></span>
          <div className="relative h-full w-full overflow-hidden rounded-lg">
            <Liquid isHovered={isHovered} colors={COLORS} />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 h-[112.85%] w-[92.23%] -translate-x-1/2 -translate-y-[40%] rounded-lg bg-[#010128] blur-[7.3px] filter"></div>
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <span className="absolute inset-0 rounded-lg bg-[#d9d9d9]"></span>
          <span className="absolute inset-0 rounded-lg bg-black"></span>
          <Liquid isHovered={isHovered} colors={COLORS} />
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`border-gradient-to-b absolute inset-0 rounded-lg border-[3px] border-solid from-transparent to-white mix-blend-overlay filter ${
                i <= 2 ? "blur-[3px]" : i === 3 ? "blur-[5px]" : "blur-[4px]"
              }`}
            ></span>
          ))}
          <span className="absolute top-1/2 left-1/2 h-[42.85%] w-[70.8%] -translate-x-1/2 -translate-y-[40%] rounded-lg bg-[#006] blur-[15px] filter"></span>
        </div>
        <button
          className="cursor-bookmark absolute inset-0 rounded-lg bg-transparent"
          aria-label="Get Started"
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="flex items-center justify-center gap-2 rounded-lg px-2 text-xl font-semibold tracking-wide whitespace-nowrap text-white group-hover:text-yellow-400 xl:justify-center xl:px-4">
            {/* <Star className="hidden h-6 w-6 flex-shrink-0 fill-white group-hover:fill-yellow-400 xl:inline-block" /> */}
            <BookMarked className="inline-block h-6 w-6 flex-shrink-0 group-hover:fill-yellow-400 xl:hidden" />
            <span className="hidden text-lg xl:flex">BookMark Me</span>
          </span>
        </button>
      </a>
    </div>
  );
};

export default GitHubButton;
