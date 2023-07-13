import React from 'react';
import { useSelector } from 'react-redux';

const AssignTask = () => {
  // console.log('employee', employee);
  // @ts-ignore
  const currentEmp = useSelector((state) => state.employee.currentEmployeeData);
  console.log('currentEmp data value  ', currentEmp);

  return (
    <div>
      <div>
        <button>hello</button>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Assign Task
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Employee Id
            </label>
            <input
              type="text"
              placeholder="Employee ID"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Employee
            </label>
            <input
              type="text"
              placeholder={`${currentEmp.fname}`}
              defaultValue={`${currentEmp.fname}`}
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
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Task Description
            </label>
            <textarea
              placeholder="Description"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTask;
