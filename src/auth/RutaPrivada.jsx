import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RutaPrivada({ children }) {
    const { autenticado } = useAuth();

    // Si NO está autenticado, lo redirige a /login
    if (!autenticado) {
        return <Navigate to="/login" replace />;
    }

    // Si SÍ está autenticado, muestra el componente hijo
    return children;
}