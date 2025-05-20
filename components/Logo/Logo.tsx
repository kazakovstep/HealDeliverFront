import styles from './Logo.module.css'
import { H } from '../Htag/Htag'
import { LogoProps } from './Logo.props'
import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

export const Logo = ({ className }: LogoProps): JSX.Element => {
	return (
		<Link href={'/'} className={cn(styles.logo, className)}>
			<Image src='/logo.svg' alt='Logo' width={24} height={24} />
			<H type={'h4'}>HealDeliver</H>
		</Link>
	)
}
