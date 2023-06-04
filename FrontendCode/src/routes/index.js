import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from '../components/spinner/spinner'
import history from './History';

const Login = lazy(() =>
    import("../components/Login")
);
const Register = lazy(() =>
    import("../components/Register")
);

const Dashboard = lazy(() =>
    import("../components/Dashboard")
);

export default function routes(){
    return (
        <>
            <Suspense fallback={<Spinner />}>
                <Routes history={history}>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Suspense>
        </>
    );
}
