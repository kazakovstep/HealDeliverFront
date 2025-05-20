'use client'

import { withMainLayout } from '@/layout/MainLayout/MainLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute'
import styles from './payment.module.css'
import { useGetCurrentOrderQuery } from '@/store/api/order.api'
import { useEffect, useState, ChangeEvent, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { H } from '../../../../components/Htag/Htag'
import { Input } from '../../../../components/Input/Input'
import { Button } from '../../../../components/Button/Button'
import { actions as CartActions } from '../../../store/slices/cart.slice'
import { actions as ProductActions } from '../../../store/slices/products.slice'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useGetCurrentUserQuery } from '@/store/api/user.api'

function PaymentPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const products = useSelector((s: RootState) => s.products)
	const quantities = useSelector((s: RootState) => s.cart?.quantities || {})
	const { data: order } = useGetCurrentOrderQuery()
	const [cardNumber, setCardNumber] = useState('')
	const [cvv, setCvv] = useState('')
	const [cardholderName, setCardholderName] = useState('')
	const [timeLeft, setTimeLeft] = useState(120)
	const [errors, setErrors] = useState({
		cardNumber: '',
		cvv: '',
		cardholderName: '',
	})
	const [address, setAddress] = useState<any>(null)

	const totalAmount = useMemo(
		() => products.reduce((sum, p) => sum + (quantities[p.id] || 0), 0),
		[products, quantities]
	)
	// Сумма по товарам
	const totalPrice = useMemo(
		() =>
			products.reduce((sum, p) => sum + p.price * (quantities[p.id] || 0), 0),
		[products, quantities]
	)

	const userId = useGetCurrentUserQuery().data?.id

	useEffect(() => {
		if (!order) {
			router.push('/lk/cart')
			return
		}

		const timer = setInterval(() => {
			setTimeLeft(prev => {
				if (prev <= 1) {
					clearInterval(timer)
					router.push('/orders/current/preview')
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(timer)
	}, [order, router])

	useEffect(() => {
		const addressParam = searchParams.get('address')
		if (addressParam) {
			try {
				setAddress(JSON.parse(decodeURIComponent(addressParam)))
			} catch (e) {
				console.error('Failed to parse address:', e)
			}
		}
	}, [searchParams])

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
	}

	const formatCardNumber = (value: string) => {
		const digits = value.replace(/\D/g, '').slice(0, 16)
		const groups = digits.match(/.{1,4}/g) || []
		return groups.join(' ')
	}

	const validateForm = () => {
		const newErrors = {
			cardNumber: '',
			cvv: '',
			cardholderName: '',
		}

		// Валидация номера карты (16 цифр)
		if (cardNumber.replace(/\s/g, '').length !== 16) {
			newErrors.cardNumber = 'Номер карты должен содержать 16 цифр'
		}

		// Валидация CVV (3 цифры)
		if (cvv.length !== 3) {
			newErrors.cvv = 'CVV должен содержать 3 цифры'
		}

		// Валидация имени держателя (минимум 2 слова)
		if (!cardholderName.trim() || cardholderName.split(' ').length < 2) {
			newErrors.cardholderName = 'Введите имя и фамилию держателя карты'
		}

		setErrors(newErrors)
		return !Object.values(newErrors).some(error => error)
	}

	const handlePayment = () => {
		if (validateForm() && address) {
			fetch('/api/orders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId,
					productIds: products.map(p => p.id),
					cost: totalPrice,
					amount: totalAmount,
					quantities,
					deliveryAddress: address.value,
					deliveryLatitude: address.latitude,
					deliveryLongitude: address.longitude,
				}),
			})
				.then(r => {
					if (r.ok) {
						dispatch(CartActions.removeAll())
						dispatch(ProductActions.removeAll())
						router.replace('/orders/current/preview')
					}
				})
				.catch(console.log)
		}
	}

	if (!order) {
		return null
	}

	return (
		<ProtectedRoute>
			<div className={styles.container}>
				<div className={styles.paymentCard}>
					<div className={styles.header}>
						<H type={'h3'} weight={600}>
							Оплата заказа
						</H>
						<div className={styles.timer}>
							<H type={'body'} size={'small'}>
								Время на оплату:
							</H>
							<H type={'h5'} className={styles.timeLeft}>
								{formatTime(timeLeft)}
							</H>
						</div>
					</div>

					<div className={styles.orderSummary}>
						<H type={'h5'}>Сумма к оплате</H>
						<H type={'h3'} className={styles.total}>
							{order.cost} руб.
						</H>
					</div>

					<div className={styles.form}>
						<div className={styles.inputGroup}>
							<H type={'body'} size={'small'}>
								Номер карты
							</H>
							<Input
								value={cardNumber}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									const value = e.target.value.replace(/\D/g, '').slice(0, 16)
									setCardNumber(formatCardNumber(value))
									setErrors(prev => ({ ...prev, cardNumber: '' }))
								}}
								placeholder='XXXX XXXX XXXX XXXX'
							/>
							{errors.cardNumber && (
								<H type={'body'} size={'small'} className={styles.error}>
									{errors.cardNumber}
								</H>
							)}
						</div>

						<div className={styles.row}>
							<div className={styles.inputGroup}>
								<H type={'body'} size={'small'}>
									CVV
								</H>
								<Input
									value={cvv}
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										const value = e.target.value.replace(/\D/g, '').slice(0, 3)
										setCvv(value)
										setErrors(prev => ({ ...prev, cvv: '' }))
									}}
									placeholder='•••'
									type='password'
								/>
								{errors.cvv && (
									<H type={'body'} size={'small'} className={styles.error}>
										{errors.cvv}
									</H>
								)}
							</div>

							<div className={styles.inputGroup}>
								<H type={'body'} size={'small'}>
									Имя держателя
								</H>
								<Input
									value={cardholderName}
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										const value = e.target.value.toUpperCase().slice(0, 20)
										setCardholderName(value)
										setErrors(prev => ({ ...prev, cardholderName: '' }))
									}}
									placeholder='JOHN DOE'
								/>
								{errors.cardholderName && (
									<H type={'body'} size={'small'} className={styles.error}>
										{errors.cardholderName}
									</H>
								)}
							</div>
						</div>

						<Button
							type={'fill'}
							className={styles.payButton}
							onClick={handlePayment}
						>
							Оплатить {order.cost} руб.
						</Button>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	)
}

export default withMainLayout(PaymentPage)
function dispatch(arg0: any) {
	throw new Error('Function not implemented.')
}
