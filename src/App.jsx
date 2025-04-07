import { useState } from "react";
import logo from '../src/assets/logo.png'
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <div className=" h-full flex items-center justify-center">
    <div>
      <img src={logo} className="h-40" />
      <form>
      </form>
    </div>
  </div>;
}

export default App;
