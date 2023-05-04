const content = document.getElementById("content"),
    small = document.getElementById("small"),
    response = document.getElementById("response");
let i = 0;
let rad = "";

function radChange(get) {
    rad = get;
    content.innerHTML = "";
    i = 0;
}
function addQuestion() {
    small.style.display = "block";
    small.style.fontWeight = "bold";

    i++;
    if (rad ==="") {
        small.innerText = "To add questions you must choose a quiz type";
        small.style.color = "red";
    } else { 
        small.innerText = "*Mutliple answers is optional*";
        small.style.color = "";
    if (rad === "text") {
        var question=
            `
        <div class="questions" id="questions${i}">
        <label class="questLabel" for="question">Question</label>
        <input class="questInput" type="text" id="question${i}" name="question[${i}][questions]" required><br>
        <label class="questLabel" for="answer1${i}">Answer 1</label>
        <input class="questInput" type="text" id="answer1${i}" name="question[${i}][answer1]" required><br>
        <label class="questLabel" for="answer2${i}">Answer 2</label>
        <input class="questInput" type="text" id="answer2${i}" name="question[${i}][answer2]"><br>
        <label class="questLabel" for="answer3${i}">Answer 3</label>
        <input class="questInput" type="text" id="answer3${i}" name="question[${i}][answer3]"><br>
        <button class="removeButton" type="button" id="${i}" value="questions${i}" onclick="removeQuestion(value)">Remove Question</button>
        
        <style scoped>
            input, select {
	         -webkit-box-sizing: border-box;
	         -moz-box-sizing: border-box;
	         box-sizing: border-box;
            }
            .questLabel {
	        margin-top: 5px;
	        display: inline-block;
	        width: 20%;
            }

            .questInput {
	        margin-top: 5px;
	        display: inline-block;
	        width: 30%;
            }

            .questions{
            background-color: LightBlue;
            width: 50%;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 5px;
            padding: 5px;
            }
            .removeButton{
            margin: 5px 5px 5px 5px;
            }
            @media screen and (max-width: 25em) {
                .questions{
                display: flex;
		        flex-direction: column;
                }
                .questLabel {
                width:100%;
                }
                .questInput {
                width:100%;
                }
            }
        </style>
        </div>
        `;
        content.insertAdjacentHTML("beforeend", question);
    } else if (rad === "clickImage") {
        var question =
            `
            <div class="questions" id="questions${i}">
            <label  class="questLabel" for="question">Question</label>
            <input class="questInput"  type="text" id="question${i}" name="question[${i}][questions]" required><br>
            <label  class="questLabel" for="answer1${i}">Image for question</label>
			<input class="questInput"  type ="file" id="answer1${i}" name="question[${i}][answer1]" accept="image/*" required><br>
            <button class="removeButton" type="button" id="${i}" value="questions${i}" onclick="removeQuestion(value)">Remove Question</button>

            <style scoped>
            input, select {
	         -webkit-box-sizing: border-box;
	         -moz-box-sizing: border-box;
	         box-sizing: border-box;
            }
            .questLabel {
	        margin-top: 5px;
	        display: inline-block;
	        width: 20%;
            }

            .questInput {
	        margin-top: 5px;
	        display: inline-block;
	        width: 30%;
            }

            .questions{
            background-color: LightBlue;
            width: 50%;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 5px;
            padding: 5px;
            }
            .removeButton{
            margin: 5px 5px 5px 5px;
            }
            @media screen and (max-width: 25em) {
                .questions{
                display: flex;
		        flex-direction: column;
                }
                .questLabel {
                width:100%;
                }
                .questInput {
                width:100%;
                }
            }
        </style>
            </div>
            `;
       content.insertAdjacentHTML("beforeend", question);
    } else if (rad === "typeImage") {
        var question = 
            `
            <div class="questions" id="questions${i}">
            <label class="questLabel" for="question">Question</label>
			<input class="questInput" type ="file" id="question${i}" name="question[${i}][questions]" accept="image/*"><br>
            <label class="questLabel" for="answer1${i}">Answer 1</label>
            <input class="questInput" type="text" id="answer1${i}" name="question[${i}][answer1]" required><br>
            <label class="questLabel" for="answer2${i}">Answer 2</label>
            <input class="questInput" type="text" id="answer2${i}" name="question[${i}][answer2]"><br>
            <label class="questLabel" for="answer3${i}">Answer 3</label>
            <input class="questInput" type="text" id="answer3${i}" name="question[${i}][answer3]"><br>
            <button class="removeButton" type="button" id="${i}" value="questions${i}" onclick="removeQuestion(value)">Remove Question</button>

            <style scoped>
            input, select {
	         -webkit-box-sizing: border-box;
	         -moz-box-sizing: border-box;
	         box-sizing: border-box;
            }
            .questLabel {
	        margin-top: 5px;
	        display: inline-block;
	        width: 20%;
            }

            .questInput {
	        margin-top: 5px;
	        display: inline-block;
	        width: 30%;
            }

            .questions{
            background-color: LightBlue;
            width: 50%;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 5px;
            padding: 5px;
            }
            .removeButton{
            margin: 5px 5px 5px 5px;
            }
            @media screen and (max-width: 25em) {
                .questions{
                display: flex;
		        flex-direction: column;
                }
                .questLabel {
                width:100%;
                }
                .questInput {
                width:100%;
                }
            }
        </style>
            </div> <br>
            `;
        content.insertAdjacentHTML("beforeend", question);
        } 
    }
}
function removeQuestion(get) {
    let id = get;
    content.removeChild(document.getElementById(id));
    let totalQuestions = document.querySelectorAll('.questions').length;
    if (totalQuestions != i) {
        document.querySelectorAll('.questions').forEach(function () {

            let questBoxNum = 1;
            for (j = 1; j <= i; j++) {
                if (typeof document.getElementById("questions" + j) != "undefined") {
                    let Questbox = document.getElementById("questions" + j),
                        removeBut = document.getElementById(j);
                    if (Questbox != null) {
                        Questbox.setAttribute("id", "questions" + questBoxNum);
                        removeBut.setAttribute("id", questBoxNum);
                        removeBut.setAttribute("value", "questions" + questBoxNum);
                        questBoxNum++;
                    }
                }
            }

            let realQuesNum = 1,
                realAsnw1 = 1
            realAsnw2 = 1
            realAsnw3 = 1;

            for (j = 1; j <= i; j++) {
                if (typeof document.getElementById("question" + j) != "undefined") {
                    let inputName = document.getElementById("question" + j);
                    if (inputName != null) {
                        inputName.setAttribute("id", "question" + realQuesNum);
                        inputName.setAttribute("name", "question[" + realQuesNum + "][questions]");
                        realQuesNum++;
                    }
                }
                if (typeof document.getElementById("answer1" + j) != "undefined") {
                    let inputName = document.getElementById("answer1" + j);
                    if (inputName != null) {
                        inputName.setAttribute("id", "answer1" + realAsnw1);
                        inputName.setAttribute("name", "question[" + realAsnw1 + "][answer1]");
                        realAsnw1++;
                    }
                }
                if (typeof document.getElementById("answer2" + j) != "undefined") {
                    let inputName = document.getElementById("answer2" + j);
                    if (inputName != null) {
                        inputName.setAttribute("id", "answer2" + realAsnw2);
                        inputName.setAttribute("name", "question[" + realAsnw2 + "][answer2]");
                        realAsnw2++;
                    }
                }
                if (typeof document.getElementById("answer3" + j) != "undefined") {
                    let inputName = document.getElementById("answer3" + j);
                    if (inputName != null) {
                        inputName.setAttribute("id", "answer3" + realAsnw3);
                        inputName.setAttribute("name", "question[" + realAsnw3 + "][answer3]");
                        realAsnw3++;
                    }
                }
            }
        });

        i = document.querySelectorAll('.questions').length;
    }
}
function sendQuiz() {
    let quizName = document.getElementById("quizName").value,
        categ = document.getElementById("categ").value,
        quizType = document.getElementById("type").value,
        duration = document.getElementById("duration").value,
        description = document.getElementById("description").value,
        thumbnail = document.getElementById("thumbnail").files[0];
    if (quizName != null && categ != null && quizType != null && description != null && duration != null) {
        let formData = new FormData();
        formData.append("quizName", quizName);
        formData.append("category", categ);
        formData.append("quizType", quizType);
        formData.append("description", description);
        formData.append("duration", duration);
        if (thumbnail != null) {
            formData.append("thumbnail", thumbnail);
        }
        if (quizType == "text") {
            for (j = 0; j <= i; j++) {
                let questNum = document.getElementById("questions"+j);
                if (questNum === null) {
                } else {
                    let question = document.getElementById("question" + j).value,
                        answer1 = document.getElementById("answer1" + j).value,
                        answer2 = document.getElementById("answer2" + j),
                        answer3 = document.getElementById("answer3" + j);
                    formData.append("question[" + j + "][questions]", question);
                    formData.append("question[" + j + "][answer1]", answer1);
                    if (answer2 != null) {
                        formData.append("question[" + j + "][answer2]", answer2.value);
                    }
                    if (answer3 != null) {
                        formData.append("question[" + j + "][answer3]", answer3.value);
                    }
                }
            }
        } else if (quizType == "clickImage") {
            for (j = 0; j <= i; j++) {
                let questNum = document.getElementById(j)
                if (questNum === null) {
                } else {
                    let question = document.getElementById("question" + j).value,
                        answer1 = document.getElementById("answer1" + j).files[0];
                    formData.append("question[" + j + "][questions]", question);
                    formData.append("question[" + j + "][answer1]", answer1);
                }
            }
        } else if (quizType == "typeImage") {
            for (j = 0; j <= i; j++) {
                let questNum = document.getElementById(j);
                if (questNum === null) {
                } else {
                    let question = document.getElementById("question" + j).files[0],
                        answer1 = document.getElementById("answer1" + j).value,
                    answer2 = document.getElementById("answer2" + j),
                        answer3 = document.getElementById("answer3" + j);
                    formData.append("question[" + j + "][questions]", question);
                    formData.append("question[" + j + "][answer1]", answer1);
                    if (answer2 != null) {
                        formData.append("question[" + j + "][answer2]", answer2.value);
                    }
                    if (answer3 != null) {
                        formData.append("question[" + j + "][answer3]", answer3.value);
                    }
                }
            }
        }
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "https://pn163.brighton.domains/CI601/php/createQuiz.php", true);
        xmlHttp.send(formData);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == XMLHttpRequest.DONE) {
                response.innerText = xmlHttp.responseText;
            }
        }
    } 

}
