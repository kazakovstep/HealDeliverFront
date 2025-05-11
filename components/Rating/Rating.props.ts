import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface RatingProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
    stars: number;
}
