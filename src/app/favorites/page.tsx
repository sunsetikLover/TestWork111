import type { Metadata } from 'next';

import { FavoriteCities } from '@/components';

export const metadata: Metadata = {
  title: 'Избранные города',
  description: 'Избранные города',
};

export default function HomePage() {
  return <FavoriteCities />;
}
