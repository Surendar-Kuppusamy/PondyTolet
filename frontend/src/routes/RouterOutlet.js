import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Loader from '../components/Loader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AllRoutes from './AllRoutes'


function RouterOutlet() {
    return (
        <Router forceRefresh={false}>
            <Suspense fallback={<Loader />}>
                <Header />
                <AllRoutes />
                <Footer />
            </Suspense>
        </Router>
    );
}

export default RouterOutlet;