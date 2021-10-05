import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth }from '../auth/Auth';

const PrivateRoutes = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        auth() ? (<Component {...props} />) : (<Redirect to={{pathname: '/login', state: { from: props.location }}}/>)
    )} />
)

export default PrivateRoutes;