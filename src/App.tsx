import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import HomePage from "./HomePage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./reducers";
import { login } from "./actions/authActions";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogin = () => {
    dispatch(login('test', 'test1234'));
    console.log("login");
  };

  return (
    <Routes>
      <Route path="/*" element={<NotFoundPage />} />
      {isAuthenticated ? (
        <Route path="/" element={<HomePage />} />
      ) : (
        <Route path="/login" element={<button onClick={handleLogin}>Login</button>} />
        
      )}
    </Routes>
  );
}

export default App;
