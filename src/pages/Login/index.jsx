//components
import Container from "../../components/container";
import CountdownTimer from "../../components/Counter";

//libs
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//assets
import logo from "../../assets/logo.png";

//elements
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [telefone, setTelefone] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const navigate = useNavigate();

  //configure recaptcha
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
           // Não chame nada aqui por enquanto
        },
      });
      window.recaptchaVerifier.render(); // força a renderização
    }
  };

   // Envia o código SMS (ou simula no modo de teste)
   const handleSendCode = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, telefone, appVerifier);
      setConfirmationResult(result);
      toast.success('Código enviado!');
    } catch (error) {
      toast.error("Erro ao enviar código:", error);
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
  const reenviarCodigo = () => {
    handleSendCode()
    toast.success('Codigo enviado com sucesso')
  };

  //verifica o codigo 
  const handleVerifyCode = async (e) => {
    e.preventDefault()
    try {
      await confirmationResult.confirm(code);
      toast.success("Login realizado com sucesso!");
      navigate('/')
    } catch (error) {
      toast.error("Código inválido", error);
    }
  };

  useEffect(()=>{
    if(step === 2){
      handleSendCode()
    }
  },[step])
  return (
    <Container>
      <div id="recaptcha-container"></div>
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
                Digite o codigo enviado para{" "}
                <p className="font-bold text-principal">{telefone}</p>
              </span>
              <input
                type="tel"
                className="bg-apoio rounded text-center w-40 outline-0 p-2 font-bold "
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={e=>setCode(e.target.value)}
              />
              <button
                onClick={(e) => handleVerifyCode(e)}
                className="transition-all rounded bg-botoes px-3 py-1 text-principal font-bold cursor-pointer hover:bg-principal hover:text-fundo flex items-center"
              >
                {loading ? (
                  <ClipLoader size={22} color="#5B6F44" />
                ) : (
                  <>Continuar</>
                )}
              </button>
            </form>
            <div>
              <CountdownTimer initialSeconds={120} onResend={reenviarCodigo} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Login;
