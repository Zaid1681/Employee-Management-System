// import BrandOne from '../images/brand/brand-01.svg';
// import BrandTwo from '../images/brand/brand-02.svg';
// import BrandThree from '../images/brand/brand-03.svg';
// import BrandFour from '../images/brand/brand-04.svg';
import { collection, getDocs } from 'firebase/firestore';
// import { firestore } from './firebaseConfig';

import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

const AssignedList = () => {
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
        list.push(taskData);

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

  // }, [list]);

  // console.log('data assined', data);

  console.log(data.map((item: any) => item));
  // console.log(data[2].role);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-1 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Assined Task
      </h4>

      <div className="flex flex-col text-center">
        <div className="grid w-[100%] rounded-sm bg-gray-2  dark:bg-meta-4 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-4">
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

          <div className="hidden  p-1 text-center sm:block xl:p-5">
            <span className="uppercasee text-lg font-medium">Status</span>
          </div>
        </div>

        {data.map((item: any, index: any) => (
          <div className="border-b border-stroke dark:border-strokedark ">
            <div className=" grid grid-cols-4 items-center    p-1 xl:p-3">
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
                {item.status === 'true' ? (
                  <button className="inline-flex items-center justify-center rounded-full bg-meta-3 py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Dene
                  </button>
                ) : (
                  <button className="inline-flex items-center justify-center rounded-full bg-meta-3 py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    NotDone
                  </button>
                )}
              </div>

              {/* <AssignTask employee={item} /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedList;
