import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import NotFound from "./NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<NotFound/>} />
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
}

export default App
