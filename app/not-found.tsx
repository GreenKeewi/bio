import Link from "next/link";
import styles from "./not-found.module.css";

const ASTERISK = "M128 33Q128 20 141 20H159Q172 20 172 33V92L223 62Q235 55 242 67L252 85Q258 96 247 103L195 133L247 163Q258 170 252 181L242 199Q235 211 223 204L172 174V233Q172 246 159 246H141Q128 246 128 233V174L77 204Q65 211 58 199L48 181Q42 170 53 163L105 133L53 103Q42 96 48 85L58 67Q65 55 77 62L128 92Z";

function TiredAsterisk() {
  return (
    <svg className={styles.character} viewBox="0 0 320 300" role="img" aria-labelledby="asterisk-title">
      <title id="asterisk-title">A three-dimensional asterisk staring straight at you, very short on sleep</title>
      <defs>
        <linearGradient id="asterisk-front" x1="70" y1="30" x2="220" y2="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffe3b5" />
          <stop offset=".38" stopColor="#edbc87" />
          <stop offset="1" stopColor="#c27a46" />
        </linearGradient>
        <linearGradient id="asterisk-side" x1="60" y1="50" x2="240" y2="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c48a57" />
          <stop offset=".5" stopColor="#a36136" />
          <stop offset="1" stopColor="#75452c" />
        </linearGradient>
        <radialGradient id="asterisk-light" cx=".3" cy=".15" r=".85">
          <stop stopColor="#fff9e6" stopOpacity=".65" />
          <stop offset="1" stopColor="#fff9e6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="asterisk-shadow">
          <stop stopColor="#392820" stopOpacity=".2" />
          <stop offset="1" stopColor="#392820" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="asterisk-eyes" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#d4c8bb" />
          <stop offset=".5" stopColor="#fffaf1" />
          <stop offset="1" stopColor="#ebe0d1" />
        </linearGradient>
        <filter id="asterisk-volume" x="-20%" y="-20%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset in="blur" dx="-2" dy="-3" result="offset" />
          <feComposite in="SourceAlpha" in2="offset" operator="out" result="edge" />
          <feFlood floodColor="#7d4529" floodOpacity=".35" />
          <feComposite in2="edge" operator="in" result="shade" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="shade" />
          </feMerge>
        </filter>
        <clipPath id="asterisk-eye-left"><ellipse cx="122" cy="137" rx="22" ry="25" /></clipPath>
        <clipPath id="asterisk-eye-right"><ellipse cx="178" cy="137" rx="22" ry="25" /></clipPath>
      </defs>
      <ellipse cx="164" cy="279" rx="104" ry="14" fill="url(#asterisk-shadow)" />
      <g transform="translate(5 0)">
        <path d={ASTERISK} transform="translate(9 12)" fill="url(#asterisk-side)" stroke="#925c39" strokeWidth="1" />
        <path d={ASTERISK} fill="url(#asterisk-front)" filter="url(#asterisk-volume)" />
        <path d={ASTERISK} fill="url(#asterisk-light)" stroke="#fff1d5" strokeOpacity=".45" strokeWidth="1.5" />
        <path d="M102 157Q121 173 141 157M158 157Q178 173 198 157" fill="none" stroke="#956b65" strokeOpacity=".5" strokeWidth="8" strokeLinecap="round" />
        <path d="M104 166Q122 174 138 165M162 165Q179 174 195 166" fill="none" stroke="#895d58" strokeOpacity=".3" strokeWidth="2" strokeLinecap="round" />
        <g className={styles.eyes}>
          <g clipPath="url(#asterisk-eye-left)">
            <ellipse cx="122" cy="137" rx="22" ry="25" fill="url(#asterisk-eyes)" />
            <ellipse cx="124" cy="145" rx="9" ry="12" fill="#352d29" />
            <ellipse cx="124" cy="146" rx="5" ry="8" fill="#171717" />
            <circle cx="127" cy="141" r="2.5" fill="#fff" />
            <path d="M96 109H148V135Q123 143 96 131Z" fill="#d9a475" />
            <path d="M98 132Q121 140 145 134" fill="none" stroke="#8d6044" strokeWidth="2" />
          </g>
          <g clipPath="url(#asterisk-eye-right)">
            <ellipse cx="178" cy="137" rx="22" ry="25" fill="url(#asterisk-eyes)" />
            <ellipse cx="176" cy="145" rx="9" ry="12" fill="#352d29" />
            <ellipse cx="176" cy="146" rx="5" ry="8" fill="#171717" />
            <circle cx="179" cy="141" r="2.5" fill="#fff" />
            <path d="M152 109H204V131Q177 143 152 135Z" fill="#d9a475" />
            <path d="M155 134Q179 140 202 132" fill="none" stroke="#8d6044" strokeWidth="2" />
          </g>
        </g>
        <path d="M105 108Q120 105 137 110M163 110Q180 105 195 108" fill="none" stroke="#956b48" strokeWidth="3" strokeLinecap="round" />
        <path d="M141 184Q150 181 159 184" fill="none" stroke="#79513c" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function NotFound() {
  return (
    <main id="main-content" className={styles.page}>
      <h1 className="sr-only">Page not found</h1>
      <div className={styles.scene}>
        <p className={styles.code} aria-label="Error 404">404</p>
        <TiredAsterisk />
        <p className={styles.message}>
          this page isnt a thing, <Link href="/">go home</Link>
        </p>
      </div>
    </main>
  );
}
