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
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [telefone, setTelefone] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  const configureRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber
            console.log("reCAPTCHA resolvido!");
          },
        }
      );
    }
  };

  //function to check if number exists
  const handleCheckPhone = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (telefone.length < 10) {
      toast.warn("Preencha todos os numeros do seu telefone");
      setLoading(false);
      return;
    }
    const q = query(collection(db, "users"), where("phone", "==", telefone));
    const querySnap = await getDocs(q);

    if (!querySnap.empty) {
      setStep(2);
      setLoading(false);
      querySnap.forEach((doc) => doc.data().name && setName(doc.data().name));
    } else {
      navigate("/register");
    }
  };
  return (
    <Container>
      <AnimatePresence>
        {step === 1 && (
          <motion.div
            className="flex justify-center flex-col items-center"
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            className="flex justify-center flex-col items-center w-full"
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <img className="w-40 lg:w-60" src={logo} />
            <form
              className="flex justify-center flex-col items-center gap-5"
              onSubmit={(e) => handleCheckPhone(e)}
            >
              <span className="text-apoio lg:text-2xl">
                Que bom ter você de volta,{" "}
                <p className="text-principal font-bold">{name}</p>
              </span>

              <span className="text-apoio">
                Diite o codigo enviado para{" "}
                <p className="font-bold text-principal">{telefone}</p>
              </span>
              <input
                type="tel"
                className="bg-apoio rounded text-center w-40 outline-0 p-2 font-bold "
                inputMode="numeric"
                maxLength={6}
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
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Login;
