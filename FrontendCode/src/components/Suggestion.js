import { useDispatch,useSelector } from "react-redux"
import { sendRequests } from "../store/Suggestion";
export default function Suggestions({ suggestions, userId, getSuggestions, nextPage, nextPageURL }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.Auth.user);
    function sendRequest(userId, suggestionId) {
        let data ={
            userId,
            token: user.token,
            suggestionId
        }
        dispatch(sendRequests(data,getSuggestions))
    }

    return (
        <>
            <div className="my-2 shadow  text-white bg-dark p-1" id="">
                <div className="d-flex justify-content-between">
                    {
                        suggestions && suggestions.length > 0
                            ?
                            <>
                                <table className="ms-1" width="100%">
                                    <tbody>
                                        {
                                            suggestions.map((v, k) => {
                                                return (<tr key={k} style={{boxShadow:"0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important"}}>
                                                    <td className="align-middle">{v['name']}</td>
                                                    <td className="align-middle"> - </td>
                                                    <td className="align-middle">{v['email']}</td>
                                                    <td className="align-middle" />
                                                    <td style={{float:"right"}}><button id={`create_request_btn_${k}`} className="btn btn-primary me-1" onClick={() => sendRequest(userId, v['id'])}>Connect</button></td>
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
                suggestions && nextPageURL && (
                    <div className="d-flex justify-content-center mt-2 py-3" id="load_more_btn_parent_suggestion" >
                        <button className="btn btn-primary" onClick={() => getSuggestions(nextPage)} id="load_more_btn_suggestion">Load more</button>
                    </div>
                )
            }


        </>
    )
}