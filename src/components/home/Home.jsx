import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import "./stylesHome.scss";
import { BsPencilSquare } from "react-icons/bs";
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskActionAsync,
  editTaskAction,
  getTaskActionAsync,
} from "../../redux/actions/taskActions";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { toggleModalAction } from "../../redux/actions/loadingActions";

const Home = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((store) => store.task);
  const { status } = useSelector((store) => store.task);

  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    dispatch(getTaskActionAsync());
  }, []);

  useEffect(() => {
    if (status === "success") {
      Toastify({
        text: "Operacion realizada satisfactoriamente",
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

      if (!isDeleted) {
        dispatch(toggleModalAction());
      }
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
  }, [status, isDeleted]);

  const handleEdit = (task) => {
    dispatch(editTaskAction(task));
    dispatch(toggleModalAction());
  };

  const handleDelete = (id) => {
    setIsDeleted(true);
    dispatch(deleteTaskActionAsync(id));
  };

  return (
    <section>
      <Modal />
      <section className="SecTasks">
        {tasks.map((task, index) => (
          <article className="Task" key={index}>
            <div className="Task__sec1">
              <h3>{task.nameTask}</h3>
              <p>{task.descriptionTask}</p>
            </div>
            <div className="Task__sec2">
              <button onClick={() => handleEdit(task)}>
                <BsPencilSquare className="Icon" />
              </button>
              <button onClick={() => handleDelete(task.id)}>
                <MdDeleteSweep className="Icon" />
              </button>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
};

export default Home;
