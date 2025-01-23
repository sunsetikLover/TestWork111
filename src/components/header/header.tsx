'use client';

import { useRouter } from 'next/navigation';

import { LogoIcon } from '@/icons';

import s from './header.module.scss';

interface Props {
  isExists?: boolean;
}

export const Header = ({ isExists = true }: Props) => {
  const { push } = useRouter();
  return (
    <header className={s.wrap}>
      <div className={`${s.header} ${!isExists && s.isExists}`}>
        <div className={s['logo-wrap']} onClick={() => push('/')}>
          <LogoIcon />
          <p className={s['text-logo']}>WeatherCheck</p>
        </div>
      </div>
    </header>
  );
};
