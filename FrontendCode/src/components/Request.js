import { acceptUserRequest, deleteUserRequest } from "../store/Request"
import { useDispatch,useSelector } from "react-redux"
export default function Requests({mode, requests, userId, getRequests, nextPage, nextPageURL }){
    const user = useSelector(state => state.Auth.user);
    const dispatch = useDispatch()

    function deleteRequest(userId, requestId) {
        let data ={
            userId,
            token: user.token,
            requestId,
            methodType:'request'
        }
        dispatch(deleteUserRequest(data,getRequests))
    }
    function acceptRequest(userId, requestId) {
        let data ={
            userId,
            token: user.token,
            requestId
        }
        dispatch(acceptUserRequest(data,getRequests))
    }
    return(
        <>
            <div className="my-2 shadow  text-white bg-dark p-1" id="">
                <div className="d-flex justify-content-between">
                    {
                        requests && requests.length > 0
                            ?
                            <>
                                <table className="ms-1" width="100%">
                                    <tbody>
                                        {
                                            requests.map((v, k) => {
                                                return (<tr key={k} style={{boxShadow:"0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important"}}>
                                                    <td className="align-middle">{v['user']['name']}</td>
                                                    <td className="align-middle"> - </td>
                                                    <td className="align-middle">{v['user']['email']}</td>
                                                    <td className="align-middle" />
                                                    <td style={{float:"right"}}>
                                                        {
                                                            mode === 'sent'
                                                            ?
                                                            <button id="cancel_request_btn_" className="btn btn-danger me-1" onClick={()=> deleteRequest(userId,v['user']['id'])}>Withdraw Request</button>
                                                            :
                                                            <button id="accept_request_btn_" className="btn btn-primary me-1" onClick={()=>acceptRequest(userId,v['user']['id'])}>Accept</button>
                                                        }
                                                    </td>
                                                </tr>)
                                            })
                                        }

                                    </tbody>
                                </table>
                            </>
                            :
                            <><h6>No data available</h6></>
                    }

                </div>
            </div>
            {
                requests && nextPageURL && (
                    <div className="d-flex justify-content-center mt-2 py-3" id="load_more_btn_parent_suggestion" >
                        <button className="btn btn-primary" onClick={() => getRequests(nextPage,mode)} id="load_more_btn_suggestion">Load more</button>
                    </div>
                )
            }


        </>
    )
}