'use client'

import styles from '../../styles/login.module.css'
import { Input } from '../../../components/Input/Input'
import { H } from '../../../components/Htag/Htag'
import { Button } from '../../../components/Button/Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const passwordRegex: RegExp =
	/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailState, setEmailState] = useState('default')
	const [passwordState, setPasswordState] = useState('default')
	useEffect(() => {
		if (emailRegex.test(email) || email === '') {
			setEmailState('default')
		} else {
			setEmailState('error')
		}

		if (passwordRegex.test(password) || password === '') {
			setPasswordState('default')
		} else {
			setPasswordState('error')
		}
	}, [email, password])

	const [error, setError] = useState(false)

	const handleLogin = () => {
		if (
			(emailRegex.test(email) || email === 'admin') &&
			(passwordRegex.test(password) || password === 'admin')
		) {
			try {
				fetch(`/api/auth`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				})
					.then(response => {
						if (response.status === 401) {
							setPasswordState('error')
							setError(true)
							throw new Error('Пользователь с такой почтой не существует')
						}
						return response.json()
					})
					.then(data => {
						localStorage.setItem('token', data.token)
						setEmailState('default')
						setPasswordState('default')
						setError(false)
						window.location.href = '/'
					})
					.catch(error => {
						console.error('Error:', error)
					})
			} catch (error) {
				console.error('Error:', error)
			}
		}
	}

	return (
		<div className={styles.login}>
			<H type={'h5'} weight={400}>
				Авторизация
			</H>
			<Input
				placeholder={'E-mail'}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setEmail(e.target.value)
				}
				value={email}
				state={emailState}
			/>
			<Input
				type={'password'}
				placeholder={'Пароль'}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
				value={password}
				state={passwordState}
			/>
			{error ? (
				<H type={'body'} size={'tiny'} className={styles.error}>
					Неверный почта или пароль
				</H>
			) : null}
			<Button type={'fill'} onClick={handleLogin}>
				Авторизоваться
			</Button>
			<Link href={'/register'}>
				<Button type={'text'}>Нет аккаунта?</Button>
			</Link>
		</div>
	)
}
