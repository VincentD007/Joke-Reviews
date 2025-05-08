import { useRef, useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import "../Styles/Login.css"
import LoggedInContext from '../Context/LoggedInContext.jsx'
import { LoadGlobalChat } from './DBinterface.js'

export default function Login() {
    const navigate = useNavigate()
    let userName = useRef("");
    let PAT = useRef("");
    let setUser = useContext(LoggedInContext).setUser;
    
    return (
        <div id="LoginPageContainer">
            <h1 style={{margin: "0px", marginBottom: "30px"}}>Jokes Login</h1>
            <form id='LoginForm' onSubmit={(event) => {event.preventDefault()}}>
                <input 
                className='LoginField' 
                pattern="[a-zA-Z0-9]*" 
                type="text" placeholder='Username' 
                required onChange={eventObj => {
                    userName.current = eventObj.target.value;
                }}/>

                <input className='LoginField' type="password" placeholder='Access Token' required onChange={eventObj => {
                    PAT.current = eventObj.target.value;
                }}/>

                <input id='LoginButton' type='submit' value="Log In" onClick={()=> {
                    accountExists(userName.current)
                    .then(UserExists => {
                        validatePAT(PAT.current)
                        .then(PATValid => {
                            if (UserExists && PATValid) {
                                setUser({
                                    username: userName.current,
                                    token: PAT.current
                                })
                                navigate('/home');
                            };
                        })
                    })
                    // LoadGlobalChat(PAT.current, null)
                    // .then(response => {console.log(response)})
                }}/>

                <input type='submit' id='CreateButton' value="Create Account" onClick={() => {
                    if (userName.current.indexOf(" ") != -1) {return}
                    accountExists(userName.current)
                    .then(UserExists => {
                        validatePAT(PAT.current)
                        .then(PATValid => {
                            if (!UserExists && PATValid) {
                                createAccount(userName.current, PAT.current)
                                .then(response => {console.log(response)})
                            };
                        })
                    })
                }}/>
            </form>
        </div>
    )
}


async function createAccount(username, token) {
    let newAccount = {
        username: username,
        token: token,
    }
    let response = await fetch("http://localhost:3001/JokeAccounts",
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newAccount)
        }
    )
    .then(rawData => rawData.json())

    return response;
}


async function validatePAT(PAT) {
    return await fetch('https://api.github.com/repos/VincentD007/Joke-Reviews-DB',
        {
            headers: {
                'Authorization': `Bearer ${PAT}`
            }
        }
    )
    .then(result => result.ok)
}


async function accountExists(username) {
    if (typeof username != 'string') {
        throw new Error(`${username} is not a string.`)
    };

    let url = "https://api.github.com/repos/VincentD007/Joke-Reviews-DB/contents/Accounts";
    return await fetch(`${url}/${username}.json`)
    .then(response => response.ok);
}


// let user = {
//     username: "VincentD007",
//     SavedMemes: {
//         title1: imgURl, 
//         title2: imgURl
//     },
// }
