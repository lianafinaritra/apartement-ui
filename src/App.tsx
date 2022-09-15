import React from 'react';
import './App.css';
import HomePage from "./pages/HomePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HistoryPage from "./pages/HistoryPage";
import AdminPage from "./pages/AdminPage";
import CategoryMock from "./mock/CategoryList.json";
import UserPage from "./pages/UserPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<HomePage/>}/>
                    <Route path={"/Login"} element={<AdminLoginPage/>}></Route>
                    <Route path={"/History"} element={<HistoryPage/>}></Route>
                    <Route path={"/Admin"} element={<AdminPage data={CategoryMock}/>}></Route>
                    <Route path={"/User"} element={<UserPage/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
