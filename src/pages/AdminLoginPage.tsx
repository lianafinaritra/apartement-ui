import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {connect, save} from "../util/connect";

const AdminLoginPage: React.FC<any> = (redirection) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    return (
        <div className="w-screen h-screen flex justify-center items-center
    bg-gradient-to-br from-gray-400 to-yellow-50">
            <form className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5" action="">
                <h1 className="text-center text-3xl">Connexion</h1>
                <div className="flex flex-col space-y-2">
                    <label className="text-left font-light" htmlFor="username">Username</label>
                    <input className="w-96 px-3 py-2 rounded-md border border-slate-400" type="text"
                           placeholder="Your Username"
                           name="username" id="username" value={username} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-left font-light" htmlFor="password">Password</label>
                    <input className="w-96 px-3 py-2 rounded-md border border-slate-400" type="password"
                           placeholder="Your Password" name="password" id="password" value={password}
                           onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                </div>

                <button className="w-full px-10 py-2 bg-blue-600 text-white rounded-md
            hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in" type="submit"
                        onClick={() => {
                            navigate("/History")}}>
                    Se connecter
                </button>

                <p className="text-right"><a className="text-blue-600 text-sm font-light hover:underline"
                                             href="https://www.kindacode.com">Forget Password?</a></p>
            </form>
        </div>
    )
}

export default AdminLoginPage;