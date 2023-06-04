import { useState } from "react"
import { deleteUserConnection } from "../store/Connection";
import { useDispatch,useSelector } from "react-redux"

export default function Connections({ connections, userId, getConnections, nextPage, nextPageURL,
    commonCount, getCommonConnections, commonConnection, nextCommonPage, nextCommonPageURL,connectionId }) {
    const [active, setActive] = useState(false)

    const user = useSelector(state => state.Auth.user);
    const dispatch = useDispatch()

    function toggleClass() {
        setActive(!active)
    }
    function getConnectionsInCommon(userId, connectionId) {
        toggleClass()
        getCommonConnections(1, userId, connectionId)
    }
    function removeConnection(userId, connectionId) {
        let data ={
            userId,
            token: user.token,
            connectionId,
            methodType:'connection'
        }
        dispatch(deleteUserConnection(data,getConnections))
    }
    return (
        <>
            <div className="my-2 shadow  text-white bg-dark p-1" id="">
                <div className="d-flex justify-content-between">
                    {
                        connections && connections.length > 0
                            ?
                            <>
                                <table className="ms-1" width="100%">
                                    <tbody>
                                        {
                                            connections.map((v, k) => {
                                                return (<tr key={k} style={{ boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important" }}>
                                                    <td className="align-middle">{v['user']['name']}</td>
                                                    <td className="align-middle"> - </td>
                                                    <td className="align-middle">{v['user']['email']}</td>
                                                    <td className="align-middle" />
                                                    <td style={{ float: "right" }}>
                                                        <button style={{ widht: '220px', marginRight: "20px" }} id="" className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_"
                                                            aria-expanded="false" aria-controls="collapseExample" onClick={() => getConnectionsInCommon(userId, v['connection_id'])}>
                                                            Connections in common (<span>{commonCount}</span>)
                                                        </button>
                                                        <button id="" className="btn btn-danger me-1" onClick={() => removeConnection(userId, v['user']['id'])}>Remove Connection</button>
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
            <div className={`collapse ${active ? "d-block" : 'd-none'}`} id="collapse_">

                <div id="content_" className="p-2">
                    {/* {{-- Display data here --}} */}
                    {
                        commonConnection && commonConnection.length > 0 && (
                            commonConnection.map((v,k)=>{
                                return(
                                    <div key={k} className="p-2 shadow rounded mt-2  text-white bg-dark">{v['common_connection']['name']} - {v['common_connection']['email']}</div>
                                )
                            })
                        )
                        
                    }
                </div>
                {
                    commonConnection && commonConnection.length > 0 && nextCommonPageURL &&(
                        <div className="d-flex justify-content-center w-100 py-2">
                        <button className="btn btn-sm btn-primary" id="load_more_connections_in_common_" onClick={() => getCommonConnections(nextCommonPage,userId,connectionId)}>Load
                            more</button>
                    </div>
                    )

                }
               
            </div>
            {
                connections && nextPageURL && (
                    <div className="d-flex justify-content-center mt-2 py-3" id="load_more_btn_parent_suggestion" >
                        <button className="btn btn-primary" onClick={() => getConnections(nextPage)} id="load_more_btn_suggestion">Load more</button>
                    </div>
                )
            }


        </>
    )
}