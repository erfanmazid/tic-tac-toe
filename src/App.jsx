import { Route, Routes } from "react-router-dom";
import Boxs from "./components/bord/Boxs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Boxs />} />
    </Routes>
  );
}

export default App;
