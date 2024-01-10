import { Route, Routes } from "react-router-dom"
import NotFoundPage from "./pages/404"
import { MainPage } from "./pages/Main"
import HomePage from "./pages/Home"
import { LoginPage } from "./pages/Login"
import { useAppSelector } from "./app/hooks"
import { getLogged } from "./features/auth/authSlice"

function App() {
  const isLogged = useAppSelector(getLogged)

  if (!isLogged) {
    return (
      <Routes>
        <Route path="/*" element={<LoginPage />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/*" element={<NotFoundPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  )
}

export default App
