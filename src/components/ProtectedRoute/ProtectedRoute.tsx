'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()
	const [isAuthorized, setIsAuthorized] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			router.push('/login')
		} else {
			setIsAuthorized(true)
		}
	}, [router])

	if (!isAuthorized) {
		return null // или можно вернуть компонент загрузки
	}

	return <>{children}</>
}
