import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalAction } from "../../redux/actions/loadingActions";
import { createTaskActionAsync } from "../../redux/actions/taskActions";
import store from "../../redux/store/store";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Modal = () => {
  const { modal } = useSelector((store) => store.modal);
  const { status } = useSelector((store) => store.task);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmitForm = (data) => {
    dispatch(createTaskActionAsync(data));
  };

  useEffect(() => {
    if (status === "success") {
      Toastify({
        text: "Producto agregado satisfactoriamente",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      dispatch(toggleModalAction());
      reset({ nameTask: "", descriptionTask: "" });
    } else if (status === "error") {
      Toastify({
        text: "Ups Ocurrió un Error al intentar procesar la solicitud",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right,#FF1B1B , #FFCB1B)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }, [status]);

  return (
    <>
      {modal ? (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <form
                      className="flex flex-col"
                      onSubmit={handleSubmit(handleSubmitForm)}
                    >
                      <h1>Crear una nueva tarea</h1>
                      <label className="flex flex-col gap-2">
                        Nombre de la tarea
                        <input
                          type="text"
                          placeholder="Ingrese el nombre"
                          {...register("nameTask", {
                            required: "El campo es requerido",
                          })}
                        />
                      </label>
                      {errors.nameTask && (
                        <span>{errors.nameTask.message}</span>
                      )}
                      <label className="flex flex-col">
                        Descripción
                        <input
                          type="textarea"
                          placeholder="Descripción de la tarea"
                          {...register("descriptionTask", {
                            required: "El campo es requerido",
                          })}
                        />
                      </label>
                      {errors.descriptionTask && (
                        <span>{errors.descriptionTask.message}</span>
                      )}
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      >
                        Confirmar
                      </button>
                    </form>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => dispatch(toggleModalAction())}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
