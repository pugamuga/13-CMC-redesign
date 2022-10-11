import Header from "./Header";
import SideBar from "./SideBar";

interface IProps {
  children: JSX.Element;
}

export default function Layout({ children }: IProps): JSX.Element {
  return (
    <>
      <Header />
      <SideBar />
      {children}
    </>
  );
}
