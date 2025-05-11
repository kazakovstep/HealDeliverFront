'use client'
import styles from './OrderPage.module.css'
import { OrderPageProps } from './OrderPage.props'
import { useGetOrderByIdQuery } from '@/store/api/order.api'
import { H } from '../Htag/Htag'
import Link from 'next/link'
import { Button } from '../Button/Button'
import { OrderPreview } from '../OrderPreview/OrderPreview'
import { useEffect, useState } from 'react'
import cn from 'classnames'

export const OrderPage = ({ orderId }: OrderPageProps) => {
	const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId)

	const [files, setFiles] = useState({})

	useEffect(() => {
		console.log(order?.orderProducts)
		if (order && order.orderProducts) {
			order.orderProducts.forEach(product => {
				fetch(`http://localhost:8080/image/${product.product.id}`, {
					method: 'POST',
				})
					.then(response => {
						if (!response.ok) {
							throw new Error('Network response was not ok')
						}
						return response.blob()
					})
					.then(data => {
						const file = new File([data], 'image.jpg', { type: 'image/jpeg' })
						setFiles(prevFiles => ({
							...prevFiles,
							[product.product.id]: URL.createObjectURL(file),
						}))
					})
					.catch(error => {
						console.error('There was a with the fetch operation:', error)
					})
			})
		}
	}, [order])

	return (
		<div className={styles.page}>
			<div className={styles.head}>
				<div className={styles.left}>
					<H type={'body'} size={'xl'} weight={500}>
						Детали заказа #{order?.id}
					</H>
					<H type={'body'} size={'small'}>
						•
					</H>
					<H type={'body'} size={'small'}>
						{String(order?.date)}
					</H>
					<H type={'body'} size={'small'}>
						•
					</H>
					<H type={'body'} size={'small'}>
						{order?.amount} продуктов
					</H>
					<H type={'body'} size={'small'}>
						•
					</H>
					<H type={'body'} size={'small'}>
						{order?.deliveryAddress}
					</H>
				</div>
				<Link href={'/lk/orders'}>
					<Button type={'text'} className={styles.back}>
						Назад к заказам
					</Button>
				</Link>
			</div>
			<table className={styles.table}>
				<tbody>
					<tr className={styles.headTable}>
						<th>
							<H type={'body'} size={'small'} style={{ textAlign: 'left' }}>
								ПРОДУКТ
							</H>
						</th>
						<th>
							<H type={'body'} size={'small'}>
								СТОИМОСТЬ
							</H>
						</th>
						<th>
							<H type={'body'} size={'small'}>
								КОЛИЧЕСТВО
							</H>
						</th>
						<th>
							<H type={'body'} size={'small'}>
								ИТОГО
							</H>
						</th>
						<th></th>
					</tr>
					{order?.orderProducts?.map(product => (
						<tr key={product.product.id}>
							<th className={styles.titleBlock}>
								<img
									//@ts-ignore
									src={files[product.product.id]}
									alt={product.product.title}
									width={100}
								/>
								<H type={'body'} size={'small'}>
									{product.product.title}
								</H>
							</th>
							<th>
								<H type={'body'} size={'small'}>
									{product.product.price} руб.
								</H>
							</th>
							<th>
								<H type={'body'} size={'small'}>
									x{product.quantity}
								</H>
							</th>
							<th>
								<H type={'body'} size={'small'}>
									{product.quantity * product.product.price} руб.
								</H>
							</th>
							<th>
								<Link href={''} className={styles.more}>
									<Button type={'text'} className={cn(styles.back)}>
										К продукту
									</Button>
								</Link>
							</th>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
