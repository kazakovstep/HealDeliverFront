'use client'
import {AccountSidebarButtonProps} from "./AccountSidebarButton.props";
import cn from "classnames";
import styles from "./AccountSidebarButton.module.css"
import React, {JSX, useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Link from "next/link";
import {H} from "../Htag/Htag";
import HomeImg from "../../public/home.svg"
import CartImg from "../../public/cart.svg"
import HistoryImg from "../../public/history.svg"
import LikeImg from "../../public/heart.svg"
import SettingsImg from "../../public/setting.svg"
import PersonImg from "../../public/person.svg"
import FoodImg from "../../public/food.svg"

export const AccountSidebarButton = ({
                                         content,
                                         children,
                                         className,
                                         ...props
                                     }: AccountSidebarButtonProps): JSX.Element => {

    const [active, setActive] = useState(false);
    const [href, setHref] = useState("");
    const path = window.location.pathname

    const switchHref = (href: string) => {
        setHref(href);
    };

    useEffect(() => {
        switch (content) {
            case "Главная":
                switchHref("/")
                break
            case "Мои заказы":
                switchHref("/lk/orders")
                break
            case "Избранное":
                switchHref("/lk/favourites")
                break
            case "Корзина":
                switchHref("/lk/cart")
                break
            case "Настройки":
                switchHref("/lk/settings")
                break
            case "Пользователи":
                switchHref("/admin/users")
                break
            case "Продукты":
                switchHref("/admin/products")
                break
            case "Заказы":
                switchHref("/admin/orders")
                break
            default:
                break
        }
    }, [])

    useEffect(() => {
        if (path === href) {
            setActive(true)
        }
    }, [href]);


    return (
        <Link href={href}>
            <li className={cn(styles.container, {
                [styles.active]: active
            })}>
                {
                    content === "Главная" ?
                        <HomeImg className={active ? styles.activeImg : undefined}/> :
                        content === "Мои заказы" ? <HistoryImg className={active ? styles.activeImg : undefined}/> :
                            content === "Избранное" ? <LikeImg className={active ? styles.activeImg : undefined}/> :
                                content === "Корзина" ? <CartImg className={active ? styles.activeImg : undefined}/> :
                                    content === "Настройки" ? <SettingsImg className={active ? styles.activeImg : undefined}/> :
                                        content === "Пользователи" ? <PersonImg className={active ? styles.activeImg : undefined}/> :
                                            content === "Продукты" ? <FoodImg className={active ? styles.activeImg : undefined}/> :
                                                content === "Заказы" ? <CartImg className={active ? styles.activeImg : undefined}/> : null
                }
                <H type={"body"} size={"large"}>{content}</H>
            </li>
        </Link>
    );
};
