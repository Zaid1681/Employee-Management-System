// import BrandOne from '../images/brand/brand-01.svg';
// import BrandTwo from '../images/brand/brand-02.svg';
// import BrandThree from '../images/brand/brand-03.svg';
// import BrandFour from '../images/brand/brand-04.svg';
import { collection, getDocs } from 'firebase/firestore';
// import { firestore } from './firebaseConfig';

import BrandFive from '../images/brand/brand-05.svg';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { getAuth, deleteUser } from 'firebase/auth';

import { deleteDoc, doc } from 'firebase/firestore';

import { Link } from 'react-router-dom';
import AssignTask from '../pages/Form/AssignTask';
import { useDispatch } from 'react-redux';
import { empFailure, empStart, empSuccess } from '../Redux/EmployeeDataSlice';
import Swal from 'sweetalert2';

const TableOne = () => {
  const dispatch = useDispatch();
  // let navigate = useNavigate();
  const [data, setData] = useState([] as any);
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

  useEffect(() => {
    const fetchData = async () => {
      let list = [] as any;
      try {
        const querySnapshot = await getDocs(collection(db, 'Employee'));
        querySnapshot.forEach((doc) => {
          const employeeData = doc.data();
          if (employeeData.role === 'employee') {
            list.push({ id: doc.id, ...employeeData });
          }
        });
      } catch (error) {
        console.log(error);
      }
      setData(list);
      // console.log(list);
    };
    fetchData();
  }, []);

  const handleEmployee = (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: any
  ) => {
    try {
      dispatch(empStart());
      dispatch(empSuccess(item));
    } catch (error) {
      dispatch(empFailure());
    }
    // console.log('current item', item);
  };

  const deleteEmployee = async (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: any
  ) => {
    event.preventDefault();
    try {
      // console.log('emp id ', item.id);

      // const auth = getAuth(); // Get the Auth instance

      // @ts-ignore
      // await deleteUser(auth.currentUser, item.id); // Delete the user
      window.confirm('Are you sure  ?');
      console.log('Each task id :', item.id);
      const data = doc(db, 'Employee', item.id);
      await deleteDoc(data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Employee Deleted',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 100);
      console.log('Successfully deleted user');
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  // console.log(data.map((item: any) => item));
  // console.log(data[2].role);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-1 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Channels
      </h4>

      <div className="flex flex-col text-center">
        <div className="grid w-[100%] rounded-sm bg-gray-2  dark:bg-meta-4 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10">
          <div className="w-[10%] p-1  xl:p-3">
            <span className="text-sm   ">Emp</span>
          </div>
          <div className="w-[10%] p-1  xl:p-3">
            <span className="text-sm   ">FName</span>
          </div>
          <div className="w-[10%] p-1 text-left xl:p-3">
            <span className="uppercasee text-left text-sm font-medium">
              LName
            </span>
          </div>
          <div className="w-[10%]  p-1 text-left xl:p-3">
            <span className="uppercasee text-left text-sm font-medium">
              Dept
            </span>
          </div>
          <div className="hidde w-[10%]n p-1 text-left sm:block xl:p-3">
            <span className="uppercasee  text-center text-sm font-medium">
              Emails
            </span>
          </div>
          <div className="hidden w-[10%] p-1 text-left sm:block xl:p-3">
            <span className="uppercasee text-sm font-medium">Phone</span>
          </div>
          <div className="hidden w-[10%] p-1 text-left sm:block xl:p-3">
            <span className="uppercasee text-sm font-medium">Salary</span>
          </div>
          <div className="hidden w-[10%] p-1 text-left sm:block xl:p-3">
            <span className="uppercasee text-sm font-medium">DOJ</span>
          </div>
          <div className="hidden w-[30%] p-1 text-left sm:block xl:p-3">
            <span className="uppercasee text-sm font-medium">Action</span>
          </div>
        </div>

        {data.map((item: any, index: any) => (
          <div
            key={index}
            className=" border-b border-stroke dark:border-strokedark "
          >
            {/* {console.log('items', item)} */}
            <div className=" grid  grid-cols-10 items-center  p-1 xl:p-3">
              <div className="flex items-center  p-1 xl:p-3">
                <p className="text-black dark:text-white">{item.fname}</p>
              </div>
              <div className="flex items-center  p-1 xl:p-3">
                <p className="text-black dark:text-white">{item.fname}</p>
              </div>

              <div className="flex items-center  p-1 xl:p-3">
                <p className="text-black dark:text-white">{item.lname}</p>
              </div>
              <div className="flex items-center   p-1 xl:p-3">
                <p className="text-black dark:text-white">{item.department}</p>
              </div>
              <div className="flex items-center  justify-center  p-1 xl:p-3">
                <p className="text-black dark:text-white">{item.email}</p>
              </div>
              <div className="flex items-center justify-center p-1 xl:p-3">
                <p className="text-black dark:text-white">{item.phone}</p>
              </div>
              <div className="flex items-center    p-1 xl:p-3">
                <p className="text-black dark:text-white">{item.salary}</p>
              </div>
              <div className="w-[10% ] flex items-center  p-1 xl:p-3">
                <p className="text-black dark:text-white">{item.date}</p>
              </div>
              <div className="flex items-center justify-center p-1 xl:p-3">
                <button
                  id={index}
                  // @ts-ignore
                  onClick={(e) => deleteEmployee(e, item)}
                  className="inline-flex items-center justify-center rounded bg-primary py-2 px-3 text-left font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-3"
                >
                  Delete
                </button>{' '}
              </div>
              {/* <div className="flex items-center justify-center p-1 xl:p-3">
                <Link
                  to="#"
                  className="inline-flex items-center justify-center rounded bg-primary py-2 px-10 text-left font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-3"
                >
                  Edit
                </Link>{' '}
              </div> */}
              <div className="flex items-center justify-center p-1 xl:p-3">
                <Link
                  id={index}
                  // @ts-ignore
                  onClick={(e) => handleEmployee(e, item)}
                  to="/assignTask"
                  className="inline-flex items-center justify-center rounded bg-primary py-2 px-10 text-left font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  +
                </Link>{' '}
              </div>
              {/* <AssignTask employee={item} /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
