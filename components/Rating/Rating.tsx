'use client'

import { RatingProps } from './Rating.props'
import cn from 'classnames'
import styles from './Rating.module.css'
import { useState } from 'react'
import { H } from '../Htag/Htag'
import Image from 'next/image'

export const Rating = ({ stars, ...props }: RatingProps) => {
	const renderStars = () => {
		const starsArr = []
		for (let i = 0; i < stars; i++) {
			starsArr.push(
				<Image
					key={i}
					src='/yellowStar.svg'
					alt='yellowStar'
					width={16}
					height={16}
				/>
			)
		}
		for (let i = stars; i < 5; i++) {
			starsArr.push(
				<Image
					key={i}
					src='/grayStar.svg'
					alt='yellowStar'
					width={16}
					height={16}
				/>
			)
		}
		return starsArr
	}

	return <div>{renderStars()}</div>
}
