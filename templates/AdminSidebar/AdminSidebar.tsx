import {AdminSidebarProps} from "./AdminSidebar.props";
import cn from "classnames";
import styles from "./AdminSidebar.module.css";
import {Logo} from "../../components/Logo/Logo";
import {H} from "../../components/Htag/Htag";
import Link from "next/link";
import {Button} from "../../components/Button/Button";
import {AccountSidebarButton} from "../../components/AccountSidebarButton/AccountSidebarButton";

export const AdminSidebar = ({
                           className,
                           ...props
                       }: AdminSidebarProps): JSX.Element => {

    return (
        <aside className={cn(styles.sidebar, className)} {...props}>
            <div content={styles.logoContainer}>
                <Link href={"/"}>
                    <Logo/>
                </Link>
            </div>
            <ul className={styles.menu}>
                <AccountSidebarButton content={"Главная"} />
                <AccountSidebarButton content={"Пользователи"} />
                <AccountSidebarButton content={"Продукты"}/>
                <AccountSidebarButton content={"Заказы"}/>
            </ul>
        </aside>
    );
};
