import Container from "../../components/container";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import {
  FaCheck,
  FaExchangeAlt,
  FaPencilAlt,
  FaPlus,
  FaPlusSquare,
  FaTrash,
  FaUpload,
  FaUserPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { differenceInDays, format, formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import logo from "../../assets/logo.png";
import Chart from "../../components/Chart";
import { Pie } from "recharts";

const Dashboard = () => {
  const { user, handleUpdateUser, loadingUpdate } = useUser();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [date, setDate] = useState("");
  const [mimo, setMimo] = useState(false);
  const [hour, setHour] = useState("");
  const [obs, setObs] = useState("");
  const [editEvent, setEditEvent] = useState(false);

  //uploadImage
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [loading, setLoading] = useState(null);

  var dataFormated =
    date &&
    format(new Date("2025-04-12"), "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const MAX_FILE_SIZE_MB = 28;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.warn(`Imagem muito grande! O limite é de ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setUploadUrl(data.data.url);
      setStep(3);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro tente novamente mais tarde");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStep = (stepSel) => {
    if (stepSel === 2) {
      if (!name || !adress || !date || !hour) {
        toast.warn("Preencha todos os dados antes de avançar");
        setStep(1);
        return;
      } else {
        setStep(2);
      }
    }
    if (stepSel === 1) {
      setStep(1);
    }
    if (stepSel === 3) {
      if (!uploadUrl) {
        toast.warn("Envie o modelo antes de passar para proxima etapa");
      } else {
        setStep(3);
      }
    }
  };

  const handleSave = async () => {
    let newUser = user;
    if (newUser.events) {
      if (newUser.events.length > 1) {
        newUser.events.push({
          name,
          adress,
          date: dataFormated,
          dateOrigin: date,
          hour,
          mimo,
          obs,
          url: uploadUrl,
        });
      } else {
        newUser.events = [
          {
            name,
            adress,
            date: dataFormated,
            dateOrigin: date,
            hour,
            mimo,
            obs,
            url: uploadUrl,
          },
        ];
      }
    } else {
      newUser.events = [
        {
          name,
          adress,
          date: dataFormated,
          dateOrigin: date,
          hour,
          mimo,
          obs,
          url: uploadUrl,
        },
      ];
    }
    const result = await handleUpdateUser(newUser);
    if (result.sucess) {
      setStep(0);
      toast.success("Evento criado com sucesso");
      return;
    }
    if (!result.sucess) {
      toast.error("Ocorreu um erro tente novamente mais tarde");
      return;
    }
  };

  const handleAddGuest = () => {};
  const handleExcludeEvent = () => {};
  const handleEditEvent = (element) => {
    console.log(element);
    setName(element.name);
    setAdress(element.adress);
    setDate(element.dateOrigin);
    dataFormated = element.date;
    setHour(element.hour);
    setMimo(element.mimo);
    setObs(element.obs);
    setUploadUrl(element.url);
    setPreviewUrl(element.url);
    setStep(1);
    setEditEvent(true);
    console.log(element.mimo);
  };
  return (
    <Container>
      {step === 0 && (
        <div className="bg-botoes h-full w-full overflow-y-auto flex items-center">
          {user.events ? (
            <div className=" w-full h-full flex flex-wrap  items-start p-5 lg:w-xl text-principal">
              {user.events.map((el, index) => (
                <div
                  className="flex w-full flex-col pb-3 shadow-apoio shadow-md"
                  key={index}
                >
                  <div className="bg-apoio rounded-t-xl w-full p-2 flex justify-between text-principal font-bold">
                    <p className="capitalize">{el.name}</p>
                    <p>{el.date}</p>
                    <p>{el.hour}</p>
                  </div>
                  <div className="flex justify-between w-full pt-3 mx-auto">
                    <div className="rounded border-2 border-principal min-w-60 flex  flex-col justify-center">
                      <span className="flex w-full justify-between p-2">
                        Convidados:{" "}
                        <p className="bg-fundo px-2 rounded font-bold">0</p>
                      </span>
                      <span className="flex w-full justify-between p-2">
                        Confirmados: :{" "}
                        <p className="bg-fundo px-2 rounded font-bold">0</p>
                      </span>
                      <span className="flex w-full justify-between p-2">
                        Fraldas destinadas: :{" "}
                        <p className="bg-fundo px-2 rounded font-bold">0</p>
                      </span>
                    </div>
                    <div className="flex  flex-col items-center">
                      <img src={logo} className="w-40" />{" "}
                      <p>
                        Faltam:{" "}
                        <strong>
                          {differenceInDays(
                            new Date(el.dateOrigin),
                            new Date()
                          )}
                        </strong>{" "}
                        dias
                      </p>
                      {console.log(el.dateOrigin)}
                    </div>
                  </div>
                  {/* Aqui pie chart */}
                  {el.fraldas && <Chart data={el.fraldas} />}
                  <div className="text-2xl mt-3  flex justify-between px-2">
                    <button
                      onClick={(_) => handleEditEvent(el)}
                      className="min-w-20 rounded flex justify-center bg-apoio items-center p-2 cursor-pointer hover:bg-principal hover:text-apoio"
                    >
                      <FaPencilAlt />
                    </button>
                    <button className="min-w-20 rounded flex justify-center bg-apoio items-center p-2 cursor-pointer hover:bg-principal hover:text-apoio">
                      <FaUserPlus />
                    </button>
                    <button className="min-w-20 rounded flex justify-center bg-apoio items-center p-2 cursor-pointer hover:bg-principal hover:text-apoio">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
              <div className=" p-2 w-full flex justify-center self-end">
                <button className="min-w-20 rounded flex justify-center bg-apoio p-2 items-center gap-2 font-bold ">
                  Criar novo evento
                  <FaPlus />
                </button>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-80 text-principal lg:text-2xl flex flex-col items-start">
              <span>
                Pareçe que você ainda nao fez nenhum evento, que tal iniciarmos
                um ?
              </span>
              <button
                onClick={(_) => handleChangeStep(1)}
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
          <div className="mx-auto text-principal lg:text-xll flex flex-col items-startw-full justify-between lg:max-w-150 w-full max-w-100 p-5 min-h-150 lg:min-h-130">
            <h1 className="text-xl font-bold mb-3 mx-auto">
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
                    checked={mimo}
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
              <button
                onClick={(_) => handleChangeStep(2)}
                className="w-30 mx-auto mt-8 lg:mt-3 flex justify-center gap-2 items-center border-2 p-2 rounded cursor-pointer hover:bg-apoio"
              >
                {" "}
                Continuar
              </button>
            </div>

            <div className="p-2 mt-10 relative flex justify-center w-70 mx-auto">
              <div className="h-1 bg-apoio absolute -top-1 w-full"></div>
              <div
                onClick={(_) => handleChangeStep(1)}
                className={`h-10 w-10 rounded-full absolute -top-5 left-0 bg-botoes border-2 border-principal flex items-center justify-center text-xl ${
                  step === 1 && "!bg-apoio text-pricipal"
                }`}
              >
                1
              </div>
              <div
                onClick={(_) => handleChangeStep(2)}
                className={`h-10 w-10 rounded-full absolute -top-5  bg-botoes border-2 border-principal flex items-center justify-center text-xl ${
                  step === 2 && "!bg-apoio text-pricipal"
                }`}
              >
                2
              </div>
              <div
                onClick={(_) => handleChangeStep(3)}
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
        <div className="bg-botoes h-full w-full overflow-y-auto flex items-center ">
          <div className="mx-auto text-principal lg:text-2xl flex flex-col  items-startw-full lg:max-w-150 w-full max-w-100 p-5 min-h-120 justify-between">
            <div className="flex items-center flex-col gap-4">
              <h1 className="text-xl font-bold">Envie o modelo do convite:</h1>
              <p className="w-80 text-apoi lg:w-full lg:text-xl">
                Lembre-se de não constar a sugetsão de mimo e fralda, sera
                definido depois automaticamente.
              </p>
              <label
                htmlFor="inputImage"
                className="bg-apoio w-50 h-70 rounded"
              >
                {previewUrl && (
                  <div>
                    <p className="text-sm text-gray-600">Pré-visualização:</p>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}
              </label>
              <div className="flex gap-2">
                {previewUrl && (
                  <button
                    onClick={(_) =>
                      image ? handleUpload() : !image && editEvent && setStep(3)
                    }
                    disabled={
                      image ? false : editEvent ? false : loading ? true : false
                    }
                    className="mt-8 lg:mt-3 flex justify-center gap-2 items-center border-2 p-2 rounded cursor-pointer hover:bg-apoio"
                  >
                    {loading ? (
                      <>
                        <ClipLoader size={20} color="#5B6F44" />
                        Salvando...
                      </>
                    ) : editEvent && !image ? (
                      <>
                        <FaCheck />
                        Continuar
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        Confirmar
                      </>
                    )}
                  </button>
                )}
                {!previewUrl && (
                  <div>
                    <label className="mt-8 lg:mt-3 flex justify-center gap-2 items-center border-2 p-2 rounded cursor-pointer hover:bg-apoio">
                      <input
                        id="inputImage"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <FaUpload className="" /> Selecionar
                    </label>
                  </div>
                )}
                {editEvent && !image && (
                  <div>
                    <label className="mt-8 lg:mt-3 flex justify-center gap-2 items-center border-2 p-2 rounded cursor-pointer hover:bg-apoio">
                      <input
                        id="inputImage"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <FaExchangeAlt className="" /> Alterar
                    </label>
                  </div>
                )}

                {image && (
                  <div>
                    <label className="mt-8 lg:mt-3 flex justify-center gap-2 items-center border-2 p-2 rounded cursor-pointer hover:bg-apoio">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <FaExchangeAlt className="" /> Alterar
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className="p-2 mt-10 relative flex justify-center w-70 mx-auto">
              <div className="h-1 bg-apoio absolute -top-1 w-full"></div>
              <div
                onClick={(_) => handleChangeStep(1)}
                className={`h-10 w-10 rounded-full absolute -top-5 left-0 bg-botoes border-2 border-principal flex items-center justify-center text-xl ${
                  step === 1 && "!bg-apoio text-pricipal"
                }`}
              >
                1
              </div>
              <div
                onClick={(_) => handleChangeStep(2)}
                className={`h-10 w-10 rounded-full absolute -top-5  bg-botoes border-2 border-principal flex items-center justify-center text-xl ${
                  step === 2 && "!bg-apoio text-pricipal"
                }`}
              >
                2
              </div>
              <div
                onClick={(_) => handleChangeStep(3)}
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

      {/* Step Three */}
      {step === 3 && (
        <div className="bg-botoes h-full w-full overflow-y-auto flex items-center ">
          <div className="mx-auto text-principal lg:text-2xl flex flex-col  items-startw-full lg:max-w-150 w-full max-w-100 p-5 min-h-150 justify-between">
            <div className="flex items-center flex-col gap-4 min-h-125 justify-between">
              <h1 className="text-xl font-bold">Confirme os dados:</h1>
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <div className="flex flex-col items-center w-full max-w-70 lg:max-w-200 text-center text-lg">
                  <span>Nome: {name}</span>
                  <span>Endereço: {adress}</span>
                  <span>
                    Data: {dataFormated} às: {hour}
                  </span>
                  <span>Sugerir mimo: {mimo ? "Sim" : "Não"}</span>
                  {obs && <span>Observação: {obs}</span>}
                </div>
                <div className="bg-apoio w-30 h-45 rounded lg:h-70 lg:w-80">
                  {previewUrl && (
                    <div>
                      <p className="text-sm text-gray-600">Convite:</p>
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 lg:text-sm text-sm">
                {!loadingUpdate && (
                  <button
                    onClick={(_) => handleChangeStep(1)}
                    disabled={loadingUpdate}
                    className="mt-8 lg:mt-3 flex justify-center gap-2 items-center border-2 p-2 rounded cursor-pointer hover:bg-apoio"
                  >
                    <FaExchangeAlt />
                    Dados
                  </button>
                )}
                {!loadingUpdate && (
                  <button
                    onClick={(_) => handleChangeStep(2)}
                    disabled={loadingUpdate}
                    className="mt-8 lg:mt-3 flex justify-center gap-2 items-center border-2 p-2 rounded cursor-pointer hover:bg-apoio"
                  >
                    <FaExchangeAlt />
                    Convite
                  </button>
                )}
                <button
                  onClick={(_) => handleSave()}
                  disabled={loadingUpdate}
                  className="mt-8 lg:mt-3 flex justify-center gap-2 items-center border-2 p-2 rounded cursor-pointer hover:bg-apoio"
                >
                  <FaCheck />
                  {!loadingUpdate ? "Salvar" : "Salvando"}
                </button>
              </div>
            </div>
            <div className="p-2 mt-10 relative flex justify-center w-70 mx-auto">
              <div className="h-1 bg-apoio absolute -top-1 w-full"></div>
              <div
                onClick={(_) => handleChangeStep(1)}
                className={`h-10 w-10 rounded-full absolute -top-5 left-0 bg-botoes border-2 border-principal flex items-center justify-center text-xl ${
                  step === 1 && "!bg-apoio text-pricipal"
                }`}
              >
                1
              </div>
              <div
                onClick={(_) => handleChangeStep(2)}
                className={`h-10 w-10 rounded-full absolute -top-5  bg-botoes border-2 border-principal flex items-center justify-center text-xl ${
                  step === 2 && "!bg-apoio text-pricipal"
                }`}
              >
                2
              </div>
              <div
                onClick={(_) => handleChangeStep(3)}
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
