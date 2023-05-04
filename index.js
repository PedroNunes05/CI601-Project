const content = document.getElementById("content");

window.addEventListener("load", function () {
    sendApi();
});

async function sendApi(){
	const response = await fetch(`https://pn163.brighton.domains/CI601/php/home.php?rating=4`);
	const data = await response.json();
	const quizzes = data.quizzes;
	searchResponse(quizzes);
	//send the api and wait for a response
}

async function searchResponse(quizzes){
    quizzes.quizData.map((item) => {
        content.innerHTML +=
        `
        <button value="${String(item.quiz.id)}" class="quizButton" onclick="buttonClick(value)"> 
			<div class="item">
            <div>
            <img class="quizImg" src="${item.quiz.thumbnail === null ? "image/placeholder.png" : item.quiz.thumbnail}" alt="Quiz thumbnail">
            </div>
            <div class="text">
                    <p class="title">
                    ${String(item.quiz.name)}
                    </p>
                    <p class="med">
                    Category: ${String(item.quiz.category)}
                    </p>
                    <p class="med">
                    Description: ${String(item.quiz.description)}
                    </p>
                    <p class="smaller">
                    Attempts: ${String(item.quiz.attempts)}  
                    Rating: ${String(item.quiz.quizReview)}/5
                    </p>
                </div>
            </div>
        </button>
         `;
    })
    content.innerHTML +=
        `
        <style scoped>
            .container{
            display: grid;
            grid-column-gap: 10%;
            grid-template-columns: 40% 40%;
            margin-bottom: 15px;
            padding-left: 5%;
            grid-row-gap: 10px;
            }
            .text{
            display: inline-block; 
            text-align: left; 
            font-weight: bold; 
            width: 55%;
            }
            .title{
            font-size: 30px;
            font-weight: bold;
            }
            .med{
            font-size: 25px;
            }
            .smaller{
            font-size: 15px;
            }
            .quizImg{
            height:300px;
            width:40%;
            max-width: 300px; 
            min-width: 100px;
            float: left; 
            margin: 5px 5px 5px 5px; 
            font-weight: bold;
            }
            .quizButton {
             width: 100%; 
             height:auto; 
             float: left;
            }
            @media screen and (max-width: 100em){
                    .quizImg{
                    width: 100%;
                    height: auto;
                    max-width: 600px;
                    max-height: 300px;
                    margin: 5px 5px 5px 5px;
                    }
                    .text{
                    width: 100%;
                    }
            }
            @media screen and (max-width: 61.875em){
                    .quizImg{
                    width: 100%;
                    height: auto;
                    max-height: 200px;
                    margin: 5px 5px 5px 5px;
                    }
            }
            @media screen and (max-width: 31.25em) {
                    .container{
                    display: grid;
                    grid-column-gap: 10%;
                    grid-template-columns: 90%;
                    margin-bottom: 15px;
                    padding-left: 5%;
                    grid-row-gap: 10px;
                    }
                	.quizButton {
		            width:100%;
	                } 
                    .title{
                    font-size: medium;
                    font-weight: bold;
                    }
                    .quizImg{
                    width: 100%;
                    height: auto;
                    margin: 5px 5px 5px 5px;
                    }
            }
        </style>
        `
}

function randomButton() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "https://pn163.brighton.domains/CI601/php/quiz.php", false); // false for synchronous request
    xmlHttp.send("quizID=random");
    window.open("quiz.html", "_self");
}
function buttonClick(get) {
    var xmlHttp = new XMLHttpRequest();
    let id = get;
    xmlHttp.open("POST", "https://pn163.brighton.domains/CI601/php/quiz.php", false); // false for synchronous request
    xmlHttp.send("quizID =" + id);
    window.open("quiz.html", "_self");
}