'use client'
import styles from '@/styles/users.module.css'
import { H } from '../../../../components/Htag/Htag'
import { withAdminLayout } from '@/layout/AdminLayout/AdminLayout'
import { useGetAllDeliveryPeopleQuery } from '@/store/api/admin.api'

function Page() {
	const { data, isLoading, error } = useGetAllDeliveryPeopleQuery()

	return (
		<>
			<div className={styles.page}>
				<div className={styles.adminBlock}>
					<div className={styles.topTable}>
						<H type={'body'} size={'xl'}>
							Все доставщики
						</H>
					</div>
					<table className={styles.table}>
						<tbody>
							<tr className={styles.tr}>
								<th>
									<H type={'body'} size={'small'}>
										ID
									</H>
								</th>
								<th>
									<H type={'body'} size={'small'}>
										DeliveryPersonID
									</H>
								</th>
								<th>
									<H type={'body'} size={'small'}>
										Имя доставщика
									</H>
								</th>
								<th>
									<H type={'body'} size={'small'}>
										Номер телефона
									</H>
								</th>
								<th>
									<H type={'body'} size={'small'}>
										Зона ответственности
									</H>
								</th>
							</tr>
							{data?.map((person, key) => (
								<tr key={person.id}>
									<th>
										<H type={'body'} size={'small'}>
											{key}
										</H>
									</th>
									<th>
										<H type={'body'} size={'small'}>
											{person?.id}
										</H>
									</th>
									<th>
										<H type={'body'} size={'small'}>
											{person?.name}
										</H>
									</th>
									<th>
										<H type={'body'} size={'small'}>
											{person?.phone}
										</H>
									</th>
									<th>
										<H type={'body'} size={'small'}>
											{person?.zone?.name}
										</H>
									</th>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default withAdminLayout(Page)
