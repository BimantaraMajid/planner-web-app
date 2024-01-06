import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import NotFound from "./NotFoundPage";
import CalendarPage1 from "./CalendarPage1";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<NotFound/>} />
      <Route path="/" element={<HomePage />} />
      <Route path="/calendar1" element={<CalendarPage1 />} />
    </Routes>
  );
}

export default App
