import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Chat from "./pages/Chat";
import UpdateProfile from "./components/UpdateProfile";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/dashboard/chat" element={<Chat></Chat>}></Route>
          <Route path="/dashboard/updateprofile" element={<UpdateProfile></UpdateProfile>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
