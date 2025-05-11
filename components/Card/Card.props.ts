import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";
import {Product} from "@/store/api/api";

export interface CardProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    data: Product
}
