import { deleteDoc, doc } from 'firebase/firestore';
// import React from 'react';
import { db } from '../../firebase';
import EditTask from './EditTask';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function TaskItem({ task }: any) {
  let navigate = useNavigate();
  console.log('task', task);

  // console.log("key", task.task.id);
  // console.log("task in taksItem", task.task);
  // const borderColor = task.status === "New" ? "border-primary" : "";
  // const handleaAdd = () => {
  //   navigate('/newtask');
  // };
  const taskDelete = async (id: any) => {
    // e.preventDeafult();
    try {
      window.confirm('Are you sure  ?');
      console.log('Each task id :', id);
      const data = doc(db, 'selfTask', id);
      await deleteDoc(data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Task Deleted',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.log('Erorr from Delete task : ', error);
    }
  };
  return (
    <div>
      <div className="border-gray-200 dark:bg-gray-800 h-60  rounded-lg  border p-6  shadow  dark:border-strokedark dark:bg-boxdark">
        <p className="text-gray-700 dark:text-gray-400 mb-3 text-right font-normal">
          {task.deadline}
        </p>
        <a href="#">
          <h5 className="text-gray-900 mb-2 text-xl font-bold tracking-tight ">
            {task.title}
          </h5>
        </a>
        <p className="text-gray-700 dark:text-gray-400 mb-3  font-normal">
          {task.Description}
        </p>

        <div className="m-auto mt-8 flex items-center gap-10 text-center">
          {' '}
          <button
            className="inline-flex items-center justify-center rounded-full bg-meta-3 py-2 px-7 text-center font-medium text-white hover:bg-opacity-90 "
            onClick={() => {
              taskDelete(task.id);
            }}
          >
            Delete
          </button>
          <EditTask data={task} />
        </div>
      </div>
    </div>

    // <div className="card col-3 m-1 border p-0 " style={{ width: '140%' }}>
    //   <div
    //     className="card-body"
    //     style={{
    //       height: '100%',
    //       display: 'flex',
    //       flexDirection: 'column',
    //       justifyContent: 'space-between',
    //       boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    //     }}
    //   >
    //     <div className="">
    //       <div className="row">
    //         <div className="col">
    //           <h5 className="card-title">{task.task.title}</h5>
    //         </div>
    //         <div className="col text-right">
    //           <small>
    //             {new Date(task.task.Date).toISOString().split('T')[0]}
    //           </small>
    //         </div>
    //       </div>

    //       <p
    //         className="card-text p-10 "
    //         style={{
    //           display: 'flex',
    //         }}
    //       >
    //         {task.task.Description}
    //       </p>
    //     </div>
    //     <div
    //       className="row"
    //       style={{
    //         gap: '10px',
    //         padding: '10px 10px',
    //       }}
    //     >
    //       <button
    //         href="/"
    //         onClick={() => {
    //           taskDelete(task.task.id);
    //         }}
    //         type="submit"
    //         className="btn btn-danger card-link"
    //       >
    //         Delete
    //       </button>
    //       {console.log('task.task', task.task)}
    //       {/* <button> */}
    //       <EditTask task={task.task} />
    //     </div>
    //   </div>
    // </div>
  );
}

export default TaskItem;

// import React from 'react';

// const TaskItem = () => {
//   return <div></div>;
// };

// export default TaskItem;
