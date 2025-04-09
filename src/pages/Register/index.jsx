import Container from "../../components/Container";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../../components/Counter";
import { ClipLoader } from "react-spinners";
import {
  doc,
  setDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";

const Register = () => {
  const [telefone, setTelefone] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const [confirmacao, setConfirmacao] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const configurarRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  };

  const enviarCodigo = async (telefone, setConfirmacao) => {
    setLoading(true);
    const q = query(collection(db, "users"), where("phone", "==", telefone));
    const querySnap = await getDocs(q);

    if (!querySnap.empty) {
      toast.warn("Este número ja esta cadastrado, redirecionando para o Login");
      navigate("/login");
      return;
    }
    try {
      configurarRecaptcha();
      const confirmation = await signInWithPhoneNumber(
        auth,
        telefone,
        window.recaptchaVerifier
      );
      setConfirmacao(confirmation); // guarda para usar depois na verificação
      toast.success("Código enviado com sucesso!");
      setLoading(false);
      setStep(2);
    } catch (err) {
      setLoading(false);
      console.error("Erro ao enviar código:", err);
      toast.error("Erro ao enviar código");
    }
  };

  const handleRegister = async (telefone, setConfirmacao) => {
    if (name.length < 3) {
      toast.warn("O nome deve conter mais de 3 caracteres");
      return;
    }
    if (telefone.length < 10) {
      toast.warn("o telefone deve ter todos os digitos");
      return;
    }
    enviarCodigo(telefone, setConfirmacao);
  };
  const reenviarCodigo = () => {
    enviarCodigo(telefone, setConfirmacao);
    toast.success("Codigo enviado com sucesso");
  };

  const handleVerifyCode = async (confirmationResult, code, nome, navigate) => {
    setLoading(true)
    try {
      const resultado = await confirmationResult.confirm(code);
      const user = resultado.user;

      // Salvar no Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: nome,
        phone: user.phoneNumber,
        createdAt: serverTimestamp(),
      });

      toast.success("Cadastro realizado com sucesso!");
      setLoading(false)
      navigate("/"); // redireciona se quiser
    } catch (err) {
      setLoading(false)
      console.error("Erro ao verificar código:", err);
      toast.error("Código inválido");
    }
  };

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
            <div className="w-full max-w-70 lg:max-w-100 text-apoio flex flex-col items-center gap-2 justify-center">
              <span className="">
                Parece que você ainda não tem uma conta,{" "}
                <span className="text-principal font-bold">
                  criaremos uma agora
                </span>{" "}
              </span>
              <span className="text-principal uppercase">Digite seu nome</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="uppercase !w-65 lg:!w-120 lg:!text-2xl p-2 rounded border  font-bold !bg-apoio text-principal text-center lg:!p-2"
              />
              <span className="text-principal uppercase mt-3">
                Digite seu telefone
              </span>
              <PhoneInput
                className="!w-auto"
                country={"br"}
                value={telefone}
                onChange={(phone) => setTelefone("+" + phone)}
                inputClass="!w-65 !h-12 lg:!w-80 lg:!text-2xl !text-xl p-2 rounded border mb-4 font-bold !bg-apoio text-principal text-center lg:!p-2"
                enableSearch
              />
              {loading ? (
                <button className="px-2 bg-botoes text-principal font-bold rounded p-2 hover:bg-principal hover:text-botoes cursor-pointer">
                  {" "}
                  <ClipLoader size={22} />
                </button>
              ) : (
                <button
                  onClick={() => handleRegister(telefone, setConfirmacao)}
                  className="bg-botoes text-principal font-bold rounded p-2 hover:bg-principal hover:text-botoes cursor-pointer"
                >
                  Continuar
                </button>
              )}
            </div>
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
            <div
              className="flex justify-center flex-col items-center gap-5"
            >
              <span className="text-apoio lg:text-2xl">
                Só mais um pouco{" "}
                <p className="text-principal font-bold capitalize">{name}</p>
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
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                onClick={(_) =>
                  handleVerifyCode(confirmacao, code, name, navigate)
                }
                className="transition-all rounded bg-botoes px-3 py-1 text-principal font-bold cursor-pointer hover:bg-principal hover:text-fundo flex items-center"
              >
                {loading ? (
                  <ClipLoader size={22} color="#5B6F44" />
                ) : (
                  <>Continuar</>
                )}
              </button>
            </div>
            <div>
              <CountdownTimer initialSeconds={120} onResend={reenviarCodigo} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Register;
