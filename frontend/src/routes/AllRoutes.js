import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Redirect, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SITE_LOADER } from '../constants/constants';
import PrivateRoutes from '../routes/PrivateRoutes';
import Loader from '../components/Loader';


const Content = lazy(() => import('../components/Contents'));
const Home = lazy(() => import('../components/pages/Home'));
const Login = lazy(() => import('../components/pages/login/Login'));
const Signup = lazy(() => import('../components/pages/signup/Signup'));
const AddAssets = lazy(() => import('../components/pages/assets/AddAssets'));
const BulkDataInsert = lazy(() => import('../components/pages/settings/BulkDataInsert'));
const User = lazy(() => import('../components/pages/settings/User'));
const CitiesList = lazy(() => import('../components/pages/settings/CitiesList'));
const StatesList = lazy(() => import('../components/pages/settings/StatesList'));
const TenantsTypeList = lazy(() => import('../components/pages/settings/TenantsTypeList'));



function AllRoutes() {
    let location = useLocation();
    /* const dispatch = useDispatch();
    dispatch({type: SET_SITE_LOADER, payload: true}); */
    React.useEffect(() => {
        console.log(location)
    }, [location]);
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route exact path="/home" component={() => (<Home />)} />
            <Route exact path="/loader" component={() => <Loader />} />
            <Route exact path="/content" component={() => <Content />} />

            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/signup" component={() => <Signup />} />

            <Route exact path="/asset/add" component={() => <AddAssets />} />
            <Route exact path="/settings/bulk" component={() => <BulkDataInsert />} />
            <Route exact path="/users" component={() => <User />} />
            <Route exact path="/cities" component={() => <CitiesList />} />
            <Route exact path="/states" component={() => <StatesList />} />
            <Route exact path="/tenants/type" component={() => <TenantsTypeList />} />
            

            <PrivateRoutes path="/auth/asset/add" component={() => <AddAssets />} />
            
        </Switch>
    );
}

export default AllRoutes;