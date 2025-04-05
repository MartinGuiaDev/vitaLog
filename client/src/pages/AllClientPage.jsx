import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useClient } from "../context/ClientContext";
import Alert from "../components/ui/Alert"; // Importa tu componente de alerta
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "@heroui/react";

function AllClientPage() {
  const { getClients, allClients, deleteClient } = useClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [confirmationName, setConfirmationName] = useState("");
  const itemsPerPage = 10; // Mostrar 10 elementos por página

  // Llamar a getClients una sola vez
  useEffect(() => {
    getClients();
  }, []);

  // Validar datos y calcular total de páginas
  const totalPages = Math.ceil(allClients.length / itemsPerPage);

  // Obtener los datos de la página actual
  const currentOrders = allClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 1000);
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (confirmationName === clientToDelete.alias) {
      try {
        await deleteClient(clientToDelete._id);
        showAlert("Cliente eliminado exitosamente", "success");
        getClients(); // Refresca la lista de clientes
      } catch (error) {
        console.error(error);
        showAlert("Error al eliminar el cliente. Intenta nuevamente.", "error");
      }
      setIsModalOpen(false);
      setClientToDelete(null);
      setConfirmationName("");
    } else {
      showAlert("El nombre no coincide. Cliente no eliminado.", "error");
    }
  };

  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
      <div className="text-center my-8">
        <h2 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
          Cuentas Locales
        </h2>
        {/* Alerta */}
        {alert && <Alert message={alert.message} type={alert.type} />}
      </div>

      <div className="flex justify-end">
        <Link to="/add-client">
          <button className="flex items-center justify-center p-2 md:pd-3 bg-buttonSecondary rounded-lg text-white cursor-pointer hover:bg-buttonSecondaryHover transition shadow-md">
            <CirclePlus className="mr-2 size-5 sm:size-6" />
            Añadir nuevo
          </button>
        </Link>
      </div>

      <section>
        <div className="p-4 w-full">
          {allClients.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">
              No hay clientes registrados
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-xs text-left">
                    <th className="py-2 px-6">Nombre de Cuenta</th>
                    <th className="px-6">Cuenta (Nombre corto)</th>
                    <th className="px-6">Dirección</th>
                    <th className="px-6">Ciudad</th>
                    <th className="px-6">Region</th>
                    <th className="px-6">Codigo Postal</th>
                    <th className="px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((client, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 text-xs"
                    >
                      <td className="px-6">{client.name}</td>
                      <td className="px-6">{client.alias}</td>
                      <td className="px-6">{client.address1}</td>
                      <td className="px-6">{client.city}</td>
                      <td className="px-6">{client.region}</td>
                      <td className="px-6">{client.zipCode}</td>
                      <td className="py-2">
                        <Dropdown>
                          <DropdownTrigger className="shadow">
                            <Button variant="bordered">Abrir Menú</Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Acciones del Cliente">
                            <DropdownItem key="edit">
                              <Link
                                to={`/client/${client._id}`}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                              >
                                {/* <UserRoundPen /> */}
                                Editar cliente
                              </Link>
                            </DropdownItem>
                            <DropdownItem
                              key="delete"
                              className="text-danger flex items-center gap-2"
                              color="danger"
                              onClick={() => handleDeleteClick(client)}
                            >
                              {/* <Trash2 /> */}
                              Eliminar cliente
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {allClients.length >= 10 && (
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-600">
                    Página {currentPage} de {totalPages}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === 1
                          ? "text-gray-400 border-gray-200"
                          : "text-blue-600 border-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 rounded-lg border ${
                          currentPage === i + 1
                            ? "bg-blue-600 text-white"
                            : "text-blue-600 border-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === totalPages
                          ? "text-gray-400 border-gray-200"
                          : "text-blue-600 border-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              Confirmar eliminación del cliente
            </h3>
            <p>
              Escribe el nombre del cliente{" "}
              <strong>{clientToDelete.alias}</strong> para confirmar:
            </p>
            <Input
              label="Nombre de cliente"
              type="text"
              variant={"underlined"}
              value={confirmationName}
              onChange={(e) => setConfirmationName(e.target.value)}
            />
            {/* <input
              type="text"
              value={confirmationName}
              onChange={(e) => setConfirmationName(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 mt-2 w-full"
            /> */}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setConfirmationName("");
                }}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllClientPage;
