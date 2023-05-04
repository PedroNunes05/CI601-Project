window.addEventListener("load", function () {

	let search = "";

	document.querySelector("#catmaths").addEventListener("click", function () {
		search = "maths";
		cateAPI(search);
	})

	document.querySelector("#cathistory").addEventListener("click", function () {
		search = "history";
		cateAPI(search);
	})

	document.querySelector("#catgeography").addEventListener("click", function () {
		search = "geography";
		cateAPI(search);
	})

	document.querySelector("#catentertainment").addEventListener("click", function () {
		search = "entertainment";
		cateAPI(search);
	})

	document.querySelector("#catsports").addEventListener("click", function () {
		search = "sports";
		cateAPI(search);
	})

	document.querySelector("#catfun").addEventListener("click", function () {
		search = "forFun";
		cateAPI(search);
	})
});

function cateAPI(get) {
	var xmlHttp = new XMLHttpRequest();
	let category = get;
	xmlHttp.open("POST", "https://pn163.brighton.domains/CI601/php/search.php", false); // false for synchronous request
	var data = new FormData();
	data.append('cateCookie', category);
	xmlHttp.send(data);
	window.open("search.html", "_self");
}