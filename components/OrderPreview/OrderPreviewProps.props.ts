import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";
import {Product} from "@/store/api/api";
import {Property} from "csstype";
import {Order} from "@/store/api/order.api";

export interface OrderPreviewProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >{
    order: Order
}
