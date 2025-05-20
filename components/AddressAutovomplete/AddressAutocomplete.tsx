'use client'

import React, { FC, useState } from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

export type TAddress = {
	value: string
	unrestricted_value: any
	data: any
}

interface IProps {
	value: TAddress
	onChange: (value: TAddress) => void
}

const API_KEY = '2072d903d0714cedae57d652027fb6a8ede97d2e'

export const AddressAutocomplete: FC<IProps> = ({ value, onChange }) => {
	return (
		<div style={{ width: 300 }}>
			<AddressSuggestions
				token={API_KEY}
				value={value}
				//@ts-ignore
				onChange={onChange}
				filterLocations={[{ country: 'Россия', city: 'Москва' }]}
				locations={[{ country: 'Россия', city: 'Москва' }]}
			/>
		</div>
	)
}
