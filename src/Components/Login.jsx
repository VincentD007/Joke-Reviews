import React, { useState, useEffect , useRef} from 'react';
import "../Styles/Login.css"

export default function Login() {
    const [user, setUser] = useState({});
    let userName = useRef("");
    let password = useRef("");
    let PAT = useRef("");
    
    return (
        <div id="LoginPageContainer">
            <h1 style={{margin: "0px", marginBottom: "30px"}}>Jokes Login</h1>
            <form id='LoginForm' onSubmit={(event) => {event.preventDefault()}}>
                <input className='LoginField' type="text" placeholder='Username' required onChange={eventObj => {
                    userName.current = eventObj.target.value;
                }}/>
                <input className='LoginField' type="password" placeholder='Password' required onChange={eventObj => {
                    password.current = eventObj.target.value;
                }}/>
                <input className='LoginField' type="password" placeholder='Access Token' required onChange={eventObj => {
                    PAT.current = eventObj.target.value;
                }}/>
                <input id='LoginButton' type='submit' value="Log In" onClick={()=> {
                    let userDetails;
                    login(userName.current, password.current)
                    .then(data => {
                        userDetails = data
                        console.log(userDetails, "test");
                    })
      
                }}/>
            </form>
        </div>

    )
}


async function login(username, password) {
    let repo = 'https://api.github.com/repos/VincentD007/Joke-Reviews-DB/contents'
    let data = await fetch(`${repo}/Accounts/${username}.json?ref=main`)
    .then(rawData => rawData.json())
    .then(jsonified => jsonified)
    return data
}


async function validatePAT(PAT) {
    return await fetch('https://api.github.com/VincentD007',
        {
            headers: {
                'Authorization': `Bearer ${PAT}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        }
    )
    .then(result => result.ok)
}



// let user = {
//     username: "VincentD007",
//     password: 12345,
//     savedjokes: [3, 7, 3, 10, 56],
//     token: "2342d23wf3244"
// }
