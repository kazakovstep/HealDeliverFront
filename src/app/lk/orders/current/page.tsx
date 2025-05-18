'use client'

import { useGetCurrentOrderQuery } from '@/store/api/order.api'
import { useGetCurrentUserQuery } from '@/store/api/user.api'

function Page() {
	const { data: user } = useGetCurrentUserQuery()

	return <div></div>
}

export default Page
