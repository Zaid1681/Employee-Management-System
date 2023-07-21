import React from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';

export default function TaskStatus({ data }: any) {
  const [showModal, setShowModal] = React.useState(false);
  console.log('data', data);

  const statusUpdate = async () => {
    console.log('Cicked');
    try {
      const taskDocument = doc(db, 'assignedTask', data.id);
      const docSnapshot = await getDoc(taskDocument);
      if (docSnapshot.exists()) {
        const currentData = docSnapshot.data();

        await updateDoc(taskDocument, {
          ...data,
          status: !currentData.status,
        });
        console.log('Document successfully updated!');
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
      } else {
        console.log('Document not found!');
      }
    } catch (error) {
      console.log('Error in the save changes button: ', error);
    }
  };

  return (
    <>
      {data.status === true ? (
        <button
          className="bg-pink-500 active:bg-pink-600 mr-1 mb-1 rounded bg-[#04f03ffa] px-6 py-3 text-sm font-bold uppercase text-white  shadow transition-all duration-150 ease-linear hover:shadow-lg  focus:outline-none"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Task Done
        </button>
      ) : (
        <button
          className="bg-pink-500 active:bg-pink-600 mr-1 mb-1 rounded bg-[#f54545fa] px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Not Done
        </button>
      )}

      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto  overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl ">
              {/*content*/}
              <div className="relative m-10 flex w-full flex-col rounded-lg border-0 px-10 pt-10 shadow-lg outline-none focus:outline-none dark:border-strokedark dark:bg-boxdark">
                {/*header*/}
                <div className="border-slate-200 flex items-start gap-3 rounded-t  border-b border-solid py-5">
                  <h5 className="text-xl font-semibold text-white">Title: </h5>
                  <h5 className="text-lg font-medium text-white">
                    {data.title}
                  </h5>
                  {/* <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  ></button> */}
                </div>
                {/*body*/}
                <div className="border-slate-200 flex items-start gap-3 rounded-t border-b border-solid py-5">
                  <h5 className="text-xl font-semibold text-white">
                    Desscription:{' '}
                  </h5>
                  <h5 className="text-lg font-medium text-white">{data.des}</h5>
                  {/* <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  ></button> */}
                </div>
                {/*footer*/}
                <div className="border-slate-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                  <button
                    className=" background-transparent color-#000 mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {data.status == true ? (
                    <button
                      className="border-1 bg-sky-500/100 mr-1 mb-1 rounded bg-[#f54545fa] px-6 py-3 text-sm font-bold uppercase text-black  shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                      type="button"
                      onClick={statusUpdate}
                    >
                      Task Not Done
                    </button>
                  ) : (
                    <button
                      className="border-1 bg-sky-500/100 mr-1 mb-1 rounded bg-[#1ef041fa] px-6 py-3 text-sm font-bold uppercase text-black shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                      type="button"
                      onClick={statusUpdate}
                    >
                      Task Done
                    </button>
                  )}
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
