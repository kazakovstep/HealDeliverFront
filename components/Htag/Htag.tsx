import {HtagProps} from "./Htag.props";
import styles from './Htag.module.css';
import cn from "classnames";

export const H = ({weight = 400, type, size, children, className, ...props}: HtagProps): JSX.Element => {
    switch (type) {
        case 'h1':
            return <h1 style={{fontWeight: weight}} className={cn(styles.h1, className)} {...props}>{children}</h1>;
        case 'h2':
            return <h2 style={{fontWeight: weight}} className={cn(styles.h2, className)} {...props}>{children}</h2>;
        case 'h3':
            return <h3 style={{fontWeight: weight}} className={cn(styles.h3, className)} {...props}>{children}</h3>;
        case 'h4':
            return <h4 style={{fontWeight: weight}} className={cn(styles.h4, className)} {...props}>{children}</h4>;
        case 'h5':
            return <h5 style={{fontWeight: weight}} className={cn(styles.h5, className)} {...props}>{children}</h5>;
        case 'display':
            return <h1 style={{fontWeight: weight}}
                       className={cn(styles.display, className)} {...props}>{children}</h1>;
        case 'body':
            return <h5 style={{fontWeight: weight}} className={cn(styles.body, className, {
                [styles.xxl] : size === "xxl",
                [styles.xl] : size === "xl",
                [styles.large] : size === "large",
                [styles.medium] : size === "medium",
                [styles.small] : size === "small",
                [styles.tiny] : size === "tiny"
            })} {...props}>{children}</h5>;

        default:
            return <></>;
    }
}