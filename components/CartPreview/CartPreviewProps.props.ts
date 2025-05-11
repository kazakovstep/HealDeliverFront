import { Product } from "@/store/api/api"
import { DetailedHTMLProps, HTMLAttributes } from "react"

export interface CardRowProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >{
        index: number,
        product: Product
}
