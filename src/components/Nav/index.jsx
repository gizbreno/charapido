import { useNavigate, NavLink } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

//icons
import {
  FaHandshake,
  FaHandsHelping,
  FaHome,
  FaList,
  FaSignOutAlt,
} from "react-icons/fa";
import { PiListStarFill } from "react-icons/pi";
const Nav = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-apoio h-1/12 flex justify-around items-center">
      <NavLink
        to="/invites"
        className={({ isActive }) =>
          isActive
            ? "-translate-y-8 transition-all bg-principal p-2 border-2 border-botoes rounded-full text-botoes"
            : "!text-principal  p-2"
        }
      >
        <FaList size={36} />
      </NavLink>
      <NavLink
        to="/models"
        className={({ isActive }) =>
          isActive
            ? "-translate-y-8 transition-all bg-principal p-2 border-2 border-botoes rounded-full text-botoes"
            : "!text-principal  p-2"
        }
      >
        <PiListStarFill size={36} />
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "-translate-y-8 transition-all bg-principal p-2 border-2 border-botoes rounded-full text-botoes"
            : "!text-principal  p-2"
        }
      >
        <FaHome size={36} />
      </NavLink>
      <NavLink
        to="/help"
        className={({ isActive }) =>
          isActive
            ? "-translate-y-8 transition-all bg-principal p-2 border-2 border-botoes rounded-full text-botoes"
            : "!text-principal  p-2"
        }
      >
        <FaHandsHelping size={36} />
      </NavLink>

      <NavLink
        to="/logout"
        className={({ isActive }) =>
          isActive
            ? "-translate-y-8 transition-all bg-principal p-2 border-2 border-botoes rounded-full text-botoes"
            : "!text-principal  p-2"
        }
        onClick={async () => {
          await signOut(auth);
          toast.info("Você desconectou");
          navigate("/login");
        }}
      >
        <FaSignOutAlt size={36} />
      </NavLink>
    </nav>
  );
};

export default Nav;
