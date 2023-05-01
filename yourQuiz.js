const content = document.getElementById("content");

window.addEventListener("load", function () {
    sendApi();
});

async function sendApi(){
    const response = await fetch(`https://pn163.brighton.domains/CI601/php/yourQuiz.php?getYourQuiz=true`);
	const data = await response.json();
    const yourQuiz = data.yourQuiz;
    searchResponse(yourQuiz);
	//send the api and wait for a response
}

async function searchResponse(yourQuiz){
    yourQuiz.quizInfo.map((item) => {
        content.innerHTML +=
            `
        <div class="quizInfo"> 
			<div class="item">
            <div>
            <img class="quizImg" src="${item.quiz.thumbnail === null ? "image/placeholder.png" : item.quiz.thumbnail}" alt="Quiz thumbnail">
            </div>
            <div class="quizDetail">
                    <p class="title">
                    ${String(item.quiz.name)}
                    </p>
                    <p class="med">
                    Category: ${String(item.quiz.category)}
                    </p>
                    <p class="med">
                    Description: ${String(item.quiz.description)}
                    </p>
                    <p class="med">
                    Quiz Type: ${String(item.quiz.quizType)}
                    </p>
                    <p class="smaller">
                    Attempts: ${String(item.quiz.attempts)} Average Score: ${String(item.quiz.avgScore)}
                    </p>
                    <p class="smaller">
                    Review: ${String(item.quiz.quizReview)}/5 Date Created: ${String(item.quiz.dateCreated)}
                    </p>
                </div>
            </div>
        </div>
         `;
    })
    content.innerHTML +=
        `
        <style scoped>
            p{
            margin: 0px;
            }
            .container{
            display: grid;
            grid-column-gap: 10%;
            grid-template-columns: 40% 40%;
            margin-bottom: 15px;
            padding-left: 5%;
            grid-row-gap: 10px;
            }
            .title{
            font-size: 30px;
            font-weight: bold;
            margin: 5% 0px 5% 0px;
            }
            .med{
            font-size: 25px;
            margin: 5% 0px 5% 0px;
            }
            .smaller{
            font-size: 15px;
            margin: 5% 0px 5% 0px;
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
            .quizInfo {
             background-color: LightBlue;
             width: 100%; 
             height:auto; 
             float: left;
            }
            .item{
            padding-right: 10px;
            }
            .quizDetail{
            display: inline-block; 
            text-align: left; 
            font-weight: bold; 
            }
            @media screen and (max-width: 100em){
                    .quizImg{
                    width: 100%;
                    height: auto;
                    max-width: 600px;
                    max-height: 300px;
                    margin: 5px 5px 5px 5px;
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
                	.quizInfo {
		            width: 100%;
	                } 
                    .title{
                    font-size: 25px;
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

