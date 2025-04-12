import Container from "../../components/container";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { invitationModels } from "../../data/models";
import Model from "../../components/Model";

const Dashboard = () => {
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [date, setDate] = useState("");
  const [mimo, setMimo] = useState(false);
  const [hour, setHour] = useState("");
  const [obs, setObs] = useState("");
  const [inviteSelected, setInviteSelected] = useState(0);

  return (
    <Container>
      {step === 0 && (
        <div className="bg-botoes h-full w-full overflow-y-auto flex items-center">
          {user.events ? (
            <>eventos</>
          ) : (
            <div className="mx-auto w-80 text-principal lg:text-2xl flex flex-col items-start">
              <span>
                Pareçe que você ainda nao fez nenhum evento, que tal iniciarmos
                um ?
              </span>
              <button
                onClick={(_) => setStep(2)}
                className="bg-apoio rounded p-2 mt-2 font-bold cursor-pointer hover:bg-principal hover:text-apoio"
              >
                Criar
              </button>
            </div>
          )}
        </div>
      )}
      {/* Step One */}
      {step === 1 && (
        <div className="bg-botoes h-full w-full overflow-y-auto flex items-center">
          <div className="mx-auto text-principal lg:text-2xl flex flex-col items-startw-full lg:max-w-150 w-full max-w-100 p-5">
            <h1 className="text-2xl mb-3 mx-auto">
              Primeiro informe os dados do evento:
            </h1>
            <div className="p-2 flex flex-col gap-2 w-full">
              <label>
                <p>Nome da criança:</p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={20}
                  type="text"
                  className="p-2 bg-apoio  text-principal rounded border-principal border-2 w-full font-bold"
                />
              </label>
              <label>
                <p>Endereço do evento:</p>
                <input
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
                  maxLength={200}
                  type="text"
                  className="p-2 bg-apoio  text-principal rounded border-principal border-2 w-full font-bold"
                />
              </label>
              <div className="flex w-full justify-between items-center gap-2">
                <div>
                  <p>Data:</p>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    className="p-2 bg-apoio  text-principal rounded border-principal border-2 w-full font-bold"
                  />
                </div>
                <div>
                  <p>Mimo:</p>
                  <input
                    value={mimo}
                    onChange={(e) => setMimo(e.target.checked)}
                    type="checkbox"
                    className=" w-7 h-7 mt-1 appearance-none border-2 border-apoio rounded-sm checked:bg-principal checked:border-principal transition-colors"
                  />
                </div>
                <div>
                  <p>Hora:</p>
                  <input
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    type="time"
                    className="p-2 bg-apoio  text-principal rounded border-principal border-2 w-full font-bold"
                  />
                </div>
              </div>
              <label>
                <p>Oberservação:</p>
                <input
                  value={obs}
                  onChange={(e) => setObs(e.target.value)}
                  maxLength={200}
                  type="text"
                  className="p-2 bg-apoio  text-principal rounded border-principal border-2 w-full font-bold"
                />
              </label>
            </div>
            <div className="p-2 mt-10 relative flex justify-center w-70 mx-auto">
              <div className="h-1 bg-apoio absolute -top-1 w-full"></div>
              <div
                onClick={(_) => setStep(1)}
                className={`h-10 w-10 rounded-full absolute -top-5 left-0 bg-botoes border-2 border-principal flex items-center justify-center text-xl ${
                  step === 1 && "!bg-apoio text-pricipal"
                }`}
              >
                1
              </div>
              <div
                onClick={(_) => setStep(2)}
                className={`h-10 w-10 rounded-full absolute -top-5  bg-botoes border-2 border-principal flex items-center justify-center text-xl ${
                  step === 2 && "!bg-apoio text-pricipal"
                }`}
              >
                2
              </div>
              <div
                onClick={(_) => setStep(3)}
                className={`h-10 w-10 rounded-full absolute -top-5 right-0 bg-botoes border-2 border-principal flex items-center justify-center text-xl ${
                  step === 3 && "!bg-apoio text-pricipal"
                }`}
              >
                3
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step Two */}
      {step === 2 && (
        <div className="bg-botoes h-full w-full overflow-y-auto flex items-center">
          <div className="mx-auto text-principal lg:text-2xl flex flex-col items-startw-full lg:max-w-150 w-full max-w-100 p-5 min-h-120 justify-between">
            <div className="flex items-center flex-col gap-4">
              <h1 className="text-xl">Escolha um modelo de convite:</h1>
              <div>
                {console.log(invitationModels)}
                <Model modelIndex={1} name={name} />
              </div>
              <div className="mt-8 flex justify-center gap-2 items-center border-2 p-2 rounded cursor-pointer hover:bg-apoio">
                <FaExchangeAlt className="" /> Mudar
              </div>
            </div>
            <div className="p-2 mt-10 relative flex justify-center w-70 mx-auto">
              <div className="h-1 bg-apoio absolute -top-1 w-full"></div>
              <div
                onClick={(_) => setStep(1)}
                className={`h-10 w-10 rounded-full absolute -top-5 left-0 bg-botoes border-2 border-principal flex items-center justify-center text-xl ${
                  step === 1 && "!bg-apoio text-pricipal"
                }`}
              >
                1
              </div>
              <div
                onClick={(_) => setStep(2)}
                className={`h-10 w-10 rounded-full absolute -top-5  bg-botoes border-2 border-principal flex items-center justify-center text-xl ${
                  step === 2 && "!bg-apoio text-pricipal"
                }`}
              >
                2
              </div>
              <div
                onClick={(_) => setStep(3)}
                className={`h-10 w-10 rounded-full absolute -top-5 right-0 bg-botoes border-2 border-principal flex items-center justify-center text-xl ${
                  step === 3 && "!bg-apoio text-pricipal"
                }`}
              >
                3
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
