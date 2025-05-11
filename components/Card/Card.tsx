'use client'

import { actions as CartActions } from '@/store/slices/cart.slice'
import { actions as FavActions } from '@/store/slices/favourites.slice'
import { actions as ProductActions } from '@/store/slices/products.slice'
import { RootState } from '@/store/store'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { H } from '../Htag/Htag'
import { Rating } from '../Rating/Rating'
import styles from './Card.module.css'
import { CardProps } from './Card.props'
import { token } from '@/store/api/user.api'
import Link from 'next/link'

export const Card = ({ data, ...props }: CardProps) => {
	const [isLiked, setLiked] = useState(false)

	const handleLike = () => {
		if (token) {
			dispatch(FavActions.toggleFavourite(data))
			setLiked(!isLiked)
		} else {
			window.location.href = '/login'
		}
	}

	const [isBuyed, setBuyed] = useState(false)

	const dispatch = useDispatch()

	const handleBuy = () => {
		if (token) {
			if (isBuyed) {
				dispatch(CartActions.removeFromCart(data.price))
			} else {
				dispatch(CartActions.addToCart(data.price))
			}
			setBuyed(!isBuyed)
			dispatch(ProductActions.toggleCart(data))
		} else {
			window.location.href = '/login'
		}
	}

	const ids = useSelector((state: RootState) =>
		state?.products?.map(product => product.id)
	)
	const favIds = useSelector((state: RootState) =>
		state?.favourites?.favourites.map(product => product.id)
	)

	const [file, setFile] = useState()

	useEffect(() => {
		if (ids?.includes(data.id)) {
			setBuyed(true)
		}
		if (favIds?.includes(data.id)) {
			setLiked(true)
		}
		try {
			fetch(`http://localhost:8080/image/${data.id}`, {
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
		<div className={styles.card}>
			<img src={file} className={styles.image} alt={data.title} />
			<div className={styles.buyInfo}>
				<Link href={`/product/${data.id}`}>
					<div className={styles.info}>
						<H type={'body'} size={'small'} className={styles.name}>
							{data.title}
						</H>
						<H type={'body'} size={'medium'} weight={600}>
							{data.price} руб.
						</H>
						<Rating stars={4} />
					</div>
				</Link>
				<button
					className={cn(styles.buyButton, {
						[styles.buyed]: isBuyed,
					})}
					onClick={() => handleBuy()}
				/>
			</div>
			<button
				className={cn(styles.likeButton, {
					[styles.liked]: isLiked,
				})}
				onClick={handleLike}
			/>
		</div>
	)
}
