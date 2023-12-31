// import BrandOne from '../images/brand/brand-01.svg';
// import BrandTwo from '../images/brand/brand-02.svg';
// import BrandThree from '../images/brand/brand-03.svg';
// import BrandFour from '../images/brand/brand-04.svg';
import { collection, getDocs } from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';

// import { firestore } from './firebaseConfig';

import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';

const AssignedList = () => {
  const currentDate = new Date()
    .toISOString()
    .split('T')[0]
    .split('-')
    .reverse()
    .join('-');
  // let navigate = useNavigate();
  const [data, setData] = useState([] as any);
  // @ts-ignore
  // const list = [];
  const [user, setUser] = useState('');
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated, allow access to the rout
        // console.log('user', user.uid);
        setUser(user.uid);
        console.log('assigned list ', user.uid);
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
      const querySnapshot = await getDocs(collection(db, 'assignedTask'));
      querySnapshot.forEach((doc) => {
        const taskData = doc.data();
        const id = doc.id;
        list.push({ ...taskData, id });
        // list.push(taskData);

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
  useEffect(() => {
    fetchData();
  }, []);

  // @ts-ignore
  const taskDelete = async (id) => {
    // e.preventDafault();
    try {
      window.confirm('Are you sure  ?');
      console.log('Each task id :', id);
      const data = doc(db, 'assignedTask', id);
      await deleteDoc(data);
      window.location.reload();
    } catch (error) {
      console.log('Erorr from Delete task : ', error);
    }
  };

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
        <div className="grid w-[100%] rounded-sm bg-gray-2  dark:bg-meta-4 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6">
          <div className=" p-1  xl:p-5">
            <span className="text-lg   ">Employee Name</span>
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
          <div className="hidden  p-1 text-center sm:block xl:p-5">
            <span className="uppercasee text-lg font-medium">Delete Task</span>
          </div>
        </div>

        {data.map((item: any, index: any) => (
          <div className="border-b border-stroke dark:border-strokedark ">
            {/* {console.log('item value ', item)} */}
            <div className=" grid grid-cols-6 items-center    p-1 xl:p-3">
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
                {item.status === true ? (
                  <span className="inline-flex items-center justify-center rounded-full bg-meta-3 py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Done
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center rounded-full bg-[#F31559]  py-2 px-5 text-center font-medium text-white hover:bg-opacity-90">
                    Not Done
                  </span>
                )}
              </div>
              <button
                className="mx-auto inline-flex w-[70%] items-center justify-center rounded-full  bg-meta-3 py-2 text-center font-medium text-white hover:bg-opacity-90"
                onClick={() => {
                  taskDelete(item.id);
                }}
              >
                Delete
              </button>

              {/* <AssignTask employee={item} /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedList;
