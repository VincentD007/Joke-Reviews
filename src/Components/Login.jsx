import React, { useState, useEffect , useRef} from 'react';

export default function Login() {
    const [user, setUser] = useState({})

    
    return (
        <>
        <h1>Jokes Login</h1>
        <form onSubmit={
            (event) => {
                event.preventDefault()
            }
        }>
        
        </form>
        </>

    )
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
//     savedjokes: [3, 7, 3, 10, 56]
// }
