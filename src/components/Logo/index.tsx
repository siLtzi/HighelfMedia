'use client';

import { logoPaths, LOGO_VIEWBOX } from './paths';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg 
      viewBox={LOGO_VIEWBOX} 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      fill="none" 
    >
      {logoPaths.map((item, index) => {
        // Determine the "Group" based on the ID for animation logic
        let groupClass = "logo-main"; // Default (HIGHELF)
        if (item.id === "Icon") groupClass = "logo-icon";
        if (["M", "E2", "D", "I2", "A"].includes(item.id)) groupClass = "logo-sub";

        return (
          <path
            key={item.id}
            d={item.d}
            className={`logo-part ${groupClass} fill-white`} 
            data-id={item.id}
            style={{ opacity: 0 }} // Start hidden
          />
        );
      })}
    </svg>
  );
}