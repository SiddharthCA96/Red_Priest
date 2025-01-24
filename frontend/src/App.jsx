import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Chat from "./pages/Chat";
import UpdateProfile from "./components/UpdateProfile";
import College from "./pages/College";
import Core from "./pages/Core";
import Attendance from "./pages/Attendance";
import DataBase from "./pages/DataBase";
import ToDO from "./pages/ToDO";


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
          <Route path="/dashboard/college" element={<College></College>}></Route>
          <Route path="/dashboard/college/core" element={<Core></Core>}></Route>
          <Route path="/dashboard/college/attendance" element={<Attendance></Attendance>}></Route>
          <Route path="/dashboard/college/database" element={<DataBase></DataBase>}></Route>
          <Route path="/dashboard/college/todo" element={<ToDO></ToDO>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
