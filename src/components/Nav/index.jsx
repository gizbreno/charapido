import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      navibar{" "}
      <button
        onClick={async () => {
          await signOut(auth);
          toast.info("Você desconectou");
          navigate("/login");
        }}
      >
        singout
      </button>
    </div>
  );
};

export default Nav;
