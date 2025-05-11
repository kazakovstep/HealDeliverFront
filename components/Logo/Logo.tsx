import styles from './Logo.module.css'
import { H } from '../Htag/Htag'
import { LogoProps } from './Logo.props'
import cn from 'classnames'
import Link from 'next/link'
export const Logo = ({ className }: LogoProps): JSX.Element => {
	return (
		<Link href={'/'} className={cn(styles.logo, className)}>
			<object data={'../logo.svg'} />
			<H type={'h4'}>HealDeliver</H>
		</Link>
	)
}
