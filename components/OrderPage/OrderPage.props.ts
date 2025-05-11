import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface OrderPageProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >{
    orderId: number
}
