import Breadcrumb from '../components/Breadcrumb';
import TableOne from '../components/TableOne';
import TableThree from '../components/TableThree';
import TableTwo from '../components/TableTwo';

const EmployeeList = () => {
  return (
    <>
      {/* <Breadcrumb pageName="Tables" /> */}

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </>
  );
};

export default EmployeeList;
