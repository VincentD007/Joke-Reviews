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
                <input className='LoginField' type="text" placeholder='Password' required onChange={eventObj => {
                    eventObj.target.value = encryptInput(eventObj, password);
                    console.log(password.current)
                }}/>
                <input className='LoginField' type="text" placeholder='Access Token' required onChange={eventObj => {
                    eventObj.target.value = encryptInput(eventObj, PAT);
                }}/>
                <input id='LoginButton' type='submit' value="Log In" onClick={()=> {
                    
                }}/>
            </form>
        </div>

    )
}


function encryptInput(eventObj, reference) {
    let value = eventObj.target.value;

    if (value.length > reference.current.length) {
        let encoded = "";
        let newChar = value.slice(-1);
        for (let i=0; i<value.length; i++) {
            encoded += "*";
        }
        reference.current += newChar;
        return encoded;
    }
    else {
        let refVal = reference.current;
        reference.current = refVal.slice(0, -1);
        return value;
    }
}


async function login(username, password) {
    let repo = 'https://api.github.com/repos/VincentD007/Joke-Reviews-DB/contents'
    let data = await fetch(`${repo}/Accounts/${username}.json?ref=main`)
    .then(rawData => {
        if (rawData.result = 404) {
            throw new Error("File Not Found")
        }
        rawData.json()
    })
    .catch(() => false);

    if (!data || !(data.password == password)) {
        return false;
    }

    return data;

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
