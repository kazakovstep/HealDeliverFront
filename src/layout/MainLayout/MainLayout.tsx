import {MainLayoutProps} from "./MainLayout.props";
import React, {FunctionComponent} from "react";
import {Footer} from "../../../templates/Footer/Footer";
import cn from "classnames";
import styles from "./MainLayout.module.css"
import {AccountSidebar} from "../../../templates/AccountSidebar/AccountSidebar";
import {Header} from "../../../templates/Header/Header";


const MainLayout = ({children}: MainLayoutProps): JSX.Element => {
    return (
        <>
            <Header/>
            <div className={styles.page}>
                {children}
            </div>
            <Footer/>
        </>
    );
};

export const withMainLayout = <T extends Record<string, unknown>>(
    Component: FunctionComponent<T>
) => {
    return function withMainLayoutComponent(props: T): JSX.Element {
        return (
            <MainLayout>
                <Component {...props} />
            </MainLayout>
        );
    };
};
