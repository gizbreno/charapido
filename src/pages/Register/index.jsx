import Container from "../../components/Container";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";
import { useState } from "react";
import PhoneInput from 'react-phone-input-2'
const Register = () => {
  const [telefone, setTelefone] = useState("");

  const handleRegister = async ()=>{

  }
  return (
    <Container>
      <AnimatePresence>
        <motion.div
          className="flex justify-center flex-col items-center"
          key="step1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <img className="w-40 lg:w-60" src={logo} />
          <form className="w-full max-w-70 lg:max-w-100 text-apoio flex flex-col items-center gap-2 justify-center">
            <span className="">
              Parece que você ainda não tem uma conta,{" "}
              <span className="text-principal font-bold">
                criaremos uma agora
              </span>{" "}
            </span>
            <span className="text-principal uppercase">Digite seu nome</span>
            <input
              type="text"
              className="!w-65 lg:!w-80 lg:!text-2xl p-2 rounded border  font-bold !bg-apoio text-principal text-center lg:!p-2"
            />
            <span className="text-principal uppercase mt-3">
              Digite seu telefone
            </span>
            <PhoneInput
            className='!w-auto'
              country={"br"}
              value={telefone}
              onChange={(phone) => setTelefone("+" + phone)}
              inputClass="!w-65 !h-12 lg:!w-80 lg:!text-2xl !text-xl p-2 rounded border mb-4 font-bold !bg-apoio text-principal text-center lg:!p-2"
              enableSearch
            />
            <button onClick={handleRegister} className="bg-botoes p-2 text-principal mt-3 cursor-pointer hover:bg-principal hover:text-botoes rounded font-bold">Cadastrar</button>
          </form>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export default Register;
