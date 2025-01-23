import type { Metadata } from 'next';

import { NotFoundPage } from '@/components';

export const metadata: Metadata = {
  title: 'Ничего не найдено',
  description: 'Страница "Ничего не найдено"',
};

export default function NotFound() {
  return <NotFoundPage />;
}
