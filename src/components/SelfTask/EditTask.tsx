import React, { useState } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Swal from 'sweetalert2';

export default function EditTask({ data }: any) {
  const [showModal, setShowModal] = React.useState(false);
  console.log('data of edit task', data);

  const [title, setTitle] = useState([data.title]);
  const [des, setDes] = useState([data.Description]);
  const [date, setDate] = useState([data.deadline]);

  // @ts-ignore
  const saveChange = async (e) => {
    e.preventDefault();
    console.log('update title: ', title);
    console.log('update des: ', des);
    console.log('update date: ', date);
    try {
      const taskDocument = doc(db, 'selfTask', data.id);
      const docSnapshot = await getDoc(taskDocument);
      if (docSnapshot.exists()) {
        const currentData = docSnapshot.data();

        // Convert arrays to strings
        const updatedTitle = Array.isArray(title) ? title.join(', ') : title;
        const updatedDescription = Array.isArray(des) ? des.join(', ') : des;
        const updatedDate = Array.isArray(date) ? date.join(', ') : date;

        await updateDoc(taskDocument, {
          title: updatedTitle || currentData.title,
          Description: updatedDescription || currentData.Description,
          deadline: updatedDate || currentData.Date,
        });
        console.log('Document successfully updated!');
      } else {
        console.log('Document not found!');
      }
    } catch (error) {
      console.log('Error in the save changes button: ', error);
    }
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Task Updated',
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // @ts-ignore
  const handleDateChange = (e) => {
    const reversedDate = e.target.value.split('-').reverse().join('-');
    setDate(reversedDate);
  };
  // console.log('date', date);

  return (
    <>
      <button
        className="active:bg-pink-600 mr-1 mb-1 rounded bg-[#ffff] px-6 py-3 text-sm font-bold uppercase text-black shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Update
      </button>     
      {showModal ? (
        <>
          <div className="dark:bg-gray-800 fixed inset-0 z-50 flex items-center  justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              {/*content*/}
              <div className="dark:bg-gray-800 relative flex w-[150%] flex-col  rounded-lg border-0 shadow-lg outline-none  focus:outline-none dark:border-strokedark dark:bg-boxdark ">
                <div className="px-4    ">
                  <div className="pt-10">
                    <label className="mb-1 block text-left text-black dark:text-white">
                      Title
                    </label>
                    <input
                      type="text"
                      defaultValue={title}
                      // @ts-ignore
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Default Input"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="py-10">
                    <label className="mb-1 block text-left text-black dark:text-white">
                      Description
                    </label>
                    <input
                      type="text"
                      defaultValue={des}
                      // @ts-ignore
                      onChange={(e) => setDes(e.target.value)}
                      placeholder="Default Input"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-10 w-full">
                    <label className="block text-left text-black dark:text-white">
                      Deadline
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        defaultValue={date}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="border-slate-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                  <button
                    className="text-red-500 background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 active:bg-emerald-600 mr-1 mb-1 rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={saveChange}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
