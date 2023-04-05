import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  return (
    <div className="w-full h-screen overflow-auto flex flex-col text-slate-600 bg-slate-200 dark:bg-slate-600 transition-all">
      <div className="h-full">{props.children}</div>
    </div>
  );
};

export default Layout;
