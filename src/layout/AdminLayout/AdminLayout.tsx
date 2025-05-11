import {AdminLayoutProps} from "./AdminLayout.props";
import React, {FunctionComponent} from "react";
import {Footer} from "../../../templates/Footer/Footer";
import cn from "classnames";
import styles from "./AdminLayout.module.css"
import {AccountSidebar} from "../../../templates/AccountSidebar/AccountSidebar";
import {AdminSidebar} from "../../../templates/AdminSidebar/AdminSidebar";


const AdminLayout = ({children}: AdminLayoutProps): JSX.Element => {
    return (
        <>
            <div className={cn(styles.account)}>
                <AdminSidebar/>
                <main className={cn(styles.account_page)}>
                    {children}
                </main>
            </div>
            <Footer/>
        </>
    );
};

export const withAdminLayout = <T extends Record<string, unknown>>(
    Component: FunctionComponent<T>
) => {
    return function withAdminLayoutComponent(props: T): JSX.Element {
        return (
            <AdminLayout>
                <Component {...props} />
            </AdminLayout>
        );
    };
};
