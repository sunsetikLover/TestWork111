'use client'

import { NotFoundPage } from '@/components'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ошибка',
  description: 'Непредвиденная ситуация',
}

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  // useEffect(() => {
  //   console.error(error)
  // }, [error])

  return (
    <NotFoundPage />
  )
}