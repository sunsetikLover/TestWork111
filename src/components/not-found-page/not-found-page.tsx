import Link from 'next/link'
import s from './not-found-page.module.scss'

export const NotFoundPage = () => {
  return (
    <div className={s.wrap}>
      <div className='container'>
        <div className={s['wrap-content']}>
          <h1 className={s.title}>404 - ничего не найдено</h1>

          <div className={s['wrap-desc']}>
            <p className={s.desc}>Извините, но запрашиваемая вами страница не существует. Возможно, вы ошиблись в адресе или страница была удалена.</p>
          </div>

          <div>
            <Link className={s.link} href="/">На главную</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
