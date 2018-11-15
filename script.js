let PATH = "https://deadpeople.herokuapp.com/" + process.env.PORT; // "http://localhost:3000/";

async function onClickAddObject() {
	let params = {
		type: document.getElementById("objectTypeInput").value,
		location: document.getElementById("objectLocationInput").value,
	}
	let url = new URL(PATH + "db-add-object");
	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    let response = await fetchAsync(url);
}

async function onClickDeleteObject() {
	let params = {
		type: document.getElementById("objectTypeInput").value,
		location: document.getElementById("objectLocationInput").value,
	}
	let url = new URL(PATH + "db-delete-object");
	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    let response = await fetchAsync(url);
}

async function fetchAsync(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
