'use client'

import { withAccountLayout } from '@/layout/AccountLayout/AccountLayout'
import styles from '@/styles/settings.module.css'
import { H } from '../../../../components/Htag/Htag'
import { Input } from '../../../../components/Input/Input'
import { useGetCurrentUserQuery } from '@/store/api/user.api'
import { Button } from '../../../../components/Button/Button'
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const passwordRegex: RegExp =
	/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

function Page() {
	const { data: user } = useGetCurrentUserQuery()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [emailState, setEmailState] = useState('default')
	const [passwordState, setPasswordState] = useState('default')
	const [usernameState, setUsernameState] = useState('default')
	useEffect(() => {
		if (username === '' && user?.username === '') {
			setUsernameState('error')
		} else {
			setUsernameState('default')
		}
		if (emailRegex.test(email) || (email === '' && user?.email !== '')) {
			setEmailState('default')
		} else {
			setEmailState('error')
		}

		if (
			passwordRegex.test(password) ||
			(password === '' && user?.password !== '')
		) {
			setPasswordState('default')
		} else {
			setPasswordState('error')
		}
	}, [email, password, user])

	const handleUpdate = () => {
		if (
			(emailRegex.test(email) || email === '') &&
			(passwordRegex.test(password) || password === '') &&
			(username !== '' || user?.username !== '')
		) {
			try {
				fetch(`http://localhost:8080/api/user`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id: user?.id,
						email: email || user?.email,
						password: password || user?.password,
						username: username || user?.username,
					}),
				}).catch(error => {
					console.error('Error:', error)
				})
			} catch (error) {
				console.error('Error:', error)
			}
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('persist:root')
		window.location.href = '/login'
	}

	return (
		<div className={styles.page}>
			<H type={'h5'} weight={400}>
				Настройка аккаунта
			</H>
			<div className={styles.form}>
				<div className={styles.input}>
					<H type={'body'} size={'small'}>
						Имя пользователя
					</H>
					<Input
						state={usernameState}
						value={username || user?.username}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setUsername(e.target.value)
						}
					/>
				</div>
				<div className={styles.input}>
					<H type={'body'} size={'small'}>
						Электронная почта
					</H>
					<Input
						state={emailState}
						value={email || user?.email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
					/>
				</div>
				<div className={styles.input}>
					<H type={'body'} size={'small'}>
						Новый пароль
					</H>
					<Input
						state={passwordState}
						type={'password'}
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
					/>
				</div>
			</div>
			<div className={styles.buttons}>
				<span></span>
				<Button type={'fill'} onClick={handleUpdate}>
					Сохранить
				</Button>
				<Button type={'border'} onClick={handleLogout}>
					Выйти из аккаунта
				</Button>
			</div>
		</div>
	)
}

export default withAccountLayout(Page)
