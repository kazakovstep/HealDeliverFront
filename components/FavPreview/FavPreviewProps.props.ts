import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";
import {Product} from "@/store/api/api";

export interface CardRowProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >{
    product: Product
}
