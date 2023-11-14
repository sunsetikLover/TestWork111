import { SVGProps } from "react"

export const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={23}
    fill="none"
    {...props}
  >
    <ellipse cx={7.892} cy={6.023} fill="url(#a)" rx={5.566} ry={6.023} />
    <g filter="url(#b)">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M13.916 22.555H7.138A7.138 7.138 0 0 1 0 15.416v-.18a6.958 6.958 0 0 1 10.336-6.084c1.212-4.177 5.066-7.23 9.634-7.23 5.54 0 10.03 4.49 10.03 10.03v.286c0 5.698-4.619 10.317-10.316 10.317h-5.768Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <radialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-7.78043 9.30627 -9.205 -7.69576 10.107 2.74)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFF72C" />
        <stop offset={1} stopColor="#DF7800" />
      </radialGradient>
      <filter
        id="b"
        width={302.096}
        height={292.729}
        x={-188.374}
        y={-155.057}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={83.722} dy={-156.979} />
        <feGaussianBlur stdDeviation={156.979} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="shape" result="effect1_innerShadow_6913_663" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-188.374} dy={115.118} />
        <feGaussianBlur stdDeviation={156.979} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend
          in2="effect1_innerShadow_6913_663"
          result="effect2_innerShadow_6913_663"
        />
      </filter>
    </defs>
  </svg>
)