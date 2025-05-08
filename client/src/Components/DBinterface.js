async function updateMemes(username, memes, token) {
    try {
        let sha = await GetUserData(username, 'sha');
        let url = "http://localhost:3001/JokeAccounts";
        
        let body = {
            username: username,
            token: token,
            updatedata: {
                sha: sha,
                memes: memes
            }
        }


        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        }
    )
    .then(rawData => rawData.json())
    return response;

    }catch (error) {
        console.error("Error fetching memes:", error);
        throw error;
    }
};


async function GetUserData(username, type='memes') {
    if (type !== 'memes' && type !=='sha') {throw new Error("Invalid fetch type argument")};
    
    try {
        let url = "https://api.github.com/repos/VincentD007/Joke-Reviews-DB/contents/Accounts"
        let data = await fetch(`${url}/${username}.json`, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github+json',
            }
        });

        let jsonified = await data.json();
        if (type !== 'memes') {
            return jsonified.sha;
        };

        return JSON.parse(atob(jsonified.content)).SavedMemes;
        
    }catch (error) {
        console.error("Error fetching memes:", error);
        throw error;
    }
}


async function LoadGlobalChat(token, previousETAG) {
    const url = "https://api.github.com/repos/VincentD007/Joke-Reviews-DB/contents/GlobalChat/history.json";
    let headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github+json',
    }

    if (previousETAG) {
        headers['If-None-Match'] = previousETAG;
    }

    let response = await fetch(url, {
        headers: headers
    })

    if (response.status == 304) {
        return {
            json: null, 
            etag: previousETAG
        };
    }
    else if (!response.ok) {
        throw new Error("Something Went Wrong")
    }
    
    let data = await response.json()
    let etag = response.headers.get('etag')
    let content = {
        json: JSON.parse(atob(data.content)), 
        etag: etag,
        sha: data.sha
    }
    return content;
}


async function SendGlobalMsg( username, message, token ) {
    let url = "http://localhost:3001/GlobalChatHistory";
    let data = await LoadGlobalChat(token, null);

    let chatHistory = data.json;
    chatHistory.push({username: username, comment: message});

    let body = {
        updatedHistory: chatHistory,
        sha: data.sha,
        token: token
    }
    try {
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    }
    catch(Error) {
        console.log(`Client Error: ${Error}`)
    }
}


export {updateMemes, GetUserData, LoadGlobalChat, SendGlobalMsg};
