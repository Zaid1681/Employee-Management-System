import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { WindowSharp } from '@mui/icons-material';

function CreateTask() {
  const [user, setUser] = useState('');
  const [date, setDate] = useState();
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const navigate = useNavigate();

  // getting current user id
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated, allow access to the rout
        console.log('user', user.uid);
        setUser(user.uid);
      } else {
        console.log('no user');
        // User is not authenticated, redirect to login or another route
      }
    });
    unsubscribe();
  }, []);

  const currentDate = new Date().toISOString().split('T')[0];
  // @ts-ignore
  const handleDateChange = (e) => {
    const reversedDate = e.target.value.split('-').reverse().join('-');
    setDate(reversedDate);
  };
  // @ts-ignore
  const insertTask = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const docRef = await addDoc(collection(db, 'selfTask'), {
          title: title,
          Description: des,
          deadline: date,
          userID: user,
        });
        console.log('Document written with ID: ', docRef.id);
        console.log('data added sucessfull');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Task Created',
        showConfirmButton: false,
        timer: 1500,
      });
      // @ts-ignore
      setDate();
      setTitle('');
      setDes('');
      setTimeout(() => {
        navigate('/create');
      }, 1000);
    } else {
      setTimeout(() => {
        Swal.fire({
          title: '<strong>No user found</strong>',
          icon: 'info',
          html: 'PLease login first',
          showCloseButton: true,
        });
        navigate('/auth');
      }, 2000);
      // window.location.reload();
    }
  };
  // Get the current date

  return (
    <div className="col-sm-8 container mt-4">
      <h4 className="mb-4">Add/Edit Task</h4>
      <form action="/" onSubmit={insertTask}>
        {/* <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            type="text"
            className="form-control"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            id="description"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            value={selectedDate}
            onChange={handleDateChange}
            aria-describedby="emailHelp"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button> */}
        <div className="mx-auto w-[80%] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Create Task
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-xl text-black dark:text-white">
                Title
              </label>
              <input
                type="text"
                required
                placeholder="Title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-xl text-black dark:text-white">
                Description
              </label>
              <textarea
                placeholder="Description"
                required
                id="description"
                value={des}
                onChange={(e) => setDes(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-10 md:flex-row ">
              <div className="w-full">
                <label className="mb-3 block text-black dark:text-white">
                  From
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    defaultValue={currentDate}
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="mb-3 block text-black dark:text-white">
                  To
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    // @ts-ignore
                    onChange={handleDateChange}
                  />
                </div>
              </div>
            </div>
            <div className="mx-auto p-2">
              {' '}
              <button
                // to="#"
                type="submit"
                className="text-md inline-flex items-center justify-center rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
