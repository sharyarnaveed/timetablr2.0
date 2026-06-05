import * as React from "react";

type UniversityLogoProps = React.SVGProps<SVGSVGElement>;

export function UniversityLogo({
  className,
  ...props
}: UniversityLogoProps) {
  return (
 <svg
      viewBox="0 0 560 180"
      role="img"
      aria-label="PAK-AUSTRIA Fachhochschule logo"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="currentColor">
        <text x="0" y="64" fontSize="54" fontWeight="800" letterSpacing="1.5" fontFamily="Arial, Helvetica, sans-serif">
          PAK-AUSTRIA
        </text>
        <text x="0" y="120" fontSize="54" fontWeight="800" letterSpacing="1.2" fontFamily="Arial, Helvetica, sans-serif">
          FACHHOCHSCHULE
        </text>
        <text x="1" y="154" fontSize="18" fontWeight="700" letterSpacing="1.4" opacity="0.72" fontFamily="Arial, Helvetica, sans-serif">
          INSTITUTE OF APPLIED SCIENCES AND TECHNOLOGY
        </text>
      </g>
    </svg>
  );
}
