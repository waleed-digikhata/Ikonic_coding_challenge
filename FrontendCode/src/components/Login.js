import { Formik } from 'formik';
import {  useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {login} from '../store/User'
import { useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.Auth.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            navigate("/dashboard");
        }
    },[user,navigate])
    
    const handleSubmit = (data) => {
        dispatch(login(data))
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card bg-dark text-white shadow">
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.email) {
                                            errors.email = 'Email is Required';
                                        } else if (
                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                        ) {
                                            errors.email = 'Invalid email address';
                                        }
                                        if (!values.password) {
                                            errors.password = "Password is required";
                                        } else if (values.password.length < 3) {
                                            errors.password = "Password too short";
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values) => {
                                        handleSubmit(values)
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                        /* and other goodies */
                                    }) => (
                                        <form onSubmit={handleSubmit}>

                                            <div className="row mb-3">
                                                <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>

                                                <div className="col-md-6">
                                                    {/*  @error('email') is-invalid @enderror */}
                                                    <input
                                                        id="loginEmail"
                                                        type="email"
                                                        className={`bg-dark text-white form-control ${errors.email && 'is-invalid'}`}
                                                        name="email"
                                                        // required
                                                        autoComplete="email"
                                                        // autoFocus
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                    />
                                                    {
                                                        errors.email && (
                                                            <span className="invalid-feedback" role="alert">
                                                                <strong>{errors.email}</strong>
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Password</label>

                                                <div className="col-md-6">
                                                    {/* @error('password') is-invalid @enderror */}
                                                    <input
                                                        id="loginPassword"
                                                        type="password"
                                                        className={`bg-dark text-white form-control ${errors.password && 'is-invalid'}`}
                                                        name="password"
                                                        // required
                                                        autoComplete="current-password"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.password}
                                                    />

                                                    {
                                                        errors.password && (
                                                            <span className="invalid-feedback" role="alert">
                                                                <strong>{errors.password}</strong>
                                                            </span>
                                                        )
                                                    }


                                                </div>
                                            </div>
                                            <div className="row mb-0">
                                                <div className="col-md-8 offset-md-4">
                                                    <button type="submit" className="btn btn-primary" disabled={(Object.keys(errors).length !== 0 ? true : false)}>
                                                        Login
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}