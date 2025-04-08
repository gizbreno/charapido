import { Outlet } from "react-router-dom";
import Nav from "../Nav";

const Layout = () => {
  return (
    <div className="md:h-full flex flex-col justify-between h-svh ">
      <Outlet />
      <Nav />
    </div>
  );
};

export default Layout;
