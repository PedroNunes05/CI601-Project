window.addEventListener("load", function () {

	document.querySelector("#signIn").addEventListener("click", function () {
		window.open("signIn.html", "_self");
	})

	document.querySelector("#searchbutton").addEventListener("click", function () { 
		let searchtext = document.querySelector('#look').value;
		if (searchtext !== "") {
			seacrchButtonAPI(searchtext);
		}
	})
	signInAPI();
})

function seacrchButtonAPI(get) {
	var xmlHttp = new XMLHttpRequest();
	let search = get;
	xmlHttp.open("POST", "https://pn163.brighton.domains/CI601/php/search.php", false); // false for synchronous request
	var data = new FormData();
	data.append('searchCookie', search);
	xmlHttp.send(data);
	window.open("search.html", "_self");
}
async function signInAPI() {
	const response = await fetch(`https://pn163.brighton.domains/CI601/php/signIn.php?getCook=true`);
	const data = await response.json();
	const singIN = data;
	singIn(singIN)
}

async function singIn(singIN) {
	const signIn = document.querySelector("#signIn"),
		  accountMenu = document.querySelector("#accountMenu");
	let cookie = singIN;
		if (cookie == "yes") {
			signIn.style.display = "none";
			accountMenu.style.display = "";
		} else {
			signIn.style.display = "";
			accountMenu.style.display = "none";
		}
}


function logOut() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "https://pn163.brighton.domains/CI601/php/signIn.php", false); // false for synchronous request
	var data = new FormData();
	data.append('logOut', 'ture');
	xmlHttp.send(data);
	window.open("index.html", "_self");
}