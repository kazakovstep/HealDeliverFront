import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ButtonProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: 'small' | 'medium' | 'large';
  type?: 'fill' | 'border' | 'ghost' | 'text' | 'header';
  children?: ReactNode;
}
