import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadGlobalChat, SendGlobalMsg } from './DBinterface.js'
import LoggedInContext from '../Context/LoggedInContext.jsx'
import NavBar from './Navbar.jsx'
import '../Styles/ChatWindow.css'

export default function ChatWindow() {
    const userLogin = useContext(LoggedInContext)
    const [LoadedMessages, setMessages] = useState(undefined)
    const navigate = useNavigate()
    const intervalID = useRef()
    const prevETAG = useRef(null)
    const userMsg = useRef("")
    const [msgPaused, setmsgPaused] = useState(false)

    useEffect(() => {
        if (Object.keys(userLogin.user).length == 0){
            navigate('/')
        }
        //Load MSGS
            intervalID.current = setInterval(() => {
                setGlobalChat(setMessages, prevETAG, userLogin.user.token)
            }, 2000)
        return(() => {clearInterval(intervalID.current)})
    }, [])

    return (
        <div id="GlobalChatPageContainer">
            <NavBar/>
            <div id='ChatWindow'>
                {!LoadedMessages ? "Loading Messages": 
                    <div id='MessageArea'>
                        {LoadedMessages.map((elem, i) => {
                            return(
                                <Message 
                                key={i} 
                                yourmessage={elem.username == userLogin.user.username} 
                                username={elem.username} 
                                message={elem.comment}/>
                            )
                        })}
                    </div>
                }
                <textarea 
                placeholder='Type your message...' 
                onChange={(eventObj) => {
                    userMsg.current = eventObj.target.value;
                }}>
                </textarea>
                {!LoadedMessages ? null : <button 
                onClick={() => {
                    if (!msgPaused) {
                        SendGlobalMsg(userLogin.user.username, userMsg.current, userLogin.user.token);
                        setmsgPaused(true);
                        setTimeout(() => {
                            setmsgPaused(false);
                        }, 2000)
                    }
                }}>{!msgPaused ? "Send": "Wait..."}
                </button>}
            </div>
        </div>
    )
}


 async function setGlobalChat(messageSetter, etag, token) {
    try {
        let data = await LoadGlobalChat(token, etag.current)
        if (!(data.etag == etag.current)) {
            messageSetter(data.json);
            etag.current = data.etag;
        }
    }
    catch(Error) {
        console.log(Error)
    }
}


function Message(props) {

    return (
        <div className={`Message ChatMessage ${props.yourmessage ? "YourMessage": "ChatMessage"}`}>
            <div id='MessageSender'>
                {props.username}:
            </div>

            <div id='MessageContent'>
                {props.message}
            </div>
        </div>
    )
}

