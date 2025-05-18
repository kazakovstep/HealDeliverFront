'use client'
import styles from './FavPreview.module.css'
import { CardRowProps } from './FavPreviewProps.props'
import { H } from '../Htag/Htag'
import { useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { actions as FavsActions } from '@/store/slices/favourites.slice'
import { actions as CartAction } from '@/store/slices/cart.slice'
import { actions as ProductAction } from '@/store/slices/products.slice'
import { RootState } from '@/store/store'

export const FavPreview = ({ product }: CardRowProps) => {
	const [file, setFile] = useState()
	useEffect(() => {
		try {
			fetch(`http://localhost:8080/api/image/${product.id}`, {
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
	}, [product])

	const dispatch = useDispatch()

	const handleDelete = () => {
		dispatch(FavsActions.toggleFavourite(product))
	}

	const handleBuy = () => {
		if (isBuy) {
			dispatch(CartAction.removeFromCart(product.price))
		} else {
			dispatch(CartAction.addToCart(product.price))
		}
		setBuy(!isBuy)
		dispatch(ProductAction.toggleCart(product))
	}

	const cartIds = useSelector((state: RootState) =>
		state.products?.map(product => product.id)
	)

	const [isBuy, setBuy] = useState(false)

	useEffect(() => {
		if (cartIds?.includes(product.id)) {
			setBuy(true)
		} else {
			setBuy(false)
		}
	}, [product])

	return (
		<tr key={product.id}>
			<th>
				<div className={styles.productInfo}>
					<img className={styles.img} src={file} alt={product.title} />
					<H type='body' size='medium'>
						{product.title}
					</H>
				</div>
			</th>
			<th>
				<H type='body' size='medium'>
					{product.price} руб.
				</H>
			</th>
			<th>
				{product.amount >= 0 ? (
					<div className={styles.available}>В наличии</div>
				) : (
					<div className={styles.unavailable}>Нет в наличии</div>
				)}
			</th>
			<th>
				<Button
					type={product.amount >= 0 ? 'fill' : 'ghost'}
					onClick={handleBuy}
				>
					{!isBuy ? 'В корзину' : 'Удалить из корзины'}
				</Button>
			</th>
			<th>
				<Button
					type={'border'}
					className={styles.amountButton}
					onClick={handleDelete}
				>
					x
				</Button>
			</th>
		</tr>
	)
}
