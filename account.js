const content = document.getElementById("content");

window.addEventListener("load", function () {
    sendApi();
});

async function sendApi(){
    const response = await fetch(`https://pn163.brighton.domains/CI601/php/account.php?account=true`);
	const data = await response.json();
    const account = data.account;
	searchResponse(account);
	//send the api and wait for a response
}

async function searchResponse(account){
    account.accountInfo.map((item) => {
        content.innerHTML +=
        `
        <div class="acc">
             <p class="title">
              Username: ${String(item.username)}
              </p>
              <p class="email">
              Email: ${String(item.email)}
              </p>
              <p class="avgScore">
              Your average quiz Score: ${String(item.avgScore)} ${(String(item.avgScore) === "No quiz has been taken") ? " ": "%"}
              </p>
              <p>
              Number of completed quizzes: ${String(item.completedQuiz)}
              </p>
         </div>
         <button class="accountButton" id="quizHistory" value="history" onclick="buttonClick(value)">Your History</button> <br>
         <button class="accountButton" id="yourQuizzies" value="yourQuizz" onclick="buttonClick(value)">Your Quizzies</button>
         `;
    })
    content.innerHTML +=
        `
        <style scoped>
            .acc{
            font-weight: bolder;
            }
            .accountButton{
            margin: 5px 5px 5px 5px;
            }      
        </style>
        `;
}
function buttonClick(get) {
    let input = get;
    console.log(input);
    let back = ".html"
    let page = input.concat(back);
    window.open(page, "_self");
}