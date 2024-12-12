import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserData } from "./context/UserContext";
import { LoadingBig } from "./components/Loading";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Landing from "./pages/Landing";
import Feedback from "./pages/Feedback";
import Schemes from "./pages/Schemes";
import HelpCenter from "./pages/HelpCenter";
import { AdminData } from "./context/AdminContext";
import PersonalisedSchemeRecommender from "./pages/PersonalisedSchemeRecommender";
import Farmer from "./pages/Farmer";
const App = () => {
  const { isAuth, loading } = UserData();
  const { admin, isAuth: isAdminAuth } = AdminData();
  return (
    <>
      {loading ? (
        <LoadingBig />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={isAuth || isAdminAuth ? <Home /> : <Landing />}
            />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/account" element={isAuth ? <Account /> : <Login />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route
              path="/psr"
              element={isAuth ? <PersonalisedSchemeRecommender /> : <Login />}
            />
            <Route path="/farmer" element={isAuth ? <Farmer /> : <Login />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
