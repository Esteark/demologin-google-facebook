import React, { useEffect } from "react";
import Modal from "../modal/Modal";
import "./stylesHome.scss";
import { BsPencilSquare } from "react-icons/bs";
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getTaskActionAsync } from "../../redux/actions/taskActions";
import store from "../../redux/store/store";

const Home = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((store) => store.task);

  useEffect(() => {
    dispatch(getTaskActionAsync());
  }, []);

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
              <button>
                <BsPencilSquare className="Icon" />
              </button>
              <button>
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
