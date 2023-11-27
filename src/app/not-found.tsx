import { NotFoundPage } from "@/components";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ничего не найдено',
  description: 'Страница "Ничего не найдено"',
}

export default function NotFound() {
  return (
    <NotFoundPage />
  )
}