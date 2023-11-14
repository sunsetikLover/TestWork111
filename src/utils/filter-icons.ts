import {
  CLearIcon,
  CloudsIcon,
  DrizzleIcon,
  RainIcon,
  SandIcon,
  SmokeIcon,
  SnowIcon,
  SquallIcon,
  ThunderStormIcon,
  TornadoIcon,
} from '@/icons'

interface Props {
  name: string
  icon: any
  height: number
  width: number
}

export const getIcon: Props[] = [
  {
    name: 'Thunderstorm',
    icon: ThunderStormIcon,
    height: 66,
    width: 73,
  },
  {
    name: 'Drizzle',
    icon: DrizzleIcon,
    width: 73,
    height: 59,
  },
  {
    name: 'Rain',
    icon: RainIcon,
    width: 73,
    height: 59,
  },
  {
    name: 'Snow',
    icon: SnowIcon,
    width: 73,
    height: 59,
  },
  {
    name: 'Mist',
    icon: SmokeIcon,
    width: 53,
    height: 32,
  },
  {
    name: 'Smoke',
    icon: SmokeIcon,
    width: 73,
    height: 59,
  },
  {
    name: 'Haze',
    icon: SmokeIcon,
    width: 73,
    height: 59,
  },
  {
    name: 'Fog',
    icon: SmokeIcon,
    width: 73,
    height: 59,
  },
  {
    name: 'Sand',
    icon: SandIcon,
    width: 47,
    height: 44,
  },
  {
    name: 'Dust',
    icon: SandIcon,
    width: 73,
    height: 59,
  },
  {
    name: 'Ash',
    icon: SandIcon,
    width: 73,
    height: 59,
  },
  {
    name: 'Squall',
    icon: SquallIcon,
    width: 73,
    height: 59,
  },
  {
    name: 'Tornado',
    icon: TornadoIcon,
    width: 73,
    height: 59,
  },
  {
    name: 'Clear',
    icon: CLearIcon,
    width: 54,
    height: 54,
  },
  {
    name: 'Clouds',
    icon: CloudsIcon,
    width: 73,
    height: 59,
  },
]
