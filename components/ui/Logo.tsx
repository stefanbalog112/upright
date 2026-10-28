/* eslint-disable @next/next/no-img-element -- statický export, logo je hotové PNG */

import { asset } from "@/lib/asset";

type Props = {
  /** „light“ = svetlé logo pre tmavé pozadie, „dark“ = tmavé logo pre svetlé pozadie */
  variant?: "light" | "dark";
  className?: string;
};

export function Logo({ variant = "light", className = "h-8 w-auto" }: Props) {
  return (
    <img
      src={asset(`/logo/upright-logo-${variant}.png`)}
      alt="Upright"
      width={865}
      height={275}
      className={className}
    />
  );
}
