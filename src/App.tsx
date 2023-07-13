import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import AssignTask from './pages/Form/AssignTask';
import AssignedTask from './components/AssignedTask';

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

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
