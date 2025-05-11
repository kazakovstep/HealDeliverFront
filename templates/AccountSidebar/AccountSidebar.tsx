import {AccountSidebarProps} from "./AccountSidebar.props";
import cn from "classnames";
import styles from "./AccountSidebar.module.css";
import {Logo} from "../../components/Logo/Logo";
import {H} from "../../components/Htag/Htag";
import Link from "next/link";
import {Button} from "../../components/Button/Button";
import {AccountSidebarButton} from "../../components/AccountSidebarButton/AccountSidebarButton";

export const AccountSidebar = ({
                           className,
                           ...props
                       }: AccountSidebarProps): JSX.Element => {

    return (
        <aside className={cn(styles.sidebar, className)} {...props}>
            <div content={styles.logoContainer}>
                <Link href={"/"}>
                    <Logo/>
                </Link>
            </div>
            <ul className={styles.menu}>
                <AccountSidebarButton content={"Главная"} />
                <AccountSidebarButton content={"Мои заказы"} />
                <AccountSidebarButton content={"Избранное"}/>
                <AccountSidebarButton content={"Корзина"}/>
                <AccountSidebarButton content={"Настройки"}/>
            </ul>
        </aside>
    );
};
