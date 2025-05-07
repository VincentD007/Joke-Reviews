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
                <input 
                className='LoginField' 
                pattern="[a-zA-Z0-9]*" 
                type="text" placeholder='Username' 
                required onChange={eventObj => {
                    userName.current = eventObj.target.value;
                }}/>
                <input className='LoginField' type="password" placeholder='Password' required onChange={eventObj => {
                    password.current = eventObj.target.value;
                }}/>
                <input className='LoginField' type="password" placeholder='Access Token' required onChange={eventObj => {
                    PAT.current = eventObj.target.value;
                }}/>
                <input id='LoginButton' type='submit' value="Log In" onClick={()=> {
                    // let userDetails;
                    // login(userName.current, password.current)
                    // .then(data => {
                    //     userDetails = data;
                    //     console.log(userDetails, "test");
                    // })
                    validatePAT(PAT.current)
                    .then(okay => {console.log(okay)})
      
                }}/>
                <input type='submit' id='CreateButton' value="Create Account" onClick={() => {
                    createAccount(userName.current, password.current, PAT.current)
                    .then(response => {console.log(response)})
                }}/>
            </form>
        </div>
    )
}


async function createAccount(username, password, token) {
    let newAccount = {
        token: token,
        username: username,
        password: password,
        SavedMemes: {}
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


async function login(username, password) {
    let repo = 'https://api.github.com/repos/VincentD007/Joke-Reviews-DB/contents'
    let data = await fetch(`${repo}/Accounts/${username}.json?ref=main`)
    .then(rawData => rawData.json())
    .then(jsonified => jsonified)
    return data;
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



// let user = {
//     username: "VincentD007",
//     password: 12345,
//     SavedMemes: {
//         title1: imgURl, 
//         title2: imgURl
//     },
// }

