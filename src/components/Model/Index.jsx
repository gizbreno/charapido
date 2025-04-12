import { invitationModels } from "../../data/models";
import { useState, useEffect, useRef } from "react";

const Index = ({ modelIndex, name }) => {
  const model = invitationModels[modelIndex];
  const [scaleFactor, setScaleFactor] = useState(1);
  const imageRef = useRef(null); // Referência à div ou imagem
  const originalImageWidth = 1240; // Largura original da imagem (pode ser uma constante ou variável)

  // Função para calcular o fator de escala
  const calculateScaleFactor = () => {
    if (imageRef.current) {
      const newImageWidth = imageRef.current.offsetWidth; // Obtém a largura da div
      const newScaleFactor = newImageWidth / originalImageWidth;
      setScaleFactor(newScaleFactor); // Atualiza o fator de escala
    }
  };

  useEffect(() => {
    // Calcula a escala assim que o componente é montado
    calculateScaleFactor();

    // Se a largura da div mudar (como em redimensionamento), recalcula o fator de escala
    window.addEventListener("resize", calculateScaleFactor);

    // Remove o event listener quando o componente for desmontado
    return () => {
      window.removeEventListener("resize", calculateScaleFactor);
    };
  }, []);

  // Tamanho original da fonte
  const originalFontSize = 32;
  const scaledFontSize = originalFontSize * scaleFactor; // Aplica o fator de escala ao tamanho da fonte

  // Posições originais dos textos (em px)
  const originalPositionX = 200;
  const originalPositionY = 100;

  // Calculando as novas posições com o fator de escala
  const scaledPositionX = originalPositionX * scaleFactor;
  const scaledPositionY = originalPositionY * scaleFactor;
  return (
    <div className="relative w-60 h-80">
      {console.log(model)}
      <img src={model.image} className="absolute top-0" />
      <p
        className="absolute w-full text-center"
        style={{
          top: `${model.fontPosition.y}%`,
          fontSize: scaledFontSize,
        }}
      >
        {name}
      </p>
      <p>{hour}</p>
      <p>{adress}</p>
      <p>{date}</p>
    </div>
  );
};

export default Index;
