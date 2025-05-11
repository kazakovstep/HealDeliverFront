'use client'
import styles from "./CardRow.module.css"
import {Card} from "../Card/Card";
import {CardRowProps} from "./CardRowProps.props";
import cn from "classnames";

export const CardRow = ({
                            data,
                            type,
                            className,
                            ...props
                        }: CardRowProps) => {

    return (
        <div className={cn(styles.cardRow, className)}>
            {data?.filter(product => product.category === type).map((product) => (
                <Card key={product.id} data={product}/>
            ))}
        </div>
    );
}