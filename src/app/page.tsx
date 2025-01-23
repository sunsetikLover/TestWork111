import type { Metadata } from 'next';

import { Home } from '@/components';

export const metadata: Metadata = {
  title: 'Главная',
  description: 'Сайт о погоде',
};

export default function HomePage() {
  return <Home />;
}
