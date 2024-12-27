import * as images from "../img";
import { useWorkOrder } from "../context/WorkOrderContext";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Printer, UserRoundPen, Trash2 } from "lucide-react";

function WorkOrder() {
  const { getWorkOrderById } = useWorkOrder();
  const params = useParams();
  // const [dataWorkOrder, setDataWorkOrder] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();

  const [tires, setTires] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Mostrar 10 elementos por página

  useEffect(() => {
    async function loadWorkOrder() {
      try {
        if (params.id) {
          const workOrder = await getWorkOrderById(params.id);
          if (workOrder) {
            setName(workOrder.createdBy.name);
            setLastName(workOrder.createdBy.lastName);
            setTires(workOrder.tires);
            // setDataWorkOrder(getWorkOrderById(workOrder.data));
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadWorkOrder();
  }, []);

   const { getWorkOrders, workOrders } = useWorkOrder();

  // Llamar a getClients una sola vez
  useEffect(() => {
    getWorkOrders();
  }, []);

  // Validar datos y calcular total de páginas
  const totalPages = Math.ceil(tires.length / itemsPerPage);

  // Obtener los datos de la página actual
  const currentOrders = tires.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (tires.length === 0) <h1>No hay Ordenes de trabajo</h1>;
  return (
    // <>
    //   <div>Hola</div>
    // </>
    <>
      <div className="px-4 pt-4 lg:px-14 max-w-screen-2xl mx-auto">
        <header className="w-full mt-3 flex justify-center">
          <div className=" w-[95%] p-2 flex justify-between bg-slate-200 border-l-8 border-black rounded-md">
            <section className="ml-2">
              <h1 className="font-bold text-xl">
                Número de orden de trabajo #
              </h1>
              <p className="font-medium">VITA-BAJIO S.A de C.V</p>
              <p className="font-medium text-sm">VITA-BAJIO S.A de C.V</p>
            </section>
            <section className="flex justify-end mr-2">
              <img src={images.logoVB} className="w-[45%]" alt="" />
            </section>
          </div>
        </header>
        <main className="">
        <section className="mt-4 flex justify-center">
            <div className="flex justify-between w-[95%]">
              <article className="w-[33.3%] text-sm">
                <div className="flex">
                  <p className="">Cuenta: </p>
                  <p className="font-bold ml-2">VITA-BAJIO</p>
                </div>
                <div className="mt-2">
                  <p className="flex">
                    Ubicación:
                    <span className="font-bold ml-2">Salamanca () (L)</span>
                  </p>
                  <p className="font-bold">
                    Hidalgo 1500 San Juan de La Presa, Salamanca
                  </p>
                  <p className="font-bold">Salamanca 36770</p>
                </div>
                <p className="flex mt-2">
                  Recolector:
                  <span className="font-bold ml-2">
                    {name} {lastName}
                  </span>
                </p>
              </article>
              <article className="w-[33.3%] text-sm">
                <p className="mt-2">Fecha de recolección:</p>
                <p className="mt-2">Fecha de solicitud de entrega:</p>
                <p className="mt-2">Ref #:</p>
              </article>
              <article className="w-[33.3%] text-sm">
                <p className="flex">
                  Desecho dejado en la ubicación:{" "}
                  <span className="font-bold ml-2">Sí</span>
                </p>
              </article>
            </div>
          </section>
        <section>
        <div className="p-4 w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm text-left">
                <th className="py-3 px-6">Línea</th>
                      <th className="py-3 px-6">Código de Ítem</th>
                      <th className="py-3 px-6">Medida de Casco</th>
                      <th className="py-3 px-6">Marca</th>
                      <th className="py-3 px-6">Diseño de Casco</th>
                      <th className="py-3 px-6">Banda Requerida</th>
                      <th className="py-3 px-6">DOT</th>
                      <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="">
                {currentOrders.map((tire, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200"
                  >
                    <td className="py-3 px-6">{tire.linea}</td>
                        <td className="py-3 px-6">{tire.itemCode}</td>
                        <td className="py-3 px-6">{tire.helmetMeasurement}</td>
                        <td className="py-3 px-6">{tire.brand}</td>
                        <td className="py-3 px-6">{tire.helmetDesign}</td>
                        <td className="py-3 px-6">{tire.requiredBand}</td>
                        <td className="py-3 px-6">{tire.antiquityDot}</td>                     
                    <td className="sm:flex py-2 px-3 justify-between">
                      <Link
                      to={`/tire/${tire._id}`}
                      >
                        <button className="text-blue-600 hover:text-blue-800 ">
                          <UserRoundPen />
                        </button>
                      </Link>
                      <button className="text-red-600 hover:text-red-800 ">
                        <Trash2 />
                      </button>
                      <button className="hover:text-slate-500">
                      <Printer />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Mostrar paginación solo si hay 10 o más usuarios */}
            {workOrders.length >= 10 && (
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
        </div>
      </section>
        </main>
      </div>
    </>
  );
}

export default WorkOrder;
