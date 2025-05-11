import {withAccountLayout} from "@/layout/AccountLayout/AccountLayout";
import {OrderPage} from "../../../../../components/OrderPage/OrderPage";

function Page({params}: { params: { id: number } }) {
    return (<>
        <OrderPage orderId={params.id}/>
    </>);
}

export default withAccountLayout(Page)