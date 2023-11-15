import { Header, SearchCity } from "@/components";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Главная',
  description: 'Сайт о погоде',
}

export default function Home() {
  return (
    <>
      <Header />
      <SearchCity />
    </>
  )
}
