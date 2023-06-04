import { useEffect, useState } from "react"
import Suggestions from "./Suggestion"
import Requests from "./Request"
import Connections from "./Connection"
import { useDispatch, useSelector } from "react-redux"
import { fetchNetworkCounts } from "../store/NetworkCount"
import Skeleton from './Skeleton'
import { fetchSuggestions } from "../store/Suggestion"
import queryString from 'query-string';
import { fetchRequests } from "../store/Request"
import { fetchConnections } from "../store/Connection"
import { fetchCommonConnections } from "../store/CommonConnection"
// import { useNavigate } from "react-router-dom";

export default function NetworkConnection() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.Auth.user);
    const counts = useSelector(state => state.NetworkCounts.data);
    // const suggestions = useSelector(state => state.Suggestions.data);
    // const requests = useSelector(state => state.Requests.data);
    // const connections = useSelector(state => state.Connections.data);
    // const commonConnections = useSelector(state => state.CommonConnections.data);

    const [suggestion, setSuggestion] = useState(false)
    const [requestSent, setRequestSent] = useState(false)
    const [requestReceived, setRequestReceived] = useState(false)
    const [connection, setConnection] = useState(false)
    const [loading, setLoading] = useState(false);
    const [nextPage, setNextPage] = useState(1);
    const [nextPageURL, setNextPageURL] = useState(null);
    const [suggestionData, setSuggestionData] = useState([]);
    const [requestData, setRequestData] = useState([]);
    const [connectionData, setConnectionData] = useState([]);
    const [commonConnectionData, setCommonConnectionData] = useState([]);
    const [commonCount, setCommonCount] = useState(0)
    const [nextCommonPage, setNextCommonPage] = useState(1);
    const [nextCommonPageURL, setNextCommonPageURL] = useState(null);
    const [connectionId, setConnectionId] = useState(0);
    // const navigate = useNavigate();

    useEffect(() => {
        setSuggestion(true)
        setLoading(true)
        if (user) {
            const res = dispatch(fetchNetworkCounts(user.token))
            res.then(() => {
                setLoading(false)
            })
            getSuggestions(1)
        }

    }, [dispatch])

    function getSuggestions(page) {
        setLoading(true)
        setSuggestion(true)
        setRequestSent(false)
        setRequestReceived(false)
        setConnection(false)
        // setSuggestionData([])
        let data = {
            token: user.token,
            page: page
        }
        const res = dispatch(fetchSuggestions(data))
        res.then((response) => {
            try{
                if(response && response.hasOwnProperty("data")){
                    setNextPageURL(response['next_page_url'])
                    if (response['next_page_url']) {
                        const parsed = queryString.parseUrl(response['next_page_url']);
                        let nextPage = parseInt(parsed.query.page)
                        setNextPage(nextPage)
                        if (page !== 1) {
                            setSuggestionData(suggestionData => [...suggestionData, ...response['data']])
                        }
                        if (page === 1) {
                            setSuggestionData(response['data'])
                        }
                    }else if(response['current_page'] === response['last_page']) {
                        setSuggestionData(suggestionData => [...suggestionData, ...response['data']])
                    } else {
                        setSuggestionData(response['data'])
                    }
                }
                
                setLoading(false)
            }catch(error){
                alert(error)
            }
            
        })

    }
    function getRequests(page, mode) {
        setLoading(true)
        // setRequestData([])
        if (mode === 'sent') {
            setRequestSent(true)
            setRequestReceived(false)
            setConnection(false)
            setSuggestion(false)
        } else {
            setRequestData([])
            setRequestReceived(true)
            setRequestSent(false)
            setConnection(false)
            setSuggestion(false)
        }
        let data = {
            token: user.token,
            page: page,
            mode: mode
        }
        const res = dispatch(fetchRequests(data))
        res.then((response) => {
            setNextPageURL(response['next_page_url'])
            if (response['next_page_url']) {
                const parsed = queryString.parseUrl(response['next_page_url']);
                let nextPage = parseInt(parsed.query.page)
                setNextPage(nextPage)
                if (page !== 1) {
                    setRequestData(requestData => [...requestData, ...response['data']])
                }
                if (page === 1) {
                    setRequestData(response['data'])
                }
            }else if(response['current_page'] === response['last_page']) {
                setRequestData(requestData => [...requestData, ...response['data']])
            } else {
                setRequestData(response['data'])
            }
            setLoading(false)
        })
    }
    function getConnections(page,remove=false) {
        
        setLoading(true)
        setSuggestion(false)
        setRequestSent(false)
        setRequestReceived(false)
        setConnection(true)
        if(remove){
            setConnectionData([])
        }
        let data = {
            token: user.token,
            page: page
        }
        const res = dispatch(fetchConnections(data))
        res.then((response) => {
            setNextPageURL(response['next_page_url'])
            if (response['next_page_url']) {
                const parsed = queryString.parseUrl(response['next_page_url']);
                let nextPage = parseInt(parsed.query.page)
                setNextPage(nextPage)
                if (page !== 1) {
                    setConnectionData(connectionData => [...connectionData, ...response['data']])
                }
                if(page === 1){
                    setConnectionData(response['data'])
                }
            }else if(response['current_page'] > response['last_page']) {
                setConnectionData(connectionData => [...connectionData, ...response['data']])
            } else {
                setConnectionData(response['data'])
            }
            setLoading(false)
        })
    }
    function getCommonConnections(page,userId,connectionId) {
        setLoading(true)
        setSuggestion(false)
        setRequestSent(false)
        setRequestReceived(false)
        setConnection(true)
        setCommonConnectionData([])
        let data = {
            token: user.token,
            page:page,
            userId,
            connectionId
        }
        setConnectionId(connectionId)
        const res = dispatch(fetchCommonConnections(data))
        res.then((response) => {
            setNextCommonPageURL(response['next_page_url'])
            setCommonCount(response['total'])
            if (response['next_page_url']) {
                const parsed = queryString.parseUrl(response['next_page_url']);
                let nextPage = parseInt(parsed.query.page)
                setNextCommonPage(nextPage)
                if (page !== 1) {
                    setCommonConnectionData(commonConnectionData => [...commonConnectionData, ...response['data']])
                }
                if(page === 1){
                    setCommonConnectionData(response['data'])
                }
            } else if(response['current_page'] === response['last_page']) {
                // var merge = commonConnectionData.concat(response['data'].filter((item) => commonConnectionData.indexOf(item) < 0))
                // // let merge = commonConnectionData.concat(response['data']);
                // setCommonConnectionData(merge)
                setCommonConnectionData(commonConnectionData => [...commonConnectionData, ...response['data']])
            }else{
                setCommonConnectionData(response['data'])
            }
            setLoading(false)
        })
    }
    return (
        <>
            <div className="row justify-content-center mt-5">
                <div className="col-12">
                    <div className="card shadow  text-white bg-dark">
                        <div className="card-header">Coding Challenge - Network connections</div>
                        <div className="card-body">
                            <div className="btn-group w-100 mb-3" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" readOnly checked={suggestion} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio1" id="get_suggestions_btn" onClick={() => getSuggestions(1)}>Suggestions ({counts && counts['suggestion_count']})
                                    <span id="get_suggestions_count"></span></label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" readOnly checked={requestSent} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio2" id="get_sent_requests_btn" onClick={() => getRequests(1, 'sent')}>Sent Requests <span id="get_sent_request_count">({counts && counts['request_sent_count']})</span></label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" readOnly checked={requestReceived} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio3" id="get_received_requests_btn" onClick={() => getRequests(1, 'received')} >Received Requests <span id="get_received_request_count">({counts && counts['request_received_count']})</span></label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" readOnly checked={connection} />
                                <label className="btn btn-outline-primary" htmlFor="btnradio4" id="get_connections_btn" onClick={() => getConnections(1)}>Connections <span id="get_connection_count">({counts && counts['connection_count']})</span></label>
                            </div>
                            <hr />
                            <div id="content" className="">
                                {/* {{-- Display data here --}} */}
                                {
                                    loading && (<Skeleton />)
                                }
                                {
                                    user && suggestion && (<Suggestions suggestions={suggestionData} userId={user.id} getSuggestions={getSuggestions} nextPage={nextPage} nextPageURL={nextPageURL} />)

                                }
                                {
                                    user && requestSent && (<Requests mode="sent" requests={requestData} userId={user.id} getRequests={getRequests} nextPage={nextPage} nextPageURL={nextPageURL} />)

                                }
                                {
                                    user && requestReceived && (<Requests mode="received" requests={requestData} userId={user.id} getRequests={getRequests} nextPage={nextPage} nextPageURL={nextPageURL} />)

                                }
                                {
                                    user && connection && (
                                        <Connections
                                            connections={connectionData}
                                            userId={user.id}
                                            getConnections={getConnections} 
                                            nextPage={nextPage}
                                            nextPageURL={nextPageURL}
                                            commonCount={commonCount}
                                            getCommonConnections={getCommonConnections}
                                            commonConnection={commonConnectionData}
                                            nextCommonPage={nextCommonPage}
                                            nextCommonPageURL={nextCommonPageURL}
                                            connectionId={connectionId}
                                        />)

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}