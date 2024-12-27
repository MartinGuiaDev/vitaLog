import Sidebar, { SidebarItem } from "../Sidebar";
import {
  LayoutDashboard,
  SquareUser,
  Users,
  NotebookPen,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginPage from "../../pages/LoginPage";

function Nav({ children }) {
  // const additionalContent = "Otro contenido aquí..."; // Define el contenido adicional
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <Sidebar additionalContent={children}>
          {/* Define el menú */}
          <>
            <Link to="/departments">
              <SidebarItem
                icon={<LayoutDashboard size={20} color="white"/>}
                text="Departamentos"
                text2="Departamentos"
              />
            </Link>
            <Link to="/workorders">
              <SidebarItem
                icon={<SquareUser size={20} color="white" />}
                text="Orden de trabajo"
                text2="O.T."
              />
            </Link>
            <Link to="/clients">
              <SidebarItem
                icon={<Users size={20} color="white" />}
                text="Clientes"
                text2="Cuentas locales"
              />
            </Link>
            <Link to="/createWorkOrder">
              <SidebarItem
                icon={<NotebookPen size={20} color="white" />}
                text="Crear Orden"
                text2="Crear orden"
              />
            </Link>
            <Link to="/production">
              <SidebarItem
                icon={<Settings size={20} color="white" />}
                text="Producción"
                text2="Producción"
              />
            </Link>
          </>
        </Sidebar>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </>
  );
}

export default Nav;
