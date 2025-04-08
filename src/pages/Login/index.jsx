//components
import Container from "../../components/container";

//libs
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//assets
import logo from "../../assets/logo.png";

//elements
import { useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  limitToLast,
} from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [telefone, setTelefone] = useState("");
  const [setp, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  //function to check if number exists

  const handleCheckPhone =async  (e) => {
    e.preventDefault();
    setLoading(true);
    if (telefone.length < 10) {
      toast.warn("Preencha todos os numeros do seu telefone");
      setLoading(false);
      return;
    }
    const q = query(collection(db, "users"), where("phone", "==", telefone));
    const querySnap = await getDocs(q)

    if(!querySnap.empty){
      setStep(2)
      setLoading(false)
    }else{
      navigate('/register')
    }
  };
  return (
    <Container>
      <div className="flex justify-center flex-col items-center">
        <img className="w-40 lg:w-60" src={logo} />
        <form
          className="flex justify-center flex-col items-center gap-5"
          onSubmit={(e) => handleCheckPhone(e)}
        >
          <PhoneInput
            country={"br"}
            value={telefone}
            onChange={(phone) => setTelefone("+" + phone)}
            inputClass="!w-50 lg:!w-80 lg:!text-2xl p-2 rounded border mb-4 font-bold !bg-apoio text-principal text-center lg:!p-5"
            enableSearch
          />
          <button
            onClick={(e) => handleCheckPhone(e)}
            className="transition-all rounded bg-botoes px-3 py-1 text-principal font-bold cursor-pointer hover:bg-principal hover:text-fundo flex items-center"
          >
            {loading ? (
              <ClipLoader size={22} color="#5B6F44" />
            ) : (
              <>Continuar</>
            )}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
