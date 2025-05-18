'use client'

import { withAdminLayout } from '@/layout/AdminLayout/AdminLayout'
import styles from '@/styles/users.module.css'
import { H } from '../../../../components/Htag/Htag'
import { useGetAllUsersQuery } from '@/store/api/admin.api'
import { Button } from '../../../../components/Button/Button'
import { Input } from '../../../../components/Input/Input'
import { User } from '@/store/api/user.api'
import { useEffect, useState } from 'react'

function Page() {
	const { data: users } = useGetAllUsersQuery()

	const [emailStates, setEmailStates] = useState<Array<string>>([])
	const [usernameStates, setUsernameStates] = useState<Array<string>>([])

	const token =
		typeof window !== 'undefined' ? window.localStorage.getItem('token') : null

	useEffect(() => {
		if (users) {
			setEmailStates(Array.from({ length: users.length }, () => 'success'))
			setUsernameStates(Array.from({ length: users.length }, () => 'success'))
		}
	}, [users])

	const [isReload, setIsReload] = useState(false)
	const handleUpdate = async (user: User) => {
		try {
			const emailInput = document.getElementById(
				`email-${user.id}`
			) as HTMLInputElement
			const usernameInput = document.getElementById(
				`username-${user.id}`
			) as HTMLInputElement
			const roleSelect = document.getElementById(
				`role-${user.id}`
			) as HTMLSelectElement
			// await fetch(`/admin/users`, {
			//     method: "PUT",
			//     headers: {
			//         "Content-Type": "application/json",
			//         "Authorization": `Bearer ${token}`
			//     },
			//     body: JSON.stringify({
			//         id: user?.id,
			//         username: (user?.username !== usernameInput.value ? usernameInput.value : user?.username),
			//         email: (user?.email !== emailInput.value ? emailInput.value : user?.email),
			//         role: [{
			//             id: roleSelect.value === "ROLE_USER" ? 1 : 2,
			//             name: roleSelect.value
			//         }]
			//     })
			// });
			console.log(
				JSON.stringify({
					id: user?.id,
					username:
						user?.username !== usernameInput?.value
							? usernameInput?.value
							: user?.username,
					email:
						user?.email !== emailInput?.value ? emailInput?.value : user?.email,
					role: [
						{
							id: roleSelect?.value === 'ROLE_USER' ? 1 : 2,
							name: roleSelect?.value,
						},
					],
				})
			)
		} catch (error) {
			console.log(error)
		}
	}

	const handleDelete = (userId: number, index: number) => {
		try {
			fetch(`http://localhost:8080/api/admin/users/${userId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then(r => {
					setIsReload(true)
					const updatedEmailStates = [...emailStates]
					const updatedUsernameStates = [...usernameStates]
					updatedEmailStates[index] = 'disable'
					updatedUsernameStates[index] = 'disable'
					setEmailStates(updatedEmailStates)
					setUsernameStates(updatedUsernameStates)
				})
				.catch(e => console.log(e))
		} catch (error) {
			console.log(error)
		}
	}

	const handleReload = () => {
		window.location.reload()
	}

	return (
		<div className={styles.page}>
			<div className={styles.adminBlock}>
				<div className={styles.topTable}>
					<H type={'body'} size={'xl'}>
						Все пользователи
					</H>
					{isReload ? (
						<Button type={'text'} onClick={handleReload}>
							Перезагрузить
						</Button>
					) : null}
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
									USERNAME
								</H>
							</th>
							<th>
								<H type={'body'} size={'small'}>
									EMAIL
								</H>
							</th>
							<th>
								<H type={'body'} size={'small'}>
									ROLE
								</H>
							</th>
							<th></th>
							<th></th>
						</tr>
						{users?.map((user, index) => (
							<tr key={index} className={styles.tr}>
								<th>
									<H type={'body'} size={'small'}>
										{user?.id}
									</H>
								</th>
								<th>
									<Input
										state={usernameStates[index]}
										value={user?.username}
										id={`username-${user.id}`}
									/>
								</th>
								<th>
									<Input
										state={emailStates[index]}
										value={user?.email}
										id={`email-${user.id}`}
									/>
								</th>
								<th>
									<select
										className={styles.select}
										defaultValue={user?.roles[0].name}
										id={`role-${user.id}`}
									>
										<option value={'ROLE_ADMIN'}>ROLE_ADMIN</option>
										<option value={'ROLE_USER'}>ROLE_USER</option>
									</select>
								</th>
								<th>
									<Button
										type={'text'}
										className={styles.deleteButton}
										onClick={() => handleUpdate(user)}
									>
										Сохранить
									</Button>
								</th>
								<th>
									<Button
										type={'text'}
										className={styles.deleteButton}
										onClick={() => handleDelete(user?.id, index)}
									>
										Удалить
									</Button>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default withAdminLayout(Page)
