import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import AssignTask from './pages/Form/AssignTask';
import AssignedTask from './components/AssignedTask';
import CreateTask from './components/SelfTask/CreateTask';
import TaskList from './components/SelfTask/TaskList';
import EmpAssignedTask from './components/EmpAssignedTask';
import { useSelector } from 'react-redux';

const Calendar = lazy(() => import('./pages/Calendar'));
const Chart = lazy(() => import('./pages/Chart'));
const FormElements = lazy(() => import('./pages/Form/FormElements'));
const CreateEmployee = lazy(() => import('./pages/Form/CreateEmployee'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const EmployeeList = lazy(() => import('./pages/EmployeeList'));
const Alerts = lazy(() => import('./pages/UiElements/Alerts'));
const Buttons = lazy(() => import('./pages/UiElements/Buttons'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // @ts-ignore
  const currentUser = useSelector((state) => state.user.currentUser);
  // const currentUser = false;
  const RequirePath = ({ children }: any) => {
    return currentUser === null ? <Navigate to="/auth/signin" /> : children;
  };
  const AdminPath = ({ children }: any) => {
    return currentUser === 'admin' ? (
      <Navigate to="/" />
    ) : (
      <Navigate to="/create" />
    );
  };
  console.log('currentUser', currentUser);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* {currentUser === '' ? ( */}
        <Route path="/auth/signin" element={<SignIn />} />
        {/* ) : ( */}
        // <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<DefaultLayout />}>
          <Route
            index
            element={
              <AdminPath>
                <RequirePath>
                  <ECommerce />
                </RequirePath>
              </AdminPath>
            }
          />
          <Route
            path="/calendar"
            element={
              <Suspense fallback={<Loader />}>
                <Calendar />
              </Suspense>
            }
          />
          <Route
            path="/assigned"
            element={
              <Suspense fallback={<Loader />}>
                <AssignedTask />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <Suspense fallback={<Loader />}>
                <FormElements />
              </Suspense>
            }
          />
          <Route
            path="/createEmployee"
            element={
              <Suspense fallback={<Loader />}>
                <CreateEmployee />
              </Suspense>
            }
          />
          <Route
            path="/employeeList"
            element={
              <Suspense fallback={<Loader />}>
                <EmployeeList />
              </Suspense>
            }
          />
          <Route
            path="/assignTask"
            element={
              <Suspense fallback={<Loader />}>
                <AssignTask />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="/chart"
            element={
              <Suspense fallback={<Loader />}>
                <Chart />
              </Suspense>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <Suspense fallback={<Loader />}>
                <Alerts />
              </Suspense>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <Suspense fallback={<Loader />}>
                <Buttons />
              </Suspense>
            }
          />
          <Route
            path="/create"
            element={
              <Suspense fallback={<Loader />}>
                <CreateTask />
              </Suspense>
            }
          />
          <Route
            path="/empAssigntask"
            element={
              <Suspense fallback={<Loader />}>
                <EmpAssignedTask />
              </Suspense>
            }
          />
          <Route
            path="/tasklist"
            element={
              <Suspense fallback={<Loader />}>
                <TaskList />
              </Suspense>
            }
          />

          {/* emp Section */}
        </Route>
        {/* )} */}
      </Routes>
    </>
  );
}

export default App;
