import { useEffect, useState } from "react";

export default function CountdownTimer({ initialSeconds = 120, onResend }) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;

    if (secondsLeft > 0) {
      timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    } else {
      setCanResend(true);
    }

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleResend = () => {
    setSecondsLeft(initialSeconds);
    setCanResend(false);
    if (onResend) onResend(); // dispara o reenvio do código
  };

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${m}:${ss}`;
  };

  return (
    <div className="text-center mt-4 text-sm text-gray-600">
      {canResend ? (
        <button
          className="text-principal font-medium hover:underline cursor-pointer"
          onClick={handleResend}
        >
          Reenviar código
        </button>
      ) : (
        <p>Reenviar em <span className="font-semibold">{formatTime(secondsLeft)}</span></p>
      )}
    </div>
  );
}