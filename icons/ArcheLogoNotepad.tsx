import { SVGProps } from "react"

export default function ArcheLogoNotepad(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="154"
      height="150"
      viewBox="0 0 154 150"
      {...props}
    >
      <defs>
        <path
          id="notepad-icon-b"
          d="M20,0 L130,0 C141.045695,-2.02906125e-15 150,8.954305 150,20 L150,45 L150,45 L0,45 L0,20 C-1.3527075e-15,8.954305 8.954305,2.02906125e-15 20,0 Z"
        />
        <filter
          id="notepad-icon-a"
          width="105.3%"
          height="117.8%"
          x="-2.7%"
          y="-4.4%"
          filterUnits="objectBoundingBox"
        >
          <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="1"
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
          />
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(2)">
        <rect width="150" height="150" fill="#EFE7DC" rx="20" />
        <use fill="#000" filter="url(#notepad-icon-a)" href="#notepad-icon-b" />
        <use fill="#FD4D4D" href="#notepad-icon-b" />
        <line
          x1=".5"
          x2="149.5"
          y1="48.5"
          y2="48.5"
          stroke="#979797"
          strokeDasharray="0 2"
          strokeLinecap="round"
          strokeOpacity=".5"
        />
        <line
          x1=".5"
          x2="149.5"
          y1="77.5"
          y2="77.5"
          stroke="#979797"
          strokeLinecap="square"
          strokeOpacity=".5"
        />
        <line
          x1=".5"
          x2="149.5"
          y1="113.5"
          y2="113.5"
          stroke="#979797"
          strokeLinecap="square"
          strokeOpacity=".5"
        />
      </g>
    </svg>
  )
}
