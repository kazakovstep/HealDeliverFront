'use client'

import { withMainLayout } from '@/layout/MainLayout/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useEffect, useState } from 'react'
import { actions as FavActions } from '@/store/slices/favourites.slice'
import {
	actions as CartAction,
	actions as CartActions,
} from '@/store/slices/cart.slice'
import {
	actions as ProductAction,
	actions as ProductActions,
} from '@/store/slices/products.slice'
import { useGetProductsCartQuery } from '@/store/api/product.api'
import Link from 'next/link'
import { Button } from '../../../../components/Button/Button'
import styles from '../../../styles/product.module.css'
import { H } from '../../../../components/Htag/Htag'
import cn from 'classnames'

const Page = ({ params }: { params: { id: number } }) => {
	const { data } = useGetProductsCartQuery(params.id)

	const [isLiked, setLiked] = useState(false)

	const token =
		typeof window !== 'undefined' ? window.localStorage.getItem('token') : null

	const handleLike = () => {
		if (token) {
			dispatch(FavActions.toggleFavourite(data))
			setLiked(!isLiked)
		} else {
			window.location.href = '/login'
		}
	}

	const dispatch = useDispatch()

	const ids = useSelector((state: RootState) =>
		state?.products?.map(product => product.id)
	)
	const favIds = useSelector((state: RootState) =>
		state?.favourites?.favourites.map(product => product.id)
	)

	const [file, setFile] = useState()

	const handleBuy = () => {
		if (isBuy) {
			dispatch(CartAction.removeFromCart(data?.price))
		} else {
			dispatch(CartAction.addToCart(data?.price))
		}
		setBuy(!isBuy)
		dispatch(ProductAction.toggleCart(data))
	}

	const [isBuy, setBuy] = useState(false)

	useEffect(() => {
		if (ids?.includes(Number(data?.id))) {
			setBuy(true)
		} else {
			setBuy(false)
		}
	}, [data])

	useEffect(() => {
		if (favIds?.includes(Number(data?.id))) {
			setLiked(true)
		}
		try {
			fetch(`/api/image/${data?.id}`, {
				method: 'POST',
			})
				.then(response => response.blob())
				.then(data => {
					const file = new File([data], 'image.jpg', { type: 'image/jpeg' })
					// @ts-ignore
					setFile(URL.createObjectURL(file))
				})
				.catch(error => {
					console.log(error)
				})
		} catch (error) {
			console.log(error)
		}
	}, [data])

	return (
		<>
			<Link href={'/'}>
				<Button type={'text'} size={'large'}>
					К каталогу
				</Button>
			</Link>
			<div className={styles.page}>
				<div className={styles.titleContainer}>
					<img src={file} className={styles.image} alt={data?.title} />
					<div className={styles.product}>
						<div className={styles.productInfo}>
							<div
								style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
							>
								<H type={'h5'}>{data?.title}</H>
								<H type={'body'} size={'tiny'}>
									{data?.country}
								</H>
								{Number(data?.amount) >= 0 ? (
									<div className={styles.available}>В наличии</div>
								) : (
									<div className={styles.unavailable}>Нет в наличии</div>
								)}
							</div>
							<H type={'h5'}>{data?.price} руб.</H>
							<div
								style={{ display: 'flex', gap: '1rem', margin: 'auto auto' }}
							>
								<button
									className={cn(styles.likeButton, {
										[styles.liked]: isLiked,
									})}
									onClick={handleLike}
								/>
								<Button
									type={Number(data?.amount) >= 0 ? 'fill' : 'ghost'}
									onClick={handleBuy}
								>
									{!isBuy ? 'В корзину' : 'Удалить из корзины'}
								</Button>
							</div>
						</div>
						<div style={{ textAlign: 'left' }}>
							<H type={'body'} size={'xxl'}>
								<span className={styles.green}>Пищевая ценность</span> на 100гр
							</H>
							<div className={styles.fitness}>
								<div className={styles.fitnessItem}>
									<H type={'body'} size={'xl'}>
										Калорийность:
									</H>
									<H type={'body'} size={'xl'}>
										<span className={styles.green}>{data?.calories} кКал</span>
									</H>
								</div>
								<div className={styles.fitnessItem}>
									<H type={'body'} size={'xl'}>
										Жиры:
									</H>
									<H type={'body'} size={'xl'}>
										<span className={styles.green}>{data?.fats} гр</span>
									</H>
								</div>
								<div className={styles.fitnessItem}>
									<H type={'body'} size={'xl'}>
										Белки:
									</H>
									<H type={'body'} size={'xl'}>
										<span className={styles.green}>{data?.proteins} гр</span>
									</H>
								</div>
								<div className={styles.fitnessItem}>
									<H type={'body'} size={'xl'}>
										Углеводы:
									</H>
									<H type={'body'} size={'xl'}>
										<span className={styles.green}>
											{data?.carbohydrates} гр
										</span>
									</H>
								</div>
								<div className={styles.fitnessItem}>
									<H type={'body'} size={'xl'}>
										Клетчатка:
									</H>
									<H type={'body'} size={'xl'}>
										<span className={styles.green}>{data?.cellulose} гр</span>
									</H>
								</div>
							</div>
						</div>
					</div>
				</div>
				<H type={'body'} size={'small'} style={{ textAlign: 'justify' }}>
					{data?.description}
				</H>
			</div>
		</>
	)
}

export default withMainLayout(Page)
