import React, {useEffect} from "react";

/* AntD */
import {notification, Spin} from "antd";

/* Pages */
import Dashboard from './pages/Dashboard';
import Login from './pages/Login/Login';
import Namespace from "./pages/Namespace/Namespace";
import Settings from "./pages/Settings";
import Manage from "./pages/Manage";

/* Redux */
import { useSelector, useDispatch } from 'react-redux';
import {getMe, toggleMeLoading} from "./redux/user.slice";
import {clearNotification, clearError, toggleLoading, getStatistics} from "./redux/app.slice";

/* Utils */
import { Routes, Route, Outlet } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import { useNavigate } from "react-router-dom";

/* Components */
import MainLayout from './layouts/MainLayout';

/* Styles */
import "./styles/main.sass";

const App = () => {
  const { isAuth, userInfo, error: meError } = useSelector(state => state.user);
  const { token } = useSelector(state => state.auth);
  const { error: appError, loading: appLoading, notification: appNotification } = useSelector(state => state.app);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(appNotification){
      notification.success(appNotification)
      dispatch(clearNotification())
    }
  }, [appNotification])

  useEffect(() => {
    if(appError){
      notification.error(appError)
      dispatch(clearError())
    }
  }, [appError])

  useEffect(() => {
    if(token){
      dispatch(getMe());
      dispatch(getStatistics())
    } else {
      dispatch(toggleLoading(false))
    }
  }, [token])

  useEffect(() => {
    if((meError || !isAuth) && !appLoading){
      navigate("/login")
    }
  }, [meError, isAuth, appLoading])


  return (
      <Spin wrapperClassName="main" spinning={appLoading} tip="Loading...">
        {isAuth ? 
          <MainLayout user={userInfo}>
            <Outlet />
          </MainLayout>
          :
          <Outlet />
        }
      </Spin>
  );
}

export default function() {
  return(
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/namespace/:namespace" 
          element={<PrivateRoute rule={"pages:namespaces"}><Namespace /></PrivateRoute>} 
          />
        <Route 
          path="/settings/import" 
          element={<PrivateRoute rule={"pages:settings_import"}><Settings.Import /></PrivateRoute>} 
          />
        <Route 
          path="/settings/users" 
          element={<PrivateRoute rule={"pages:settings_users"}><Settings.Users /></PrivateRoute>} 
          />
        <Route 
          path="/settings/api" 
          element={<PrivateRoute rule={"pages:settings_apiKey"}><Settings.API /></PrivateRoute>} />
        <Route 
          path="/manage/namespace" 
          element={<PrivateRoute rule={"pages:manage_namespace"}><Manage.Namespace /></PrivateRoute>} 
          />
        <Route 
          path="/manage/language" 
          element={<PrivateRoute rule={"pages:manage_language"} ><Manage.Language /></PrivateRoute>} 
          />
      </Route>
    </Routes>
  );
};
