import { ArrowBackIcon } from '@/icons';
import Link from 'next/link';

import s from './go-back.module.scss';

export const GoBack = () => {
  return (
    <Link href={'/'} className={s['wrap-back']}>
      <ArrowBackIcon />
      <p className={s.back}>Назад</p>
    </Link>
  );
};
