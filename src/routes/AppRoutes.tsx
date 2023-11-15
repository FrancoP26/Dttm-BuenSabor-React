import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import RubrosInsumos from "../pages/RubrosInsumos";

const AppRoutes: React.FC = () => {

    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/RubroInsumo" element={<PrivateRoute element={<RubrosInsumos />} />}/>
            <Route path="/login" element={<Login/>}/>

        </Routes>
    )

}

export default AppRoutes;