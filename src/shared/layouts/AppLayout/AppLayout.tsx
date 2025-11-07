import type {  ReactNode } from "react";

interface AppLayoutProps {
  children?: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return <main className="w-full min-h-screen h-full py-8 c-padding bg-black">{children}</main>;
};

export default AppLayout;
