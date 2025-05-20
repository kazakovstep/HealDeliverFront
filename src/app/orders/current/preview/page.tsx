'use client'

import { withMainLayout } from '@/layout/MainLayout/MainLayout'
import { useGetCurrentOrderQuery } from '@/store/api/order.api'
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute'
import styles from './preview.module.css'
import { H } from '../../../../../components/Htag/Htag'
import { useEffect, useState } from 'react'
import { useGetCurrentUserQuery } from '@/store/api/user.api'

function PreviewPage() {
	const userId = useGetCurrentUserQuery().data?.id
	const { data: order, isLoading } = useGetCurrentOrderQuery(Number(userId), {
		skip: !userId,
	})

	if (isLoading) {
		return <div>Загрузка...</div>
	}

	if (!order) {
		return <div>У вас нет активных заказов</div>
	}

	return (
		<ProtectedRoute>
			<div className={styles.container}>
				<H type={'h3'} weight={600} className={styles.title}>
					Текущий заказ
				</H>

				<div className={styles.orderInfo}>
					<div className={styles.section}>
						<H type={'h5'}>Информация о заказе</H>
						<div className={styles.infoGrid}>
							<div className={styles.infoItem}>
								<span>Номер заказа:</span>
								<span>{order.id}</span>
							</div>
							<div className={styles.infoItem}>
								<span>Дата создания:</span>
								<span>{new Date(order.date).toLocaleString()}</span>
							</div>
							<div className={styles.infoItem}>
								<span>Общая сумма:</span>
								<span>{order.cost} руб.</span>
							</div>
							<div className={styles.infoItem}>
								<span>Количество товаров:</span>
								<span>{order.amount}</span>
							</div>
						</div>
					</div>

					<div className={styles.section}>
						<H type={'h5'}>Адрес доставки</H>
						<div className={styles.address}>
							<p>{order.deliveryAddress}</p>
						</div>
					</div>

					{order.deliveryPerson && (
						<div className={styles.section}>
							<H type={'h5'}>Курьер</H>
							<div className={styles.deliveryPerson}>
								<div className={styles.infoItem}>
									<span>Имя:</span>
									<span>{order.deliveryPerson.name}</span>
								</div>
								<div className={styles.infoItem}>
									<span>Телефон:</span>
									<span>{order.deliveryPerson.phone}</span>
								</div>
							</div>
						</div>
					)}

					<div className={styles.section}>
						<H type={'h5'}>Товары в заказе</H>
						<div className={styles.products}>
							{order.orderProducts.map(({ product, quantity }) => (
								<div key={product.id} className={styles.product}>
									<div className={styles.productInfo}>
										<H type={'body'}>{product.title}</H>
										<p className={styles.productPrice}>
											{product.price} руб. x {quantity}
										</p>
									</div>
									<div className={styles.productTotal}>
										{product.price * quantity} руб.
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	)
}

export default withMainLayout(PreviewPage)
