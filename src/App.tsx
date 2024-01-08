import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import HomePage from "./HomePage";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<NotFoundPage/>} />
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/calendar1" element={<CalendarPage1 />} /> */}
    </Routes>
  );
}

export default App
