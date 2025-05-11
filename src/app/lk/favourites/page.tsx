'use client'

import styles from "@/styles/favourites.module.css";
import {H} from "../../../../components/Htag/Htag";
import cn from "classnames";
import {CartPreview} from "../../../../components/CartPreview/CartPreview";
import {Button} from "../../../../components/Button/Button";
import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {FavPreview} from "../../../../components/FavPreview/FavPreview";
import {withAccountLayout} from "@/layout/AccountLayout/AccountLayout";

function Page(){

    const favourites = useSelector((state: RootState) => state.favourites?.favourites)
    const totalAmount = useSelector((state : RootState) => state.favourites?.amount)

    return <div className={styles.page}>
        <H type={"h5"} weight={400}>Избранное</H>
        <div className={cn(styles.content, {
            [styles.empty]: !totalAmount
        })}>
            {totalAmount ?
                <>
                    <table className={styles.table}>
                        <tbody>
                        <tr className={styles.tableHeader}>
                            <th><H type={"body"} size={"small"}>ПРОДУКТЫ</H></th>
                            <th><H type={"body"} size={"small"}>ЦЕНА</H></th>
                            <th><H type={"body"} size={"small"}>СТАТУС</H></th>
                        </tr>
                        {favourites?.map((product) => (
                            <FavPreview product={product} key={product.id}/>
                        ))}
                        </tbody>
                    </table>
                </> :
                <>
                    <H type={"h3"} weight={900}>Избранное пусто</H>
                    <Link href={"/"}><Button type={"fill"} size={"large"}>В каталог</Button></Link>
                </>
            }
        </div>
    </div>
}

export default withAccountLayout(Page)