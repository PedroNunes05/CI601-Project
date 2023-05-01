<?php
    class MyAPI {

        public function handleRequest() {

            $mysqli = new mysqli("brighton", "pn163_CI601project","CI601project","pn163_project"); //Connect to database

            if($mysqli->connect_errno){
                //If there is no connections it sends repsonse code 500 and ends
                http_response_code(500);
                exit();

            } else {

                if(isset($_POST["quizID"])) {

                    if($_POST["quizID"]  == "random"){
                        $sql = "SELECT quizID FROM tQuiz ORDER BY RAND() LIMIT 1";
                        $result = $mysqli->query($sql);
                        foreach($result as $row){
                            $quizID = $row["quizID"];
                            setcookie("quizID", $quizID, time()+60*60, "/");
                        }
                    } else {
                        $quizID = $mysqli -> real_escape_string($_POST["quizID"]);
                        setcookie("quizID", $quizID, time()+60*60, "/");
                    }
                } else if(isset($_GET["quiz"])){
                    $quizID = $_COOKIE["quizID"];
                    $quizsql = "select * from tQuiz inner JOIN tUser ON tUser.userID = tQuiz.creatorID where quizID ='". $quizID . "'";
                    $result = $mysqli->query($quizsql);
                    $sendArray = array();
                    $quizarray = array();
                    $questionarray = array();
                    foreach($result as $row){
                        $quizarray = array(
                            "name" => $row["quizName"],
                            "username" => $row["username"],
                            "duration" => $row["duration"],
                            "description" => $row["description"],
                            "thumbnail" => $row["thumbnail"],
                            "avgScore" => $row["avgScore"],
                            "quizType" => $row["quizType"]
                            );
                    }

                    $questionsql = "select * from tQuestion where quizID ='". $quizID . "'  ORDER BY `questionNumber` ASC ";
                    $questionResult = $mysqli->query($questionsql);
                    foreach($questionResult as $row){
                        $questionInfo = array();

                        if(strlen($row["answer2"])>0 && strlen($row["answer3"])>0){
                            $questionInfo = array(
                            "question" => $row["question"],
                            "answer1" => $row["answer1"],
                            "answer2" => $row["answer2"],
                            "answer3" => $row["answer3"]
                            );
                        } elseif(strlen($row["answer2"])>0){
                            $questionInfo = array(
                            "question" => $row["question"],
                            "answer1" => $row["answer1"],
                            "answer2" => $row["answer2"]
                            );
                        } else {
                             $questionInfo = array(
                            "question" => $row["question"],
                            "answer1" => $row["answer1"]
                            );
                        }
                     $questions = array(
                         "question" => $row["questionNumber"],
                          "questionInfo" => $questionInfo
                         );
                     array_push($questionarray, $questions);
                    }
                    $sendArray = array("quizData" => array("quizInfo"=>$quizarray, "questions"=>$questionarray));

                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($sendArray);

                } elseif(isset($_COOKIE["userID"]) && isset($_COOKIE["quizID"]) && isset($_POST["score"]) && isset($_POST["correctAnswers"])){

                    $sql = "INSERT INTO tHistory (`quizID`,`userID`,`score`,`correctAnswers`";
                    $userID = $_COOKIE["userID"];
                    $quizID = $_COOKIE["quizID"];
                    $score = $mysqli -> real_escape_string($_POST["score"]);
                    $answers = $mysqli -> real_escape_string($_POST["correctAnswers"]);

                    if(isset($_POST["review"])){
                      $sql .=  ",`reviewGiven`";
                    }
                    $sql .= ") VALUES ('" . $quizID . "', '" . $userID . "', '" . $score . "', '" . $answers;
                    if(isset($_POST["review"])){
                    $review = $mysqli -> real_escape_string($_POST["review"]);

                      $sql .=  "', '" . $review;
                    }
                    $sql .= "');";
                    http_response_code(201);
                    $mysqli->query($sql);

                } else {
                    http_response_code(400);
                }

            }

                 mysqli_close($mysqli);

                }

            }

    $api = new MyAPI();
    $api -> handleRequest();

?>