import { AdminLayoutProps } from './AdminLayout.props'
import React from 'react'
import { Footer } from '../../../templates/Footer/Footer'
import cn from 'classnames'
import styles from './AdminLayout.module.css'
import { AdminSidebar } from '../../../templates/AdminSidebar/AdminSidebar'

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
	return (
		<>
			<div className={cn(styles.account)}>
				<AdminSidebar />
				<main className={cn(styles.account_page)}>{children}</main>
			</div>
			<Footer />
		</>
	)
}

// Обновлённый HOC без использования React.FC для устранения ошибки типов
export function withAdminLayout<P extends {}>(
	Component: React.ComponentType<P>
): React.ComponentType<P> {
	return function WithLayout(props: P) {
		return (
			<AdminLayout>
				<Component {...props} />
			</AdminLayout>
		)
	}
}
