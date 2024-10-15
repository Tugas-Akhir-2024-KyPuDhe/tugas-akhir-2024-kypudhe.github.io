import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tes" element={<TesPage />} />
      </Routes>
    </>
  );
}

export default App;

export const TesPage = () => {
  return (
    <div>App</div>
  )
}
