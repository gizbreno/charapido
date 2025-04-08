import Box from "../../components/Box";
import Container from "../../components/container";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import logo from "../../assets/logo.png";
import { useState } from "react";

const Login = () => {
  const [telefone, setTelefone] = useState("");
  return (
    <Container>
      <div className="flex justify-center flex-col items-center">
        <img className="w-40 lg:w-60" src={logo} />
        <form className="flex justify-center flex-col items-center gap-5" onSubmit={e=>e.preventDefault()}>
          <PhoneInput
            country={"br"}
            value={telefone}
            onChange={(phone) => setTelefone("+" + phone)}
            inputClass="!w-50 lg:!w-80 lg:!text-2xl p-2 rounded border mb-4 font-bold !bg-apoio text-principal text-center lg:!p-5"
            enableSearch
          />
          <button className="rounded bg-botoes px-3 py-1 text-principal">Entrar</button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
