import { Suspense } from 'react';
import Spinner from './spinner/spinner'
import NetworkConnection from './NetworkConnection';
import { useSelector } from 'react-redux';
import Login from './Login';
export default function Dashboard() {
    const user = useSelector(state => state.Auth.user);
    return (
        <>
            <Suspense fallback={<Spinner />}>
                {
                    user
                        ?
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <div className="card shadow  text-white bg-dark">
                                        <div className="card-header">Dashboard</div>
                                        <div className="card-body">
                                            You are logged {user ? "in!" : "out!"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <NetworkConnection />
                        </div>
                        :
                        <Login />
                }

            </Suspense>
        </>

    )

}