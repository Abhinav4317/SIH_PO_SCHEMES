import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserData } from "./context/UserContext";
import { LoadingBig } from "./components/Loading";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Account from "./pages/Account";
const App = () => {
  const { isAuth, loading } = UserData();
  return (
    <>
      {loading ? (
        <LoadingBig />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route path="/account" element={isAuth ? <Account /> : <Login />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
