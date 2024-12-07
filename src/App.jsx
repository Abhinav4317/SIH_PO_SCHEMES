import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserData } from "./context/UserContext";
import { LoadingBig } from "./components/Loading";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Landing from "./pages/Landing";
import Feedback from "./pages/Feedback";
import Schemes from "./pages/Schemes";
const App = () => {
  const { isAuth, loading } = UserData();
  return (
    <>
      {loading ? (
        <LoadingBig />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Landing />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/account" element={isAuth ? <Account /> : <Login />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/schemes" element={<Schemes />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
