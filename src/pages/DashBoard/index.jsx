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
              onClick={_=>setStep(2)}
              className="bg-apoio rounded p-2 mt-2 font-bold cursor-pointer hover:bg-principal hover:text-apoio">
                Criar
              </button>
            </div>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="bg-botoes h-full w-full overflow-y-auto flex items-center">
          <div className="mx-auto w-80 text-principal lg:text-2xl flex flex-col items-start">
            ssasas
          </div>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
