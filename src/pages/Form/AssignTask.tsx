import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

const AssignTask = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  // console.log('employee', employee);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [date, setDate] = useState();

  // @ts-ignore
  const currentEmp = useSelector((state) => state.employee.currentEmployeeData);
  console.log('currentEmp data value  ', currentEmp);

  useEffect(() => {
    setId(currentEmp?.id);
    setName(currentEmp?.fname);
  }, [currentEmp]);
  // @ts-ignore
  const assignTask = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'assignedTask'), {
        tid: id,
        name: name,
        title: title,
        des: des,
        deadline: date,
        status: false,
        timeStamp: serverTimestamp(),
      });
      // @ts-ignore
      currentEmp && docRef;
      console.log('task created');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'task created 🤩',
        showConfirmButton: false,
        timer: 1500,
      });
      setTitle('');
      setDes('');
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! 😥',
        footer: '<a href="">something went wrong</a>',
      });
    }
    // console.log(id, title, des, name);
  };
  // --- handling date change
  // @ts-ignore
  const handleDateChange = (e) => {
    const reversedDate = e.target.value.split('-').reverse().join('-');
    setDate(reversedDate);
  };

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Assign Task
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Employee ID
            </label>
            <input
              type="text"
              placeholder="Employee ID"
              defaultValue={currentEmp?.id}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Employee Name
            </label>
            <input
              type="text"
              placeholder={`${currentEmp?.fname}`}
              defaultValue={`${currentEmp?.fname} `}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Task Title
            </label>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Task Description
            </label>
            <textarea
              placeholder="Description"
              onChange={(e) => {
                setDes(e.target.value);
              }}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div className="flex gap-10 ">
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
                  className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  // @ts-ignore
                  onChange={handleDateChange}
                />
              </div>
            </div>
          </div>
          <div>
            {' '}
            <Link
              to="#"
              onClick={assignTask}
              className=" inline-flex items-center justify-center rounded-md border border-meta-3 py-4 px-10 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Assign Task
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTask;
