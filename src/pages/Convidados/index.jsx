import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Container from "../../components/container";
import { FaCheck, FaRegAddressCard, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Convidados = () => {
  const { user, handleSetUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [index, setIndex] = useState("");
  const [confirmed, setConfirmed] = useState(0);
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [family, setFamily] = useState(0);
  const [unconfirmed, setUnconfirmed] = useState(0);
  const [total, setTotal] = useState(0);
  const [faltam, setFaltam] = useState(0);
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
      let filtredListExcluded = list.filter((_, is) => is !== item)
      usertoEdit.events[index].inviteds = filtredListExcluded;
      let docRef = doc(db, "users", user.id);
      console.log(usertoEdit)
      await updateDoc(docRef, usertoEdit);
      handleSetUser();
    } catch (error) {
      toast.error("Ocorreu um erro tente novamente mais tarde");
      console.log(error);
    }
  };

  return (
    <Container>
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
        <div className="max-h-148 overflow-auto p-2 flex flex-col gap-2">
          {user &&
            user.events &&
            user.events[index] &&
            user.events[index].inviteds.map((el, ind) => (
              <div
                className="bg-apoio p-2 text-principal font-bold rounded text-xl flex justify-between"
                key={ind}
              >
                <div className=" flex flex-col">
                  <span className="flex gap-2 items-center">
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
                  <button className=" bg-botoes px-2 py-1 rounded text-xl flex flex-col items-center min-w-8">
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
      </div>
    </Container>
  );
};
export default Convidados;
