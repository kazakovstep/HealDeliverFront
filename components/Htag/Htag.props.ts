import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface HtagProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'display' | 'body';
    children: ReactNode;
    weight?: number;
    size?: 'xxl' | 'xl' | 'large' | 'medium' | 'small' | 'tiny';
}