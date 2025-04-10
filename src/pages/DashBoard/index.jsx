import Container from "../../components/container";
import { useUser } from "../../context/UserContext";
import { useState } from "react";

const Dashboard = () => {
  const { user } = useUser();
  const [step, setStep] = useState(1);

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

      {step === 1 && (
        <div className="bg-botoes h-full w-full overflow-y-auto flex items-center">
          <div className="mx-auto text-principal lg:text-2xl flex flex-col items-startw-full lg:max-w-150 w-full max-w-100 p-5">
            <div className="p-2 flex flex-col gap-2 w-full">
              <label>
                <p>Nome da criança:</p>
                <input
                  type="text"
                  className="p-2 bg-apoio  text-principal rounded border-principal border-2 w-full font-bold"
                />
              </label>
              <label>
                <p>Endereço do evento:</p>
                <input
                  type="text"
                  className="p-2 bg-apoio  text-principal rounded border-principal border-2 w-full font-bold"
                />
              </label>
              <div className="flex w-full justify-between items-center gap-2">
                <div>
                  <p>Data:</p>
                  <input
                    type="date"
                    className="p-2 bg-apoio  text-principal rounded border-principal border-2 w-full font-bold"
                  />
                </div>
                <div>
                  <p>Mimo:</p>
                  <input
                    type="checkbox"
                    className="w-7 h-7 mt-1 appearance-none border-2 border-apoio rounded-sm checked:bg-principal checked:border-principal transition-colors"
                  />
                </div>
                <div>
                  <p>Hora:</p>
                  <input
                    type="time"
                    className="p-2 bg-apoio  text-principal rounded border-principal border-2 w-full font-bold"
                  />
                </div>
              </div>
              <label>
                <p>Oberservação:</p>
                <input
                  type="text"
                  className="p-2 bg-apoio  text-principal rounded border-principal border-2 w-full font-bold"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
