'use client'
import styles from "@/styles/users.module.css";
import {H} from "../../../../components/Htag/Htag";
import {withAdminLayout} from "@/layout/AdminLayout/AdminLayout";
import {useGetAllOrdersQuery} from "@/store/api/admin.api";

function Page() {

    const {data, isLoading, error} = useGetAllOrdersQuery();

    console.log(data)

    return <>
        <div className={styles.page}>
            <div className={styles.adminBlock}>
                <div className={styles.topTable}>
                    <H type={"body"} size={"xl"}>Все заказы</H>
                </div>
                <table className={styles.table}>
                    <tbody>
                    <tr className={styles.tr}>
                        <th><H type={"body"} size={"small"}>ID</H></th>
                        <th><H type={"body"} size={"small"}>UserID</H></th>
                        <th><H type={"body"} size={"small"}>СТОИМОСТЬ</H></th>
                        <th><H type={"body"} size={"small"}>ДАТА</H></th>
                        <th><H type={"body"} size={"small"}>ПРОДУКТЫ</H></th>
                    </tr>
                    {data?.map((order) => (
                        <tr key={order.id}>
                            <th><H type={"body"} size={"small"}>{order?.id}</H></th>
                            <th><H type={"body"} size={"small"}>{order?.user.id}</H></th>
                            <th><H type={"body"} size={"small"}>{order?.cost}</H></th>
                            <th><H type={"body"} size={"small"}>{String(order?.date)}</H></th>
                            <th><H type={"body"} size={"small"}>
                                {order?.orderProducts.map((product) => (
                                    <>
                                        {product?.product.title} x{product?.quantity}
                                        <br/>
                                    </>
                                ))}
                            </H></th>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default withAdminLayout(Page)