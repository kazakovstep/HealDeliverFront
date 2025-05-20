'use client'
import { actions as CartActions } from '@/store/slices/cart.slice'
import { actions as ProductActions } from '@/store/slices/products.slice'
import { RootState } from '@/store/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../Button/Button'
import { H } from '../Htag/Htag'
import styles from './CartPreview.module.css'
import { CardRowProps } from './CartPreviewProps.props'

export const CartPreview = ({ index, product }: CardRowProps) => {
	const [file, setFile] = useState()
	useEffect(() => {
		try {
			fetch(`/api/image/${product.id}`, {
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

	const arr = useSelector((state: RootState) => state.cart?.quantities)

	const dispatch = useDispatch()

	const handleMinus = () => {
		if (arr[product.id] != 1) {
			dispatch(
				CartActions.removeFromCartSum({
					price: product.price,
					productId: product.id,
				})
			)
			dispatch(
				CartActions.updateQuantity({
					productId: product.id,
					amount: arr[product.id] - 1,
				})
			)
		}
		if (arr[product.id] == 1) {
			dispatch(
				CartActions.removeFromCart({
					price: product.price,
					productId: product.id,
				})
			)
			dispatch(ProductActions.toggleCart(product))
			dispatch(CartActions.deleteQuantity({ productId: product.id }))
		}
	}

	const handlePlus = () => {
		dispatch(
			CartActions.addToCartSum({ price: product.price, productId: product.id })
		)
		dispatch(
			CartActions.updateQuantity({
				productId: product.id,
				amount: arr[product.id] + 1,
			})
		)
	}

	const handleDelete = () => {
		dispatch(
			CartActions.removeFromCart({
				price: product.price * arr[product.id],
				productId: product.id,
			})
		)
		dispatch(ProductActions.toggleCart(product))
		dispatch(CartActions.deleteQuantity({ productId: product.id }))
	}

	return (
		<tr key={product.id} className={styles.underline}>
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
				<div className={styles.amount}>
					<Button
						type={'fill'}
						className={styles.amountButton}
						onClick={handleMinus}
					>
						-
					</Button>
					<H type='body' size='medium'>
						{arr[product.id]}
					</H>
					<Button
						type={'fill'}
						className={styles.amountButton}
						onClick={handlePlus}
					>
						+
					</Button>
				</div>
			</th>
			<th>
				<H type='body' size='medium'>
					{product.price * arr[product.id]} руб.
				</H>
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
