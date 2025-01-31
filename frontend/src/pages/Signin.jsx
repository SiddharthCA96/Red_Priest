import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../components/login/BottomWarning"
import { Button } from "../components/login/Button"
import { Heading } from "../components/login/Heading"
import { InputBox } from "../components/login/InputBox"
import { SubHeading } from "../components/login/SubHeading"
import axios from "axios"
import { useState } from "react"
import { SIGN_IN } from "../utils/constants"



export const Signin = () => {

    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    return <div className="bg-gray-800 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-red-700 w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="sid@gmail.com" label={"Email"} onChange={(e)=>{
            setUsername(e.target.value);
        }} />
        <InputBox placeholder="123456" label={"Password"}    onChange={(e) => {
              setPassword(e.target.value);
            }} />
        <div className="pt-4">
          <Button onClick={async()=>{
            //now find the user and match the password and email
            try{
                const response=await axios.post(SIGN_IN,{
                    username,
                    password,
                })
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }catch (error) {
                console.error(
                  "Signin error:",
                  error.response?.data || error.message
                );
                 alert("Signin failed. Error: " + (error.response?.data?.error || error.message));
              }
          }} label={"Sign in"} />
          
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/"} />
      </div>
    </div>
  </div>
}
