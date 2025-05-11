import type { Metadata } from 'next'
import '../styles/globals.css'
import React from 'react'
import { Header } from '../../templates/Header/Header'
import { Footer } from '../../templates/Footer/Footer'
import { ReduxProvider } from '../../components/ReduxProvider/ReduxProvider'
import { SessionProvider } from 'next-auth/react'
import { AppSessionProvider } from '../../components/AppSessionProvider'

export const metadata: Metadata = {
	title: 'HealDeliver',
	description: 'HealDeliver',
	icons: {
		icon: 'logo.svg',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Comfortaa&display=swap'
					rel='stylesheet'
				/>
				<title>HealDeliver</title>
			</head>
			<body>
				<ReduxProvider>
					<AppSessionProvider>{children}</AppSessionProvider>
				</ReduxProvider>
			</body>
		</html>
	)
}
