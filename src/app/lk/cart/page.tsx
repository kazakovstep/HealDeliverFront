// app/cart/page.tsx
'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { withAccountLayout } from '@/layout/AccountLayout/AccountLayout'
import { useGetCurrentUserQuery } from '@/store/api/user.api'
import { RootState } from '@/store/store'
import cn from 'classnames'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../../../components/Button/Button'
import { CartPreview } from '../../../../components/CartPreview/CartPreview'
import { H } from '../../../../components/Htag/Htag'
import styles from '../../../styles/cart.module.css'
import { actions as CartActions } from '../../../store/slices/cart.slice'
import { actions as ProductActions } from '../../../store/slices/products.slice'
import {
	AddressAutocomplete,
	TAddress,
} from '../../../../components/AddressAutovomplete/AddressAutocomplete'
import { useRouter } from 'next/navigation'

const DADATA_API_KEY = '2072d903d0714cedae57d652027fb6a8ede97d2e'

// Формула Хаверсин для расчёта расстояния в километрах
function haversineDistance(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
) {
	const toRad = (deg: number) => (deg * Math.PI) / 180
	const R = 6371 // радиус Земли в км
	const dLat = toRad(lat2 - lat1)
	const dLon = toRad(lon2 - lon1)
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) *
			Math.cos(toRad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	return R * c
}

function Page() {
	const products = useSelector((s: RootState) => s.products)
	const quantities = useSelector((s: RootState) => s.cart?.quantities || {})

	const router = useRouter()

	// Общее количество товаров
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
	const [address, setAddress] = useState<any>({
		value: '',
		unrestricted_value: null,
		data: null,
	})

	// Отправка заказа
	const handleBuy = () => {
		if (address.value) {
			const addressData = encodeURIComponent(
				JSON.stringify({
					value: address.value,
					latitude: address.data.geo_lat,
					longitude: address.data.geo_lon,
				})
			)
			router.replace(`/orders/payment?address=${addressData}`)
		}
	}

	// Координаты склада (пример: Москва)
	const warehouse = useMemo(() => ({ lat: 55.7558, lon: 37.6176 }), [])

	// Стоимость доставки: минимум 100₽, иначе 50₽ + 20₽ за каждый км
	const deliveryCost = useMemo(() => {
		const lat = address.data?.geo_lat && parseFloat(address.data.geo_lat)
		const lon = address.data?.geo_lon && parseFloat(address.data.geo_lon)
		if (lat && lon) {
			const distKm = haversineDistance(warehouse.lat, warehouse.lon, lat, lon)
			return Math.max(100, 50 + Math.ceil(distKm) * 20)
		}
		return null
	}, [address, warehouse])

	// Геолокация + fallback по IP
	const handleUseCurrentLocation = useCallback(() => {
		if (!navigator.geolocation) {
			return alert('Геолокация не поддерживается этим браузером')
		}

		navigator.geolocation.getCurrentPosition(
			async ({ coords }) => {
				try {
					const res = await fetch(
						'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Accept: 'application/json',
								Authorization: `Token ${DADATA_API_KEY}`,
							},
							body: JSON.stringify({
								lat: coords.latitude,
								lon: coords.longitude,
								radius_meters: 1000,
							}),
						}
					)
					const json = await res.json()
					if (json.suggestions?.length) {
						const s = json.suggestions[0]
						console.log(s)
						setAddress({
							value: s.value,
							unrestricted_value: s.unrestricted_value,
							data: s.data,
						})
					} else {
						alert('Адрес по координатам не найден')
					}
				} catch {
					alert('Ошибка при запросе к Dadata')
				}
			},
			async err => {
				if (err.code === err.POSITION_UNAVAILABLE) {
					alert('GPS недоступен, пробуем по IP…')
					try {
						const ipRes = await fetch(
							'https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address',
							{
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
									Accept: 'application/json',
									Authorization: `Token ${DADATA_API_KEY}`,
								},
								body: JSON.stringify({}),
							}
						)
						const ipJson = await ipRes.json()
						if (ipJson.location) {
							const s = ipJson.location
							console.log(ipJson)
							setAddress({
								value: s.value,
								unrestricted_value: s.unrestricted_value,
								data: s.data,
							})
						} else {
							alert('Не удалось получить адрес по IP')
						}
					} catch {
						alert('Ошибка при IP-геолокации')
					}
				} else if (err.code === err.PERMISSION_DENIED) {
					alert('Отказано в доступе к геолокации')
				} else if (err.code === err.TIMEOUT) {
					alert('Превышено время ожидания геолокации')
				} else {
					alert('Неизвестная ошибка геолокации: ' + err.message)
				}
			},
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
		)
	}, [])

	return (
		<div className={styles.page}>
			<H type='h5' weight={400}>
				Моя корзина
			</H>
			<div className={cn(styles.content, { [styles.empty]: !totalAmount })}>
				{totalAmount ? (
					<>
						<table className={styles.table}>
							<tbody>
								<tr className={styles.tableHeader}>
									<th>
										<H type='body' size='small'>
											ПРОДУКТЫ
										</H>
									</th>
									<th>
										<H type='body' size='small'>
											ЦЕНА
										</H>
									</th>
									<th>
										<H type='body' size='small'>
											КОЛ-ВО
										</H>
									</th>
									<th>
										<H type='body' size='small'>
											ИТОГО
										</H>
									</th>
								</tr>
								{products.map((product, i) => (
									<CartPreview key={product.id} product={product} index={i} />
								))}
							</tbody>
						</table>

						<table className={styles.payment}>
							<tbody>
								<tr>
									<th>
										<H type='body' size='xl' weight={500}>
											Итоги
										</H>
									</th>
								</tr>
								<tr>
									<td>
										<H type='body' size='medium'>
											Всего штук:
										</H>
									</td>
									<td>
										<H type='body' size='medium'>
											{totalAmount}
										</H>
									</td>
								</tr>
								<tr>
									<td>
										<H type='body' size='medium'>
											Стоимость товаров:
										</H>
									</td>
									<td>
										<H type='body' size='medium'>
											{totalPrice} ₽
										</H>
									</td>
								</tr>
								<tr>
									<td>
										<AddressAutocomplete
											value={address}
											onChange={setAddress}
										/>
									</td>
									<td>
										<Button type='text' onClick={handleUseCurrentLocation}>
											<img
												src={'../location.svg'}
												alt={'location'}
												height={20}
											/>
										</Button>
									</td>
								</tr>
								<tr>
									<td>
										<H type='body' size='medium'>
											Доставка:
										</H>
									</td>
									<td>
										<H type='body' size='medium'>
											{deliveryCost !== null
												? `${deliveryCost} ₽`
												: '— выберите адрес'}
										</H>
									</td>
								</tr>
								<tr>
									<td>
										<H type='body' size='medium'>
											Итого к оплате:
										</H>
									</td>
									<td>
										<H type='body' size='medium'>
											{deliveryCost !== null
												? totalPrice + deliveryCost
												: totalPrice}{' '}
											₽
										</H>
									</td>
								</tr>
								<tr>
									<td>
										<Button
											type='fill'
											className={styles.doOrder}
											onClick={handleBuy}
										>
											Оформить заказ
										</Button>
									</td>
								</tr>
							</tbody>
						</table>
					</>
				) : (
					<>
						<H type='h3' weight={900}>
							Ваша корзина пуста
						</H>
						<Link href='/'>
							<Button type='fill' size='large'>
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
