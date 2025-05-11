'use client'
import {ButtonProps} from "./Button.props";
import cn from "classnames";
import styles from "./Button.module.css"
import {useState} from "react";

export const Button = ({
                           size,
                           type,
                           children,
                           className,
                           ...props
                       }: ButtonProps): JSX.Element => {
    const [isOpen, setOpen] = useState(false);

    const handleMenu = () => {
        setOpen(!isOpen)
    };

    return (
        <button
            className={cn(styles.button, className, {
                [styles.small]: size == "small",
                [styles.medium]: size == "medium",
                [styles.large]: size == "large",
                [styles.fill]: type == "fill",
                [styles.border]: type == "border",
                [styles.ghost]: type == "ghost",
                [styles.text]: type == "text",
                [styles.header]: type == "header"
            })}
            onClick={type === "header" ? handleMenu : undefined}
            {...props}
        >   {type == "header" ?
            <div id={"menu"} className={cn(styles.menu, {
                [styles.open] : isOpen
            })}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            : null}
            {children}
        </button>
    );
};
