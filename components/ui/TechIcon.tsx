"use client";

import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function TechIcon({ name, className = "", size = 14 }: TechIconProps) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  switch (normalized) {
    case "react":
    case "reactnative":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" width={size} height={size} fill="none" stroke="currentColor" className={className}>
          <circle cx="0" cy="0" r="2.05" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case "nextjs":
    case "next":
      return (
        <svg viewBox="0 0 180 180" width={size} height={size} fill="currentColor" className={className}>
          <circle cx="90" cy="90" r="90" fill="currentColor" />
          <path d="M149.508 157.52L69.141 54H54v71.97h12.114V71.484l71.442 92.518a89.92 89.92 0 0011.952-6.482z" fill="#191825" />
          <rect x="115" y="54" width="12" height="72" fill="#191825" />
        </svg>
      );
    case "vue":
    case "vuejs":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M2 3h3.5L12 15 18.5 3H22L12 21 2 3z" />
          <path d="M6.5 3h3L12 9l2.5-6h3L12 15 6.5 3z" opacity="0.6" />
        </svg>
      );
    case "angular":
      return (
        <svg viewBox="0 0 250 250" width={size} height={size} fill="currentColor" className={className}>
          <polygon points="125,30 31.9,63.2 46.1,186.3 125,230 203.9,186.3 218.1,63.2" />
          <path d="M125,52.1L66.8,182.6h21.7l11.7-29.2h49.4l11.7,29.2h21.7L125,52.1z M120.3,136.2l14.1-35.3l14.1,35.3H120.3z" fill="#191825" />
        </svg>
      );
    case "typescript":
    case "ts":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.724-.246 5.862 5.862 0 0 0-.825-.138 6.643 6.643 0 0 0-.909-.056c-.469 0-.828.083-1.077.248a.798.798 0 0 0-.374.7.749.749 0 0 0 .17.494c.114.152.274.28.48.384.205.105.452.196.741.274l.951.258c.621.168 1.144.372 1.569.612.425.24.764.538 1.017.894.253.356.379.795.379 1.317 0 .593-.146 1.111-.439 1.554-.292.443-.717.794-1.275 1.053-.557.259-1.259.388-2.106.388-.636 0-1.243-.058-1.821-.174a7.994 7.994 0 0 1-1.637-.506V17.06c.307.228.718.431 1.233.608.516.177 1.087.266 1.714.266.49 0 .882-.086 1.176-.258.294-.172.441-.428.441-.767 0-.256-.079-.462-.236-.618-.158-.156-.37-.282-.637-.378-.268-.096-.576-.188-.925-.276l-.888-.225a6.002 6.002 0 0 1-1.53-.563 2.766 2.766 0 0 1-.994-.888c-.244-.367-.366-.826-.366-1.378 0-.583.149-1.085.447-1.506.298-.421.722-.746 1.272-.975.55-.229 1.206-.344 1.968-.344zM11.8 10.012h5.684v2.24H14.8v9.498h-2.924v-9.498H9.362v-2.24z" />
        </svg>
      );
    case "javascript":
    case "js":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M0 0v24h24V0H0zm10.74 16.53c0 2.06-1.2 3.03-3 3.03-1.6 0-2.52-.76-3.03-1.67l1.45-.9c.33.53.84.97 1.54.97.83 0 1.25-.43 1.25-1.46V9.88h1.79v6.65zm7.39 3.03c-1.8 0-2.92-.89-3.46-2.07l1.46-.86c.39.73 1.05 1.28 2 1.28.8 0 1.34-.34 1.34-.9 0-.61-.48-.83-1.6-1.12l-.55-.14c-1.61-.41-2.69-1.2-2.69-2.8 0-1.74 1.4-2.87 3.29-2.87 1.5 0 2.48.65 2.97 1.62l-1.39.85c-.32-.55-.78-.89-1.58-.89-.73 0-1.18.35-1.18.8 0 .52.39.75 1.45 1.02l.55.14c1.86.47 2.85 1.25 2.85 2.9.01 1.77-1.37 3.04-3.45 3.04z" />
        </svg>
      );
    case "tailwindcss":
    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      );
    case "flutter":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M14.314 0L2.3 12 6.07 15.77 21.857 0h-7.543zm-7.54 13.514L10.544 9.74l7.543 7.543h-7.543l-3.77-3.769zM14.314 24l-3.77-3.77 3.77-3.77 3.77 3.77L14.314 24z" />
        </svg>
      );
    case "expo":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.1 17.1L12 8.4 6.9 17.1H4.2L12 3.9l7.8 13.2h-2.7z" />
        </svg>
      );
    case "gogolang":
    case "go":
    case "golang":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M1.81 9.47c0-.28.23-.5.5-.5h5.45c.28 0 .5.23.5.5v.98c0 .28-.23.5-.5.5H2.31c-.28 0-.5-.22-.5-.5v-.98zm.05 4.09c0-.28.23-.5.5-.5h3.9c.28 0 .5.22.5.5v.98c0 .28-.22.5-.5.5h-3.9c-.28 0-.5-.22-.5-.5v-.98zm12.39-4.22c-1.39 0-2.48.36-3.28 1.09-.79.72-1.19 1.73-1.19 3.02 0 1.33.42 2.37 1.25 3.12.84.75 1.97 1.12 3.4 1.12 1.25 0 2.28-.27 3.09-.82.81-.54 1.33-1.32 1.55-2.33h-4.32v-1.89h6.46c.06.4.09.84.09 1.32 0 1.98-.67 3.51-2.02 4.59C17.9 19.54 15.93 20.08 13.78 20.08c-2.34 0-4.28-.71-5.8-2.14C6.46 16.51 5.7 14.54 5.7 12.03c0-2.52.78-4.48 2.33-5.88 1.55-1.4 3.52-2.1 5.92-2.1 2.21 0 3.99.58 5.34 1.74l-1.68 1.83c-.93-.82-2.16-1.23-3.7-1.23z" />
        </svg>
      );
    case "html5":
    case "html":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.236-2.656H5.414l.7 8.028h9.991l-.37 4.14-3.771 1.018-3.754-1.018-.242-2.784H5.263l.443 5.093 6.258 1.737 6.276-1.737.86-9.606H8.531z" />
        </svg>
      );
    case "css3":
    case "css":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l.236 2.656h7.322l-.37 4.14-3.771 1.018-3.754-1.018-.242-2.784H5.263l.443 5.093 6.258 1.737 6.276-1.737.86-9.606H8.531z" />
        </svg>
      );
    case "database":
    case "db":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.34 6 2s-2.13 2-6 2-6-1.34-6-2 2.13-2 6-2zm0 14c-3.87 0-6-1.34-6-2v-1.78c1.55.78 3.67 1.28 6 1.28s4.45-.5 6-1.28V17c0 .66-2.13 2-6 2z" />
        </svg>
      );
    case "mobileapp":
    case "mobile":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
        </svg>
      );
    case "apiintegration":
    case "api":
    case "restapi":
    case "backendengine":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M7 7H5a2 2 0 00-2 2v6a2 2 0 002 2h2v-2H5V9h2V7zm10 0h-2v2h2v6h-2v2h2a2 2 0 002-2V9a2 2 0 00-2-2zm-5 1a3 3 0 100 6 3 3 0 000-6z" />
        </svg>
      );
    case "healthtech":
    case "telemetry":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    case "educationtech":
    case "edtech":
    case "webapp":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
        </svg>
      );
    case "admindashboard":
    case "admin":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      );
    case "shadcnui":
    case "shadcn":
      return (
        <svg viewBox="0 0 256 256" width={size} height={size} fill="currentColor" className={className}>
          <path d="M208 128a80 80 0 1 1-160 0 80 80 0 0 1 160 0Z" fill="none" stroke="currentColor" strokeWidth="20" />
          <path d="M128 48v160" stroke="currentColor" strokeWidth="20" />
        </svg>
      );
    case "firebase":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M3.89 15.672L6.5 1.761a.588.588 0 011.087-.193l2.802 5.267-10.5 8.837zm16.593 1.34l-2.645-13.68a.588.588 0 00-1.047-.282L3.109 17.012l8.307 4.708a1.176 1.176 0 001.14 0l7.927-4.708zM14.07 8.281l-2.073-3.957a.588.588 0 00-1.042 0l-7.79 14.593 10.905-10.636z" />
        </svg>
      );
    case "supabase":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M21.362 9.354H12V.314L2.638 14.646H12v9.04l9.362-14.332z" />
        </svg>
      );
    case "postgresql":
    case "postgre":
    case "postgres":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
        </svg>
      );
    case "mysql":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M12 3C6.48 3 2 7.48 2 13s4.48 10 10 10 10-4.48 10-10S17.52 3 12 3zm1 15h-2v-6h2v6zm0-8h-2V7h2v3z" />
        </svg>
      );
    case "nosql":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.34 6 2s-2.13 2-6 2-6-1.34-6-2 2.13-2 6-2zm0 14c-3.87 0-6-1.34-6-2v-1.78c1.55.78 3.67 1.28 6 1.28s4.45-.5 6-1.28V17c0 .66-2.13 2-6 2z" />
        </svg>
      );
    case "django":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M11.666 0h2.909v18.062c-1.326.313-2.616.46-3.842.46-4.542 0-6.937-2.195-6.937-6.315 0-4.004 2.584-6.452 6.55-6.452 1.309 0 2.378.196 3.197.51V0zm-.022 8.423c-.636-.217-1.353-.332-2.12-.332-2.454 0-3.921 1.413-3.921 3.978 0 2.454 1.353 3.738 3.861 3.738.746 0 1.492-.093 2.18-.304V8.423z" />
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M11.914 0C5.82 0 6.22 2.657 6.22 2.657v2.756h5.783v.826H3.945S0 5.76 0 11.879c0 6.117 3.45 5.918 3.45 5.918h2.062v-2.883s-.112-3.45 3.394-3.45h5.811s3.28.028 3.28-3.196V3.45S18.342 0 11.914 0zm-3.04 1.812a1.01 1.01 0 1 1 0 2.02 1.01 1.01 0 0 1 0-2.02zM12.086 24c6.094 0 5.694-2.657 5.694-2.657v-2.756h-5.783v-.827h8.058s3.945.478 3.945-5.641c0-6.118-3.45-5.919-3.45-5.919h-2.062v2.883s.112 3.45-3.394 3.45h-5.811s-3.28-.028-3.28 3.196v4.887S5.658 24 12.086 24zm3.04-1.812a1.01 1.01 0 1 1 0-2.02 1.01 1.01 0 0 1 0 2.02z" />
        </svg>
      );
    case "rust":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm-2.5 4h5a2.5 2.5 0 0 1 0 5H12v4H9.5V7zm2.5 2.5v2h2.5a1 1 0 0 0 0-2H12z" />
        </svg>
      );
    case "java":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M8.851 18.56s-.917.534.653.714c1.751.192 3.013.19 5.097-.225 0 0 .546.331 1.293.605-2.65.656-6.425.485-8.337-.158.468-.314 1.294-.936 1.294-.936zm-1.077-2.695s-1.07.636.567.854c2.001.267 4.148.271 6.828-.315 0 0 .376.326 1.002.547-3.303.73-7.893.59-10.05-.183.578-.363 1.656-.903 1.656-.903zm8.95-3.084c1.393 1.488-1.554 2.827-1.554 2.827s2.007-.442 1.157-1.551c-.818-1.066-2.548-1.583-4.048-2.613-1.127-.773-1.069-1.631-.476-2.457.77-1.072 1.584.28 1.584.28.397.669-.247 1.597.477 2.102 1.054.737 2.012.38 2.86.06.666-.251.782.164.782.164s-.897.404-.782 1.189zm-4.707-8.368c1.386.417 2.457 2.148 1.487 3.734-.847 1.385-2.616 1.83-3.69 2.91-1.015 1.021-1.116 2.133-1.116 2.133s-.363-.787.273-1.636c.866-1.157 2.502-1.644 3.23-2.639.69-.945.395-2.029-.184-2.404-.613-.397-1.173-.082-1.173-.082s.373-.837 1.173-2.016z" />
        </svg>
      );
    case "androidsdk":
    case "android":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997 0-.5511.4482-.9993.9993-.9993.5516 0 .9997.4482.9997.9993 0 .5511-.4481.9997-.9997.9997zm-11.046 0c-.5511 0-.9993-.4486-.9993-.9997 0-.5511.4482-.9993.9993-.9993.5516 0 .9997.4482.9997.9993 0 .5511-.4481.9997-.9997.9997zm11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1522-.5676.416.416 0 00-.5676.1522l-2.0223 3.503C15.5902 8.3517 13.8533 8 12 8s-3.5902.3517-5.1367.9498L4.841 5.4468a.416.416 0 00-.5676-.1522.416.416 0 00-.1522.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.7758h24c-.3432-4.1169-2.6889-7.5891-6.1185-9.4544z" />
        </svg>
      );
    case "web3":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M12 1L2 6v12l10 5 10-5V6L12 1zm0 2.25L18.8 7 12 10.75 5.2 7 12 3.25zM4 8.5L11 12.3v7.95L4 16.5V8.5zm16 8v-8l-7 3.8v7.95l7-3.75z" />
        </svg>
      );
    case "c":
    case "cpp":
    case "cplusplus":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M22.318 10.376v1.442h-1.442v1.442h-1.443v-1.442h-1.442v-1.442h1.442V8.934h1.443v1.442h1.442zm-5.768 0v1.442h-1.442v1.442h-1.443v-1.442h-1.442v-1.442h1.442V8.934h1.443v1.442h1.442zM10.15 15.342c-2.392 0-4.103-1.57-4.103-3.923 0-2.353 1.711-3.923 4.103-3.923 1.554 0 2.825.686 3.42 1.828l-1.92 1.054c-.266-.549-.808-.916-1.5-1.002-.857-.107-1.677.37-1.988 1.18-.184.48-.184 1.01 0 1.49.311.81 1.131 1.287 1.988 1.18.692-.086 1.234-.453 1.5-1.002l1.92 1.054c-.595 1.142-1.866 1.828-3.42 1.828z" />
        </svg>
      );
    case "csharp":
    case "cs":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M22.318 10.376v1.442h-1.442v1.442h-1.443v-1.442h-1.442v-1.442h1.442V8.934h1.443v1.442h1.442zm-2.885-2.885v1.442h-1.442v1.442h-1.443V8.933h-1.442V7.491h1.442V6.049h1.443v1.442h1.442zm0 5.769v1.442h-1.442v1.442h-1.443v-1.442h-1.442v-1.442h1.442v-1.442h1.443v1.442h1.442zM10.15 15.342c-2.392 0-4.103-1.57-4.103-3.923 0-2.353 1.711-3.923 4.103-3.923 1.554 0 2.825.686 3.42 1.828l-1.92 1.054c-.266-.549-.808-.916-1.5-1.002-.857-.107-1.677.37-1.988 1.18-.184.48-.184 1.01 0 1.49.311.81 1.131 1.287 1.988 1.18.692-.086 1.234-.453 1.5-1.002l1.92 1.054c-.595 1.142-1.866 1.828-3.42 1.828z" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72 1.02 1.824.444 2.85l.006.006-2.585 2.586a2.001 2.001 0 01-2.83 0 2 2 0 010-2.828l2.451-2.452c-.22-.19-.485-.32-.782-.375a1.996 1.996 0 01-1.109-.504 1.996 1.996 0 01-.504-1.109 2.012 2.012 0 01.375-.782L11.026 8.35v6.52c.215.114.407.27.561.464a2 2 0 11-2.83-2.828l.008-.008V8.125a2.006 2.006 0 01-.569-.472 2.001 2.001 0 01-.444-1.9L4.996 2.997.454 7.539c-.603.604-.603 1.582 0 2.188l10.479 10.478c.604.604 1.582.604 2.188 0l10.425-10.424c.606-.603.606-1.581 0-2.187z" />
        </svg>
      );
    case "vite":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M23.149 3.513l-10.37 19.349a.86.86 0 01-1.52 0L.889 3.513a.86.86 0 01.993-1.229l9.64 2.378a.86.86 0 00.916-.279L16.27.79a.86.86 0 011.455.45l.93 6.953a.86.86 0 00.672.724l3.05.656a.86.86 0 01.772.94z" />
        </svg>
      );
    case "vercel":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M24 22.5L12 1.5 0 22.5h24z" />
        </svg>
      );
    case "vscode":
    case "visualstudiocode":
    case "code":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.12a.997.997 0 00-1.28.07L.33 7.23a.998.998 0 00-.05 1.43l3.87 4.09-3.87 4.09a.998.998 0 00.05 1.43l1.31 1.15c.38.33.95.3 1.28-.07l4.12-3.12 9.46 8.63c.49.45 1.22.56 1.82.27l4.83-2.32c.56-.27.92-.84.92-1.46V4.05c0-.62-.36-1.19-.92-1.46zM18 17.57l-6.89-5.57L18 6.43v11.14z" />
        </svg>
      );
    case "eslint":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.8 17.4l-4.8-4.8 1.692-1.692 3.108 3.108 7.308-7.308 1.692 1.692-9 9z" />
        </svg>
      );
    case "framermotion":
    case "framer":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M0 0h12v12H0zM12 0h12v12H12zM0 12h12v12H0zM12 12h12l-12 12z" />
        </svg>
      );
    case "kotlin":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M24 24H0V0h24L12 12l12 12z" />
        </svg>
      );
    case "jetpackcompose":
    case "compose":
    case "material3":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M12 1.5l9 5.25v10.5L12 22.5l-9-5.25V6.75L12 1.5zm0 2.31L5 7.84v8.32l7 4.03 7-4.03V7.84l-7-4.03zm0 3.19l4.5 2.6v5.2L12 17.4l-4.5-2.6v-5.2L12 7z" />
        </svg>
      );
    case "hilt":
    case "room":
    case "workmanager":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
        </svg>
      );
    case "fastapi":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.86 5.5h5.36l-3.5 5.25h3.36L10.5 19v-5.75H7.14L11.14 5.5z" />
        </svg>
      );
    case "sql":
    case "recharts":
    case "restapis":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M3 20h18v2H3v-2zm2-8h3v7H5v-7zm5-5h3v12h-3V7zm5 8h3v4h-3v-4zM4 2h16v2H4V2z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      );
  }
}
