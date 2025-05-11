import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface AccountSidebarButtonProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  content: string;
  children?: ReactNode;
}
