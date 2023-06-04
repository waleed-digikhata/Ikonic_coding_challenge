import { Formik } from 'formik';
import {  useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {register} from '../store/User'
export default function Register() {
    const user = useSelector(state => state.Auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(user){
            navigate("/dashboard");
        }
    },[user,navigate])
    
    const handleSubmit = (data) => {
        // console.log(data)
        dispatch(register(data))
    };
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card bg-dark text-white shadow">
                            <div className="card-header">Register</div>
                            <div className="card-body">
                                <Formik
                                    initialValues={{ email: '', password: '',name:'',password_confirmation:'' }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.name) {
                                            errors.name = 'Name is Required';
                                        }
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
                                        if (!values.password_confirmation) {
                                            errors.password_confirmation = "Confirm Password is required";
                                        } else if (values.password !== values.password_confirmation) {
                                            errors.password_confirmation = "Confirm Password mismatched.";
                                        }else if (values.password_confirmation.length < 3) {
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
                                                <label htmlFor="name" className="col-md-4 col-form-label text-md-end">Name</label>

                                                <div className="col-md-6">
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        className={`bg-dark text-white form-control ${errors.name && touched.name && 'is-invalid'}`}
                                                        name="name"
                                                        // required
                                                        autoComplete="name"
                                                        autoFocus
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.name}
                                                    />
                                                    {
                                                        errors.name && touched.name && (
                                                            <span className="invalid-feedback" role="alert">
                                                                <strong>{errors.name}</strong>
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>

                                                <div className="col-md-6">
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        className={`bg-dark text-white form-control ${errors.email && 'is-invalid'}`}
                                                        name="email"
                                                        // required
                                                        autoComplete="email"
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
                                                        id="password"
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
                                            <div className="row mb-3">
                                                <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-end">Confirm Password</label>
                                                <div className="col-md-6">
                                                    <input
                                                        id="password-confirm"
                                                        type="password"
                                                        className={`bg-dark text-white form-control ${errors.password_confirmation && 'is-invalid'}`}
                                                        name="password_confirmation"
                                                        // required
                                                        autoComplete="new-password"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.password_confirmation}
                                                    />

                                                    {
                                                        errors.password_confirmation && (
                                                            <span className="invalid-feedback" role="alert">
                                                                <strong>{errors.password_confirmation}</strong>
                                                            </span>
                                                        )
                                                    }


                                                </div>
                                            </div>
                                            <div className="row mb-0">
                                                <div className="col-md-8 offset-md-4">
                                                    <button type="submit" className="btn btn-primary" disabled={(Object.keys(errors).length !== 0 ? true : false)}>
                                                        Register
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
    )
}