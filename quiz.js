const quizName = document.getElementById("quizName"),
    thumbnail = document.getElementById("thumbnail"),
    description = document.getElementById("description"),
    creatorName = document.getElementById("creatorName"),
    avgScore = document.getElementById("avgScore"),
    quizWrapper = document.getElementById("quizWrapper"),
    reportForm = document.getElementById("reportForm");
let i = 0,
    correct = 0,
    totalAnswers = 0,
    quest = [],
    typeImg = [],
    answr = [],
    answr2 = [],
    answr3 = [],
    time = 0,
    remainingTime = 0,
    tableData = "",
    type = "",
    reviewScore = null,
    pauseTime = "go";

window.addEventListener("load", function () {
    sendApi();
    button = document.querySelector(".timer__btn--control");
});

async function sendApi(){
    const response = await fetch(`https://pn163.brighton.domains/CI601/php/quiz.php?quiz=true`);
	const data = await response.json();
    const quizData = data.quizData;
    searchResponse(quizData);
	//send the api and wait for a response
}

function searchResponse(quizData) {
    thumbnail.innerHTML = `<img src="${quizData.quizInfo.thumbnail === null ? "image/placeholder.png" : quizData.quizInfo.thumbnail}" alt="Quiz thumbnail" style="height:auto; width:100%; max-width:150px;">`
    quizName.innerHTML = `${String(quizData.quizInfo.name)}`;
    description.innerHTML = `${String(quizData.quizInfo.description)}`;
    creatorName.innerHTML = `Creator: ${String(quizData.quizInfo.username)}`;
    avgScore.innerHTML = `Average scrore: ${String(quizData.quizInfo.avgScore)}%`;
    time = quizData.quizInfo.duration;
    type = quizData.quizInfo.quizType;
    
    if (type === "text") {

        quizWrapper.innerHTML =
            `
            <button type="button" id="startQuiz" onclick="startQuiz()">Start Quiz</button>
            <div id="answerBox" class="answerBox" style="display: none;">
                <div class="answerInfo">
                <div class="left" id="left">
                <input id="current" class="textArea" value="" oninput="textChange(value)"></input>
                </div>
                <div class="mid">
                    <h3 id="quizScore"></h3>
                </div>
                <div class="timer" id="timer">
		        </div>
            </div>
            </div>
            <div id="tableArea"></div>
            `;
            let tableZone = document.getElementById("tableArea");
                tableZone.innerHTML =
            `
            <table id="quizTable" style="display:none;" >
               <thead>
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
               </thead>
               <tbody id="tableBody">
               </tbody>
            </table >  
            `;
            quizData.questions.map((item) => {
                quest.push(item.questionInfo.question);
                answr.push(item.questionInfo.answer1);
                if (item.questionInfo.answer2 !== undefined) {
                    answr2.push(item.questionInfo.answer2);
                } else {
                    answr2.push("");
                }
                if (item.questionInfo.answer3 !== undefined) {
                    answr3.push(item.questionInfo.answer3);
                } else {
                     answr3.push("");
                }
                tableData +=
                    `
                     <tr>
                        <td>${item.questionInfo.question}</td>
                        <td class="answer" id="${item.questionInfo.question}" value="${item.questionInfo.question}" > </td>
                     </tr>
                    `;
                totalAnswers++;
            });
        let timer = document.getElementById("timer");

        timer.innerHTML =
            `
            <span class="timer__part timer__part--minutes">00</span>
			<span class="timer__part">:</span>
			<span class="timer__part timer__part--seconds">00</span>
			<button type="button" class="timer__btn timer__btn--control" onclick="remainingTimeChange()">End</button>
        `;

        quizWrapper.innerHTML +=
            `
            <style scoped> 
            table, th, td {
	            border: 1px solid;
            }
            table {
            	border-collapse: collapse;
            	width: 100%;
                table-layout: fixed ;
            }
            td {
            	text-align: center;
            	width: 50%;
                max-width: 5%;
            	font-weight: bold;
            	border: 1px solid black;
            }
            th{
                text-align: center;
            	font-weight: bold;
            	border: 1px solid black;
            }
            tr {
            	text-align: center;
            	font-weight: bold;
            } 
            p{
                margin:0px;
            }
            #startQuiz{
                    margin: 5px;
             }
            #tableArea{
                width:50%;
                margin-left: auto;
                margin-right: auto;
            }
            .textArea{
                    display:inline-block;
                    margin: 5px;
                    width: 100%;
            }
            #quizScore{
                margin-top: 5px;
            }
            .answerInfo{
                display: grid;
                grid-template-columns: 30% 30% 30%;
                padding-left: 5%;
                margin-bottom: 15px;
            }
            .mid{
                text-align: right; 
            }
  	
        </style>
            `;
    } else if (type == "clickImage") {
        quizWrapper.innerHTML =
            `
            <button type="button" id="startQuiz" onclick="startQuiz()">Start Quiz</button>
            <br>
            <div id="answerBox" class="answerBox" style="display: none;">
                <div class="answerInfo">
                    <div class="left" id="left">
                    <h3 id="current" class="question" style="display:inline-block;"></h3>
                    <button type="button" value="prev" onclick="change(value)"><-Prev</button>
                    <button type="button" value="next" onclick="change(value)">Next-></button>
                    </div>
                    <div class="mid">
                    <h3 id="quizScore"></h3>
                    </div>
                    <div class="timer" id="timer">
		            </div>
                   
                </div>
            </div>
            `;
        quizWrapper.innerHTML +=
            `
            <div id="quizInfo" class="quizInfo">
             </div>
            `

        let quizDisplay = document.getElementById("quizInfo"),
            timer = document.getElementById("timer");
        quizData.questions.map((item) => {
            quest.push(item.questionInfo.question);
            answr.push(item.questionInfo.answer1);
            quizDisplay.innerHTML +=
                `
                    <div class="imgContainer" id="${String(item.questionInfo.answer1)}" onclick="clickImage(id)">
                    <img class="img" src="${item.questionInfo.answer1}" alt="Image to match the text with">
                    <p id="${item.questionInfo.question}"></p>
                    </div>
                `;
            totalAnswers++;
        });
        timer.innerHTML =
            `
            <span class="timer__part timer__part--minutes">00</span>
			<span class="timer__part">:</span>
			<span class="timer__part timer__part--seconds">00</span>
			<button type="button" class="timer__btn timer__btn--control" onclick="remainingTimeChange()">End</button>
        `;
        quizWrapper.innerHTML +=
            `
            <style scoped> 
            p{
                margin:0px;
            }
            #startQuiz{
                    margin: 5px;
             }
            .answerBox{
                    margin: 5px;
            }
            .answerInfo{
                display: grid;
                grid-template-columns: 30% 30% 30%;
                padding-left: 5%;
                margin-bottom: 15px;
            }
            .mid{
                text-align: right; 
            }
            .quizInfo{
                width: 90%;
                margin-top: 5px;
                margin-left: auto;
                display: grid;
                grid-template-columns: 30% 30% 30%;
            }
            .imgContainer {
                display: block;
				width: 100%;
				float: left;
                text-align: center; 
                margin-bottom: 15px;
                font-weight: 900;
			}
            .img {
                height: 300px;
                width: 100%;
            }
            @media screen and (max-width: 61.875em){
                    .quizInfo{
                width: 90%;
                margin-top: 5px;
                margin-left: auto;
                margin-right: auto;
                display: grid;
                grid-template-columns: 50% 50% ;
            }
            @media screen and (max-width: 31.25em) {
                	.quizInfo{
                width: 90%;
                margin-top: 5px;
                margin-left: auto;
                margin-right: auto;
                display: grid;
                grid-template-columns: 100%;
            }
        </style>
            `
    } else if (type === "typeImage") {
        quizWrapper.innerHTML =
            `
            <button type="button" id="startQuiz" onclick="startQuiz()">Start Quiz</button>
            <br>
            <div id="answerBox" class="answerBox" style="display: none;">
                <div class="answerInfo">

                    <div class="left" id="left">
                        <input id="current" class="answerbox" value="" oninput="imageChange(value)" style="display:inline-block;"></input>
                        <button type="button" value="prev" onclick="change(value)"><-Prev</button>
                        <button type="button" value="next" onclick="change(value)">Next-></button>
                    </div>

                    <div class="mid">
                        <h3 id="quizScore"></h3>
                        </div>

                    <div class="timer" id="timer">
		            </div>

                </div>
            </div>
            `;
            quizData.questions.map((item) => {

                quest.push(item.questionInfo.question);
                typeImg.push(item.questionInfo.question);
                answr.push(item.questionInfo.answer1);
                if (item.questionInfo.answer2 !== undefined) {
                    answr2.push(item.questionInfo.answer2);
                } else {
                    answr2.push("");
                }
                if (item.questionInfo.answer3 !== undefined) {
                    answr3.push(item.questionInfo.answer3);
                } else {
                    answr3.push("");
                }
                quizWrapper.innerHTML +=
                    `
                    <div class="imgContainer" id="${String(item.questionInfo.question)}" style="display:none;">
                    <img src="${item.questionInfo.question}" alt="Image to match the text with" style="height:auto; width:100%; max-width:500px;">
                    <p id="${i}" class="answer" style="display:none;"></p>
                    </div>
                `;
            i++;
            totalAnswers++;
            });
        i = 0;
        let timer = document.getElementById("timer");
        timer.innerHTML =
            `
            <span class="timer__part timer__part--minutes">00</span>
			<span class="timer__part">:</span>
			<span class="timer__part timer__part--seconds">00</span>
			<button type="button" class="timer__btn timer__btn--control" onclick="remainingTimeChange()">End</button>
        `;
        quizWrapper.innerHTML +=
            `
            <style scoped> 
            p{
                margin:0px;
            }
            #startQuiz{
                    margin: 5px;
             }
            .answerInfo{
                display: grid;
                grid-template-columns: 30% 30% 30%;
                padding-left: 5%;
                margin-bottom: 15px;
            }
            .answerBox{
                    margin: 5px;
            } 
            #quizScore{
                margin-top: 5px;
            }
            .mid{
                text-align: right; 
            }
            .imgContainer {
                display: block;
				width: 100%;
				float: left;
                text-align: center; 
                margin-bottom: 15px;
                font-weight: 900;
			}
            .img {
                height: auto;
                width: 100%;
            }
        </style>
            `
    }
}
function reportQuiz() {
    const element = document.getElementById("reportForm");
    const cssObj = window.getComputedStyle(element, null);
    let display = cssObj.getPropertyValue("display");
    if (display == "none") {
        reportForm.style.display = "block";
    } else {
        reportForm.style.display = "none";
    }
}

function change(get) {
    if (type == "clickImage") {
       let answerbox = document.getElementById("current");
        if (get == "next") {
            if (i == quest.length - 1) {
                i = 0;
                answerbox.innerHTML = quest[i];
            } else {
                i++;
                answerbox.innerHTML = quest[i];
            }

        } else if (get == "prev") {
            if (i == 0) {
                i = quest.indexOf(quest[quest.length - 1]);
                answerbox.innerHTML = quest[i];
            } else {
                i--;
                answerbox.innerHTML = quest[i];
            }
        }
    } else if (type == "typeImage") {
        let inputBox = document.getElementById("current");
        if (get == "next") {
            if (i == typeImg.length - 1) {
                let answerbox = document.getElementById(typeImg[i]);
                answerbox.style.display = "none";
                i = 0;
                inputBox.value = "";
                answerbox = document.getElementById(typeImg[i]);
                answerbox.style.display = "block";

            } else {
                let answerbox = document.getElementById(typeImg[i]);
                answerbox.style.display = "none";
                i++;
                inputBox.value = "";
                answerbox = document.getElementById(typeImg[i]);
                answerbox.style.display = "block";

            }

        } else if (get == "prev") {
            if (i == 0) {
                let answerbox = document.getElementById(typeImg[i]);
                answerbox.style.display = "none";
                i = typeImg.indexOf(typeImg[typeImg.length - 1]);
                inputBox.value = "";
                answerbox = document.getElementById(typeImg[i]);
                answerbox.style.display = "block";

            } else {
                let answerbox = document.getElementById(typeImg[i]);
                answerbox.style.display = "none";
                i--;
                inputBox.value = "";
                answerbox = document.getElementById(typeImg[i]);
                answerbox.style.display = "block";

            }
        }
    }
}
function startQuiz() {
    document.getElementById("startQuiz").style.display = "none";
    document.getElementById("answerBox").style.display = "block";
    document.getElementById("quizScore").innerText = correct + "/" + totalAnswers;
    if (type == "text") {

        let table = document.getElementById("quizTable");
        table.style.display = "block";

        let tableInfo = document.getElementById("tableBody");
        tableInfo.innerHTML += tableData;
          
    } else if (type == "clickImage") {

        let answerbox = document.getElementById("current");
        i = Math.floor(Math.random() * totalAnswers);
        answerbox.innerHTML = quest[i];

    } else if (type == "typeImage") {

        let img = document.getElementById(quest[i]);
        img.style.display = "block";
    }
    quizTimer();
}
function quizTimer() {

    let mins = document.querySelector(".timer__part--minutes"),
        sec = document.querySelector(".timer__part--seconds");
    remainingTime = (time * 60);

    upDateTimer();

    function upDateTimer() {
        if(pauseTime == "stop") {
            return;
        }   
        const minutes = Math.floor(remainingTime / 60),
            seconds = remainingTime % 60;
        mins.textContent = minutes.toString().padStart(2, "0");
        sec.textContent = seconds.toString().padStart(2, "0");
    }
    let timeDown = setInterval(() => {
        if (remainingTime === 0) {
            b = quest.length;

            if (type === "text") {
                for (j = 0; j < b; j++) {

                    answerArea = document.getElementById(quest[j]);
                    let text = answr[j];
                    if (answerArea.textContent == text) {
                        return
                    }
                    answerArea.textContent = text;
                    answerArea.style.color = "red";
                }  
            } else if (type === "clickImage") {
                for (j = 0; j < b; j++) {
                    answerText = document.getElementById(quest[j]);
                    answerText.innerText = quest[j];
                    let imgClicked = document.getElementById(answr[j]);

                    imgClicked.onclick = null;
                    answerText.style.color = "red"
                    answerText.style.display = "block";

                }
            } else if (type === "typeImage") {
                for (j = 0; j < b; j++) {
                    let output = document.getElementById(j);
                    if (output.textContent.length == 0) {
                        output.textContent = answr[j];
                        output.style.display = "block";
                        output.style.color = "red";
                    }    
                }
            }

            quest.splice(0, b);
            answr.splice(0, b);
            endTime();
            sendData();
            return;
        }
        remainingTime--;
        upDateTimer();   
    }, 1000);

    function endTime() {
        clearInterval(timeDown)
    }
}
function remainingTimeChange() {
    remainingTime = 1;
}
function imageChange(get) {
    let imgArea = document.querySelectorAll(".imgContainer"),
        imgChild;
    typed = get;
    if (typed.length > 0) {
        for (a = 0; a < imgArea.length; a++) {
            let element = imgArea[a];
            let cssObj = window.getComputedStyle(element, null);
            let display = cssObj.getPropertyValue("display");
            if (display == "block") {
                imgArea[a];
                for (b = 0; b < imgArea[a].childNodes.length; b++) {
                    imgChild = imgArea[a].childNodes[b];
                    if (imgChild.nodeName == "P") {
                        if (typed == answr[i]) {
                            let output = document.getElementById(i);
                            if (output.textContent.length > 0) {
                                if (output.textContent == typed) {
                                    return;
                                } else if (output.textContent == answr2[i]) {
                                    return;
                                } else if (output.textContent == answr3[i]) {
                                    return;
                                }
                            }
                            output.textContent = typed;
                            output.style.display = "block";
                            output.style.color = "green";
                            correct++;
                            document.getElementById("quizScore").innerText = correct + "/" + totalAnswers;

                            sendData();
                        } else if (typed == answr2[i]) {
                            let output = document.getElementById(i);
                            if (output.textContent.length > 0) {
                                if (output.textContent == typed) {
                                    return;
                                } else if (output.textContent == answr[i]) {
                                    return;
                                } else if (output.textContent == answr3[i]) {
                                    return;
                                }
                            }
                            output.textContent = typed;
                            output.style.display = "block";
                            output.style.color = "green";
                            correct++;
                            document.getElementById("quizScore").innerText = correct + "/" + totalAnswers;

                            sendData();
                        } else if (typed == answr3[i]) {
                            let output = document.getElementById(i);
                            if (output.textContent.length > 0) {
                                if (output.textContent == typed) {
                                    return;
                                } else if (output.textContent == answr[i]) {
                                    return;
                                } else if (output.textContent == answr2[i]) {
                                    return;
                                }
                            }
                            output.textContent = typed;
                            output.style.display = "block";
                            output.style.color = "green";
                            correct++;
                            document.getElementById("quizScore").innerText = correct + "/" + totalAnswers;

                            sendData();
                        }
                    }
                }
            } 
        }
    }
}
function textChange(get) {
    let answerArea = document.querySelectorAll(".answer");
    typed = get;
    if (typed.length > 0) {
        for (a = 0; a < answerArea.length; a++) {
            if (typed == answr[a]) {

                answerArea = document.getElementById(quest[a]);
                let text = answr[a];
                if (answerArea.textContent == text) {
                    return
                }
                answerArea.textContent = text;
                answerArea.style.color = "green";
                correct++;

                document.getElementById("quizScore").innerText = correct + "/" + totalAnswers;
                sendData();

            } else if (typed == answr2[a]) {

                answerArea = document.getElementById(quest[a]);
                let text = answr2[a];
                if (answerArea.textContent == text) {
                    return
                }
                answerArea.textContent = text;
                answerArea.style.color = "green";
                correct++;
                document.getElementById("quizScore").innerText = correct + "/" + totalAnswers;

                sendData();

            } else if (typed == answr3[a]) {

                answerArea = document.getElementById(quest[a]);
                let text = answr3[a];
                if (answerArea.textContent == text) {
                    return
                }
                answerArea.textContent = text;
                answerArea.style.color = "green";
                correct++;
                document.getElementById("quizScore").innerText = correct + "/" + totalAnswers;

                sendData();

            }
        }
    }
}
function clickImage(get) { 
    const element = document.getElementById("startQuiz");
    const cssObj = window.getComputedStyle(element, null);
    let display = cssObj.getPropertyValue("display");
    if (display == "inline-block") {
        return;
    } else {
    
    let clicked = get,
        answer = answr[i],
        question = quest[i],
        answerbox = document.getElementById("current");
        let imgClicked = document.getElementById(get);

    if (clicked == answer) {
        let answerText = document.getElementById(question);

        correct++;
        document.getElementById("quizScore").innerText = correct + "/" + totalAnswers;

        answerText.innerText = question;
        if (i == quest.length - 1) {
            quest.splice(i, 1);
            answr.splice(i, 1);
            i = Math.floor(Math.random() * quest.length);

            answerbox.innerHTML = quest[i];

            imgClicked.onclick = null;
            answerText.style.color = "green";
            answerText.style.display = "block";

            sendData();

        } else {
            quest.splice(i, 1);
            answr.splice(i, 1);

            i = Math.floor(Math.random() * quest.length);
            answerbox.innerHTML = quest[i];

            imgClicked.onclick = null;
            answerText.style.color = "green";
            answerText.style.display = "block";

            sendData();
        } 
        
    } else {
        
        let j = 0;
        while (clicked != answer) { 
            answer = answr[j]
            j++
        }
        
        let b = answr.indexOf(answer),
        answerText = document.getElementById(quest[b]);
        answerText.innerText = quest[j-1];

        quest.splice(b, 1);
        answr.splice(b, 1);

        i = quest.indexOf(answerbox.innerText);

        imgClicked.onclick = null;
        answerText.style.color = "red"
        answerText.style.display = "block";
        sendData(); 
    }
    }
}
function review() {
    sendData("true");
}
function sendData(get) {
    let rating = document.getElementById("reviewScore");

    if (type == "text") {
        if (correct == totalAnswers) {
            quest.splice(0, quest.length);
        }
    }
    if (type == "typeImage") {
        if (correct == totalAnswers) {
            quest.splice(0, quest.length);
        }
    }
    if (quest.length == 0) {
        let reviewZone = `
            <div id="review">
			<select id="reviewScore" name="reviewScore" onchange="review()">
				<option value="" selected>Choose a rating for the quiz</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
			<button type="button" onclick="review()">Skip</button>
		    </div>
            `;
        document.getElementById("left").innerHTML = reviewZone;
        pauseTime = "stop";
    }
    if (get != null) {
        if (type === "text") {
            document.getElementById("left").innerHTML =
                `
                    <h3>Quiz Completed</h3>
                `;     

        } else if (type === "clickImage") {
            document.getElementById("left").innerHTML =
                `
                    <h3 id="current" class="answerbox" value="" style="display:inline-block;">Quiz Completed</h3>
                `;  
        } else if (type === "typeImage") {
            document.getElementById("left").innerHTML =
                `
                    <h3 id="current" class="answerbox" value="" style="display:inline-block;">Quiz Completed</h3>
                    <button type="button" value="prev" onclick="change(value)"><-Prev</button>
                    <button type="button" value="next" onclick="change(value)">Next-></button>
                `;  
        }
        if (rating.value.length > 0) {
            reviewScore = rating.value;
        }
        let score = (correct / totalAnswers) * 100;
        send = "score=" + score + "&correctAnswers=" + correct;

        if (review != null) {
            send += "&review=" + reviewScore;
        }
        const xhr = new XMLHttpRequest();
        xhr.open("POST", 'https://pn163.brighton.domains/CI601/php/quiz.php', false);
        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(send);
    }
}
