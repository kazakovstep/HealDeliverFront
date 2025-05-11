import { FooterProps } from './Footer.props'
import cn from 'classnames'
import styles from './Footer.module.css'
import { Logo } from '../../components/Logo/Logo'
import { H } from '../../components/Htag/Htag'

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={styles.footer}>
			<div className={styles.leftSide}>
				<Logo className={styles.logo} />
				<H type={'body'} size={'small'} className={styles.h}>
					HealDeliver - курсовая работа студента ИКБО-16-22 Казакова Степана.
				</H>
				<H type={'body'} size={'small'} className={styles.h}>
					Наши контакты:
					<br />
					<a href={'mailto: kazakov.step@yandex.ru'}>kazakov.step@yandex.ru</a>
				</H>
			</div>
			<div className={styles.rightSide}>
				<img
					className={styles.leftFooter}
					src={'../leftFooter.svg'}
					alt={'leftFooter'}
				/>
				<H type={'body'} size={'large'} className={styles.h}>
					Мой аккаунт
				</H>
				<H type={'body'} size={'large'} className={styles.h}>
					История заказов
				</H>
				<H type={'body'} size={'large'} className={styles.h}>
					Избранное
				</H>
				<H type={'body'} size={'large'} className={styles.h}>
					О нас
				</H>
				<img
					className={styles.rightFooter}
					src={'../rightFooter.svg'}
					alt={'rightFooter'}
				/>
			</div>
		</footer>
	)
}
