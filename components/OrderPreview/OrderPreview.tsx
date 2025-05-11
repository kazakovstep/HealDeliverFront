'use client'
import styles from './OrderPreview.module.css'
import { OrderPreviewProps } from './OrderPreviewProps.props'
import { H } from '../Htag/Htag'
import { Button } from '../Button/Button'
import Link from 'next/link'

export const OrderPreview = ({ order }: OrderPreviewProps) => {
	return (
		<tr key={order.id} className={styles.underline}>
			<th className={styles.id}>
				<H type='body' size='medium'>
					{order.id}
				</H>
			</th>
			<th className={styles.date}>
				<H type='body' size='medium'>
					{String(order.date)}
				</H>
			</th>
			<th className={styles.cost}>
				<H type='body' size='medium'>
					{order.cost} руб.
				</H>
				<H type='body' size='tiny'>
					({order.amount} продуктов)
				</H>
			</th>
			<th className={styles.date}>
				<H type='body' size='tiny'>
					{order.deliveryAddress}
				</H>
			</th>
			<th className={styles.more}>
				<Link href={`/lk/orders/${order.id}`}>
					<Button type={'text'} className={styles.back}>
						Подробнее
					</Button>
				</Link>
			</th>
		</tr>
	)
}
