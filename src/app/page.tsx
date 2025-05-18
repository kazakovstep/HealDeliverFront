'use client'

import { H } from '../../components/Htag/Htag'
import { Button } from '../../components/Button/Button'
import styles from '../styles/page.module.css'
import { CardRow } from '../../components/CardRow/CardRow'
import { useGetProductsQuery } from '@/store/api/api'
import { useEffect } from 'react'
import { withMainLayout } from '@/layout/MainLayout/MainLayout'
import { useSession } from 'next-auth/react'

const Products = [
	{ category: 'Фрукты', type: 'fruit' },
	{ category: 'Овощи', type: 'vegetable' },
	{ category: 'Мясо', type: 'meat' },
	{ category: 'Молочные продукты', type: 'milk' },
	{ category: 'Хлебные изделия', type: 'bread' },
]

function Home() {
	const { data, isLoading, error } = useGetProductsQuery()

	const session = useSession()

	console.log('user', session.data?.user)

	return (
		<>
			<div className={styles.first}>
				<div className={styles.firstContainer}>
					<div className={styles.leftSideFirst}>
						<H type={'body'} size={'small'} className={styles.green}>
							ДОБРО ПОЖАЛОВАТЬ В HEALDELIVER
						</H>
						<H type={'h1'} weight={600}>
							Доставим быстро <br />
							Натуральные продукты
						</H>
						<div className={styles.saleContainer}>
							<H type={'body'} size={'small'} className={styles.gray}>
								Быстрая доставка!
							</H>
						</div>
						<Button type={'fill'} size={'medium'} className={styles.buy}>
							Оформить заказ
							<img src={'../whiteArrow.svg'} alt={'whiteArrow'} />
						</Button>
					</div>
					<img
						className={styles.firstContainerImg}
						src={'../firstLanding.svg'}
						alt={'firstLanding'}
					/>
				</div>
				<div className={styles.bottomContainer}>
					<div className={styles.bottomItem}>
						<img src={'../shipping.svg'} alt={'shipping'} />
						<div className={styles.bottomWords}>
							<H type={'body'} size={'small'} weight={600}>
								Быстрая доставка
							</H>
							<H type={'body'} size={'tiny'} className={styles.gray}>
								Доставляем в пределах МКАДа не более 90 минут
							</H>
						</div>
					</div>
					<div className={styles.bottomItem}>
						<img src={'../support.svg'} alt={'support'} />
						<div className={styles.bottomWords}>
							<H type={'body'} size={'small'} weight={600}>
								Поддержка клиентов 24/7
							</H>
							<H type={'body'} size={'tiny'} className={styles.gray}>
								Мгновенный доступ к службе поддержки
							</H>
						</div>
					</div>
					<div className={styles.bottomItem}>
						<img src={'../payment.svg'} alt={'payment'} />
						<div className={styles.bottomWords}>
							<H type={'body'} size={'small'} weight={600}>
								100% Безопасный платеж
							</H>
							<H type={'body'} size={'tiny'} className={styles.gray}>
								Мы гарантируем экономию ваших денег
							</H>
						</div>
					</div>
					<div className={styles.bottomItem}>
						<img src={'../moneyBack.svg'} alt={'moneyBack'} />
						<div className={styles.bottomWords}>
							<H type={'body'} size={'small'} weight={600}>
								Гарантия возврата денег
							</H>
							<H type={'body'} size={'tiny'} className={styles.gray}>
								Гарантия возврата денег 30 дней
							</H>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.featured}>
				<H type={'h3'} weight={600}>
					Популярные продукты
				</H>
				{Products.map(product => (
					<div key={product.category} className={styles.catalogCategory}>
						<H type={'h5'}>{product.category}</H>
						<CardRow
							type={product.type}
							// @ts-ignore
							data={data}
						/>
					</div>
				))}
			</div>
		</>
	)
}

export default withMainLayout(Home)
