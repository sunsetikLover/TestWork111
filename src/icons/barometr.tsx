import { SVGProps } from "react"

export const BarometrIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <circle cx={12} cy={13} r={10.8} fill="#494F68" />
      <path
        fill="#fff"
        d="M14.166 14.105a2.437 2.437 0 0 0-3.282-3.282L8.281 8.22A.75.75 0 1 0 7.22 9.28l2.603 2.603a2.437 2.437 0 0 0 3.282 3.282l.614.614a.75.75 0 1 0 1.061-1.06l-.614-.615Zm-2.171-.172a.937.937 0 1 1-.001-1.875.937.937 0 0 1 0 1.875Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
