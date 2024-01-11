import { Route, Routes } from "react-router-dom"
import NotFoundPage from "./pages/404"
import { MainPage } from "./pages/Main"
import HomePage from "./pages/Home"
import { LoginPage } from "./pages/Login"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { checkToken, getLogged } from "./features/auth/authSlice"
import { useEffect } from "react"

function App() {
  const isLogged = useAppSelector(getLogged)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkToken())
  }, [dispatch])

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
