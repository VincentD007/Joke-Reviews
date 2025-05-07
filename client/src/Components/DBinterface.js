export default async function updateMemes(username, memes, token) {
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

