'use client';

import type { Metadata } from 'next';

import { NotFoundPage } from '@/components';

export const metadata: Metadata = {
  title: 'Ошибка',
  description: 'Непредвиденная ситуация',
};

export default function Error({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <NotFoundPage />;
}
