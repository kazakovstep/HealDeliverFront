'use client'
import styles from '../../../styles/orders.module.css'
import { withAccountLayout } from '@/layout/AccountLayout/AccountLayout'
import { useGetCurrentUserQuery } from '@/store/api/user.api'
import { useGetUserOrdersQuery } from '@/store/api/order.api'
import { H } from '../../../../components/Htag/Htag'
import cn from 'classnames'
import { FavPreview } from '../../../../components/FavPreview/FavPreview'
import Link from 'next/link'
import { Button } from '../../../../components/Button/Button'
import { CartPreview } from '../../../../components/CartPreview/CartPreview'
import { OrderPreview } from '../../../../components/OrderPreview/OrderPreview'

function Page() {
	const { data: orders, isLoading, error } = useGetUserOrdersQuery()

	return (
		<div className={styles.page}>
			<H type={'h5'} weight={400}>
				Мои заказы
			</H>
			<div
				className={cn(styles.content, {
					[styles.empty]: orders?.length === 0,
				})}
			>
				{orders?.length !== 0 ? (
					<>
						<table className={styles.table}>
							<tbody>
								<tr className={styles.tableHeader}>
									<th>
										<H type={'body'} size={'small'}>
											ID
										</H>
									</th>
									<th>
										<H type={'body'} size={'small'}>
											ДАТА
										</H>
									</th>
									<th>
										<H type={'body'} size={'small'}>
											СТОИМОСТЬ
										</H>
									</th>
									<th>
										<H type={'body'} size={'small'}>
											АДРЕС
										</H>
									</th>
								</tr>
								{orders?.map(order => (
									<OrderPreview order={order} key={order.id} />
								))}
							</tbody>
						</table>
					</>
				) : (
					<>
						<H type={'h3'} weight={900}>
							История заказов пуста
						</H>
						<Link href={'/'}>
							<Button type={'fill'} size={'large'}>
								В каталог
							</Button>
						</Link>
					</>
				)}
			</div>
		</div>
	)
}

export default withAccountLayout(Page)
