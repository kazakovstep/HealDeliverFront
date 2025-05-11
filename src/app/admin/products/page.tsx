'use client'
import {withAdminLayout} from "@/layout/AdminLayout/AdminLayout";
import styles from "@/styles/users.module.css";
import {H} from "../../../../components/Htag/Htag";
import {useGetProductsQuery} from "@/store/api/api";


const Products = [
    {category: "Фрукты", type: "fruit"},
    {category: "Овощи", type: "vegetable"},
    {category: "Мясо", type: "meat"},
    {category: "Молочные продукты", type: "milk"},
    {category: "Хлебные изделия", type: "bread"},
];


function Page() {

    const {data, isLoading, error} = useGetProductsQuery();

    return <>
        <div className={styles.page}>
            <div className={styles.adminBlock}>
                <div className={styles.topTable}>
                    <H type={"body"} size={"xl"}>Все продукты</H>
                </div>
                {Products.map((product) => (
                    <div key={product.category} className={styles.catalogCategory}>
                        <H type={"body"} size={"xxl"}>{product.category}</H>
                        <table className={styles.table}>
                            <tbody>
                            <tr className={styles.tr}>
                                <th><H type={"body"} size={"small"}>ID</H></th>
                                <th><H type={"body"} size={"small"}>НАЗВАНИЕ</H></th>
                                <th><H type={"body"} size={"small"}>ОПИСАНИЕ</H></th>
                                <th><H type={"body"} size={"small"}>ЦЕНА</H></th>
                                <th><H type={"body"} size={"small"}>КОЛИЧЕСТВО</H></th>
                            </tr>
                            {data?.filter(item => item.category === product.type).map(item => (
                                <tr key={item.id}>
                                    <th><H type={"body"} size={"small"}>{item?.id}</H></th>
                                    <th><H type={"body"} size={"small"}>{item?.title}</H></th>
                                    <th><H type={"body"} size={"small"}>{item?.description.slice(0, 100) + (item?.description.length > 100 ? "..." : "")}</H></th>
                                    <th><H type={"body"} size={"small"}>{item?.price}</H></th>
                                    <th><H type={"body"} size={"small"}>{item?.amount}</H></th>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    </>
}

export default withAdminLayout(Page)