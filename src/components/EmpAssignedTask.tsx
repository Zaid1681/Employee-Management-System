import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from 'firebase/firestore';

import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import TaskStatus from './TaskStatus';

const EmpAssignedTask = () => {
  // let navigate = useNavigate();
  const [data, setData] = useState([] as any);
  const [docId, setDocId] = useState('' as any);
  const [status, setStatus] = useState(false);
  const currentDate = new Date()
    .toISOString()
    .split('T')[0]
    .split('-')
    .reverse()
    .join('-');

  // @ts-ignore
  // const list = [];
  const [user, setUser] = useState('');
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated, allow access to the rout
        // console.log('user', user.uid);
        setUser(user.uid);
        // console.log('assigned list ', user.uid);
      } else {
        console.log('no user');
        // User is not authenticated, redirect to login or another route
      }
    });
    unsubscribe();
  }, []);

  // useEffect(() => {
  const fetchData = async () => {
    let list = [] as any;
    try {
      const q = query(collection(db, 'assignedTask'), where('tid', '==', user));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const taskData = doc.data();
        const id = doc.id;
        list.push({ ...taskData, id });
        setDocId(doc.id);
        // console.log('doc id', doc.data());

        // data.push({ id: doc.id, ...taskData });
        // console.log(taskData);

        setData(list);
        // data.push(doc.dat);
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(list);
  };

  //   task completed or not
  //   @ts-ignore

  useEffect(() => {
    fetchData();
  }, [user]);

  //   useEffect(() => {
  //     // @ts-ignore
  //     const taskComplete = async () => {
  //       await setDoc(doc(db, 'assignedTask', docId), {
  //         status: status,
  //         ...data,
  //       });
  //     };
  //     taskComplete();
  //   }, []);

  // }, [list]);

  // console.log('data assined', data);

  //   console.log(data.map((item: any) => item));
  // console.log(data[2].role);

  //   console.log('status', status);
  //   console.log('data', data);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-1 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between">
        {' '}
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Assined Task
        </h4>
        <h4 className="mb-6 pr-16 text-xl font-semibold text-black dark:text-white">
          <span className="text-[#d3d3d3ab]">Today- </span>
          {currentDate}
        </h4>
      </div>

      <div className="flex flex-col text-center">
        <div className="grid w-[100%] rounded-sm bg-gray-2  dark:bg-meta-4 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
          <div className=" p-1  xl:p-5">
            <span className="text-lg">Employee Name</span>
          </div>
          <div className=" p-1 text-center xl:p-5">
            <span className="uppercasee text-center text-lg font-medium">
              Title
            </span>
          </div>
          <div className="  p-1   text-center xl:p-5">
            <span className="uppercasee text-center text-lg font-medium ">
              Description
            </span>
          </div>
          <div className="  p-1   text-center xl:p-5">
            <span className="uppercasee text-center text-lg font-medium ">
              Deadline
            </span>
          </div>

          <div className="hidden  p-1 text-center sm:block xl:p-5">
            <span className="uppercasee text-lg font-medium">Status</span>
          </div>
        </div>

        {data.map((item: any, index: any) => (
          <div className="border-b border-stroke dark:border-strokedark ">
            {/* {console.log(item.id)}; */}
            <div className=" grid grid-cols-5 items-center    p-1 xl:p-3">
              <div className="flex items-center justify-center p-1 xl:p-5">
                <p className="text-lg text-black dark:text-white">
                  {item.name}
                </p>
              </div>
              <div className="flex items-center justify-center p-1 text-lg xl:p-5">
                <p className="text-black dark:text-white">{item.title}</p>
              </div>
              <div className="text-md flex items-center justify-center p-1 xl:p-5">
                <p className="text-black dark:text-white">{item.des}</p>
              </div>
              <div className="text-md flex items-center justify-center p-1 xl:p-5">
                <p className="text-black dark:text-white">{item.deadline}</p>
              </div>
              <div className="text-md flex items-center justify-center p-1 xl:p-5">
                {/* {item.status == true ? (
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-meta-3 py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    onClick={() => {
                      //
                      status == false ? setStatus(true) : setStatus(false);
                    }}
                  >
                    Task Done
                  </button>
                ) : (
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-meta-3 py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    onClick={() => {
                      status == false ? setStatus(true) : setStatus(false);
                    }}
                  >
                    Not Done
                  </button>
                )} */}
                <TaskStatus data={item} />
              </div>

              {/* <AssignTask employee={item} /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmpAssignedTask;
