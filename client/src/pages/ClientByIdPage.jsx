import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import InputField from "../components/ui/InputField";
import { useForm } from "react-hook-form";
import { StepBack } from "lucide-react";
import { useClient } from "../context/ClientContext";

function ClientByIdPage() {
  const params = useParams();
  const navigate = useNavigate();
    const { getClient, updateClient, errors: registerClientErrors } = useClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function loadClient() {
      if (params.id) {
        const clientById = await getClient(params.id);
        if (clientById) {
          reset({
            name: clientById.name,
            alias: clientById.alias,
            address1: clientById.address1,
            city: clientById.city,
            region: clientById.region,
            zipCode: clientById.zipCode,
            country: clientById.country,
            // lastName: userById.lastName,
            // userName: userById.userName,
            // department: userById.department,
          });
        }
      }
    }
    loadClient();
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    try {
      await updateClient(params.id, updatedValues);
      navigate("/clients");
      alert("Cliente actualizado exitosamente");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el usuario");
    }
  });

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div>
          <Link to="/clients">
            <button className="bg-cyan-950 rounded-md px-4 py-1 duration-500 hover:bg-cyan-800 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
        </div>
        <div>
          <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Editar cuenta local
          </h1>
          <div className="flex top-10 absolute w-[100%]">
            {registerClientErrors.map((error, i) => (
              <div
                className="bg-red-500 py-2 text-white w-[100%] flex justify-center"
                key={i}
              >
                {error}
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <div className="mt-10">
              <div className="flex mb-3">
                <h1 className="text-lg flex text-sky-900 font-semibold w-[50%] md:text-3xl md:w-[70%] lg:w-[25%] ">
                  Nombre y Dirección
                </h1>
                <div className="flex items-center w-[100%]">
                  <hr className="border-[1px] w-[100%] border-sky-800 mt-1" />
                </div>
              </div>
              <h1 className="font-bold text-3xl">Nombres</h1>
              <p>
                Complete el nombre de la cuenta y establezca el segmento y el
                número de cliente del renovador.
              </p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative md:w-5/12 w-auto">
                  <InputField
                    // label="Nombre"
                    // id="nombre"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <InputField
                    // label="Alias"
                    // id="alias"
                    {...register("alias", { required: true })}
                  />
                  {errors.alias && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
              </div>
              {/* <div className="flex items-center flex-col mt-5 sm:w-auto sm:flex-row sm:justify-between">
            <div className="relative md:w-5/12 w-auto">
              <InputField label="Segmento" id="segmento" />
            </div>
            <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
              <InputField label="N.° de clte renovador" id="numerocliente" />
            </div>
          </div> */}
            </div>
          </div>
          <div>
            <div className="mt-10">
              <h1 className="font-bold text-3xl">Dirección</h1>
              <p>
                Complete la dirección de la cuenta. Puedes utilizar la función
                de búsqueda. Esta dirección se mostrará en todas partes en el
                sistema al seleccionar la cuenta.
              </p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-auto sm:w-5/12">
                  <InputField
                    // label="Dirección 1"
                    // id="dirección1"
                    {...register("address1", { required: true })}
                  />
                  {errors.address1 && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="flex-col flex items-center sm:flex sm:w-[50%] sm:flex-row justify-between">
                  <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                    <InputField
                      // label="Ciudad"
                      // id="Ciudad"
                      {...register("city", { required: true })}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs">
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                  <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                    <InputField
                      // label="Región"
                      // id="Region"
                      {...register("region", { required: true })}
                    />
                    {errors.region && (
                      <p className="text-red-500 text-xs">
                        Este campo es opcional
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between mt-5">
                <div className="flex-col flex items-center sm:flex sm:w-[50%] sm:flex-row justify-between">
                  <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                    <InputField
                      // label="Codigo Postal"
                      // id="CodigoPostal"
                      {...register("zipCode", { required: true })}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-xs">
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                  <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                    <InputField
                      // label="País"
                      // id="País"
                      {...register("country", { required: true })}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-xs">
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-14">
            <button
              className=" text-white font-medium bg-cyan-950 py-2 px-5 rounded-md shadow-md hover:bg-cyan-800 duration-500 hover:duration-500 "
              type="submit"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ClientByIdPage;
