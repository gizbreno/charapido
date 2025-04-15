import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Container from "../../components/container";
import {
  FaCheck,
  FaRegAddressCard,
  FaTimes,
  FaTrash,
  FaUserPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { nanoid } from "nanoid";

const Convidados = () => {

  const { user, handleSetUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [index, setIndex] = useState("");
  const [confirmed, setConfirmed] = useState(0);
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [family, setFamily] = useState(0);
  const [total, setTotal] = useState(0);
  const [faltam, setFaltam] = useState(0);
  const [step, setStep] = useState(1);

  const [formName, setformName] = useState("");
  const [formAdult, setFormAdult] = useState("");
  const [formTamanho, setFormTamanho] = useState("M");
  const [formChild, setformChild] = useState("");
  useEffect(() => {
    let indexLoc = location.pathname.split("/")[2];
    if (!indexLoc) {
      navigate("/");
    } else {
      setIndex(indexLoc);
      let list = user && user.events && user.events[indexLoc];
      let filtredListConfirm = list?.inviteds?.filter((item) => {
        return item.confirm === true;
      });
      let fltredListNoConfirm = list?.inviteds?.filter((item) => {
        return !item.confirm;
      });
      let filtredListChild = list?.inviteds?.filter((item) => {
        return item.criancas > 0;
      });
      let filtredListAdult = list?.inviteds?.filter((item) => {
        return item.adultos > 0;
      });
      let childas = 0;
      let adultas = 0;
      filtredListChild?.forEach((el) => (childas = childas + el.criancas));
      filtredListAdult?.forEach((el) => (adultas = adultas + el.adultos));

      setConfirmed(filtredListConfirm?.length);
      setFaltam(fltredListNoConfirm?.length);
      setChild(childas);
      setFamily(list?.inviteds?.length);
      setAdult(adultas);
      setTotal(childas + adultas);
    }
  }, [user]);

  const handleConfirm = async (item) => {
    try {
      let usertoEdit = user;
      let list = user.events[index].inviteds;
      list[item].confirm = true;
      usertoEdit.events[index].inviteds = list;
      let docRef = doc(db, "users", user.id);
      await updateDoc(docRef, usertoEdit);
      handleSetUser();
    } catch (error) {
      toast.error("Ocorreu um erro tente novamente mais tarde");
      console.log(error);
    }
  };

  const handleUnconfirm = async (item) => {
    try {
      let usertoEdit = user;
      let list = user.events[index].inviteds;
      list[item].confirm = false;
      usertoEdit.events[index].inviteds = list;
      let docRef = doc(db, "users", user.id);
      await updateDoc(docRef, usertoEdit);
      handleSetUser();
    } catch (error) {
      toast.error("Ocorreu um erro tente novamente mais tarde");
      console.log(error);
    }
  };

  const handleExclude = async (item) => {
    try {
      let usertoEdit = user;
      let list = usertoEdit.events[index].inviteds;
      let filtredListExcluded = list.filter((_, is) => is !== item);
      usertoEdit.events[index].inviteds = filtredListExcluded;
      let docRef = doc(db, "users", user.id);
      console.log(usertoEdit);
      await updateDoc(docRef, usertoEdit);
      handleSetUser();
    } catch (error) {
      toast.error("Ocorreu um erro tente novamente mais tarde");
      console.log(error);
    }
  };

  const handleAdd = async () => {
    if (!formAdult || !formChild || !formName || !formTamanho) {
      console.log(formTamanho);
      toast.warn("Preencha todos os dados");
      return;
    }
    let userActual = user;
    userActual.events[0].inviteds.push({
      adultos: formAdult,
      criancas: formChild,
      confirm: false,
      familia: formName,
      tamanho: formTamanho,
    });

    let docRef = doc(db, "users", user.id);
    try {
      await updateDoc(docRef, userActual);
      setStep(1);
      setformChild("");
      setFormTamanho("M");
      setFormAdult("");
      setformName("");
      handleSetUser();
    } catch (error) {
      console.log(error);
    }
  };

  // const updateHandle = async (lista) => {
  //   let docRef = doc(db, "users", user.id);
  //   try {
  //     await updateDoc(docRef, lista);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Container>
      {user && user.events && index && user.events[index] ? (
        <div className="bg-botoes h-full w-full flex flex-col">
          <div className="h-full max-h-13 p-2 flex justify-between">
            <div className="flex flex-col text-sm">
              <span>
                Convidados: <strong>{total}</strong>
              </span>
              <span>
                Familias: <strong>{family}</strong>
              </span>
            </div>
            <div className="flex flex-col text-sm">
              <span>
                Crianças: <strong>{child}</strong>
              </span>
              <span>
                Adultos: <strong>{adult}</strong>
              </span>
            </div>
            <div className="flex flex-col text-sm">
              <span>
                Confirmados: <strong>{confirmed}</strong>
              </span>
              <span>
                Faltam: <strong>{faltam}</strong>
              </span>
            </div>
          </div>
          <div className="p-2 flex justify-between">
            <button
              onClick={(_) => setStep(2)}
              className="flex gap-2 bg-principal text-apoio px-2 py-1 items-center rounded"
            >
              <FaUserPlus />
              Add
            </button>
            <button className="flex gap-2 bg-principal text-apoio px-2 py-1 items-center rounded">
              <span className=" text-sm">
                <span>
                  RN:{" "}
                  <span className="text-fundo">
                    {
                      user?.events[index]?.inviteds?.filter(
                        (el) => el.tamanho === "RN"
                      ).length
                    }{" "}
                  </span>
                </span>
              </span>
              <span className=" text-sm">
                P:{" "}
                <span className="text-fundo">
                  {
                    user?.events[index]?.inviteds?.filter(
                      (el) => el.tamanho === "P"
                    ).length
                  }{" "}
                </span>
              </span>
              <span className=" text-sm">
                M:{" "}
                <span className="text-fundo">
                  {
                    user?.events[index]?.inviteds?.filter(
                      (el) => el.tamanho === "M"
                    ).length
                  }{" "}
                </span>
              </span>
              <span className=" text-sm">
                G:{" "}
                <span className="text-fundo">
                  {
                    user?.events[index]?.inviteds?.filter(
                      (el) => el.tamanho === "G"
                    ).length
                  }{" "}
                </span>
              </span>
              <span className=" text-sm">
                GG:{" "}
                <span className="text-fundo">
                  {
                    user?.events[index]?.inviteds?.filter(
                      (el) => el.tamanho === "GG"
                    ).length
                  }{" "}
                </span>
              </span>
              <span className=" text-sm">
                XG:{" "}
                <span className="text-fundo">
                  {
                    user?.events[index]?.inviteds?.filter(
                      (el) => el.tamanho === "XG"
                    ).length
                  }{" "}
                </span>
              </span>
            </button>
          </div>
          <div className="max-h-135 overflow-auto p-2 flex flex-col gap-2">
            {user &&
              user.events &&
              user.events[index] &&
              user.events[index].inviteds.map((el, ind) => (
                <div
                  className="bg-apoio p-2 text-principal font-bold rounded text-xl flex justify-between"
                  key={ind}
                >
                  <div className=" flex flex-col">
                    <span className="flex gap-2 items-center text-sm">
                      {el.familia} [ {el.tamanho} ]{" "}
                      {el.confirm ? (
                        <FaCheck className="text-botoes" />
                      ) : (
                        <FaTimes className="text-botoes" />
                      )}
                    </span>
                    <div className="flex gap-2">
                      <span className="text-sm">Adultos: {el.adultos}</span>
                      <span className="text-sm">Crianças: {el.criancas}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <button
                      onClick={(_) => handleUnconfirm(ind)}
                      className=" bg-botoes px-2 py-1 rounded text-xl flex flex-col items-center min-w-8"
                    >
                      <FaTimes />
                    </button>
                    <button
                      onClick={(_) => handleConfirm(ind)}
                      className=" bg-botoes px-2 py-1 rounded text-xl flex flex-col items-center min-w-8"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={(_) => navigate(`/invite/${el.id}`)}
                      className=" bg-botoes px-2 py-1 rounded text-xl flex flex-col items-center min-w-8"
                    >
                      <FaRegAddressCard />
                    </button>
                    <button
                      onClick={(_) => handleExclude(ind)}
                      className=" bg-botoes px-2 py-1 rounded text-xl flex flex-col items-center min-w-8"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
          </div>
          {step === 2 && (
            <div className="absolute w-full h-full max-h-160 bg-principal opacity-80"></div>
          )}
          {step === 2 && (
            <div className="absolute bg-botoes w-full pt-20 pb-10 max-h-100 top-40 rounded p-5 text-principal flex flex-col gap-2 justify-center">
              <div
                onClick={(_) => setStep(1)}
                className="absolute top-5 right-5 text-2xl bg-principal text-apoio p-2 rounded-full "
              >
                <FaTimes />
              </div>
              <label className="flex gap-2 flex-col">
                <span>Nome</span>
                <input
                  value={formName}
                  onChange={(e) => setformName(e.target.value)}
                  type="name"
                  className="bg-apoio text-principal  w-full text-xl p-2 rounded"
                ></input>
              </label>
              <div className="w-full flex justify-between">
                <label>
                  <span className="flex gap-2 flex-col">Adultos</span>
                  <input
                    value={formAdult}
                    onChange={(e) => setFormAdult(parseInt(e.target.value))}
                    type="tel"
                    maxLength={1}
                    className="bg-apoio text-principal  w-20  text-xl p-2 rounded"
                  ></input>
                </label>
                <label>
                  <span className="flex gap-2 flex-col">Tamanho</span>
                  <select
                    className="uppercase bg-apoio text-principal  w-20  text-xl p-2 rounded h-11"
                    value={formTamanho}
                    onChange={(e) => setFormTamanho(e.target.value)}
                  >
                    <option value="RN">RN</option>
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                    <option value="XG">XG</option>
                  </select>
                </label>
                <label>
                  <span className="flex gap-2 flex-col">Crianças</span>
                  <input
                    value={formChild}
                    onChange={(e) => setformChild(parseInt(e.target.value))}
                    type="tel"
                    maxLength={1}
                    className="bg-apoio text-principal  w-20  text-xl p-2 rounded"
                  ></input>
                </label>
              </div>
              <button
                onClick={(_) => handleAdd()}
                className="bg-principal text-2xl text-apoio w-30 mx-auto mt-10 px-2 py-1 rounded"
              >
                Salvar
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className=" bg-botoes">Carregando</div>
      )}
    </Container>
  );
};
export default Convidados;
