<?php
    class MyAPI {

        public function handleRequest() {

            $creatorID = "";
            $quizName= "";
            $category = "";
            $quizType = "";
            $description = "";
            $duration = "";
            $thumb = "";
            $questionNumber = 0;
            $question = "";
            $answer1 = "";
            $answer2 = "";
            $answer3 = "";
            $questionArray = "";
            $array = "";
            $uploads_dir = "/home/pn163/public_html/CI601/";

            //I removed the username and password for the connection below
            $mysqli = new mysqli("brighton", "","","pn163_project"); //Connect to database

            if($mysqli->connect_errno){
                //If there is no connections it sends repsonse code 500 and ends
                http_response_code(500);
                exit();

            } else {
                  if(isset($_COOKIE["userID"]) && isset($_POST['quizName']) && isset($_POST['category']) && isset($_POST['quizType']) && isset($_POST['description'])){ //Check to see if it is a post method

                    //Creating quiz ID
                    $countsql = "SELECT quizID FROM tQuiz";
                    $result = $mysqli->query($countsql); // runs query
                    $count = $result->num_rows; //count the number of rows in that is returned from the sql query
                    $quiznum = $count +1; //adds 1 to the count
                    $quizID = "q" . $quiznum; // Creates the quiz ID

                    //asinging the quiz infomation

                    $quizName = $mysqli -> real_escape_string($_POST['quizName']);//decode the post message and check if there is any wrong chracters
                    $category = $mysqli -> real_escape_string($_POST['category']);
                    $quizType = $mysqli -> real_escape_string($_POST['quizType']);
                    $description = $mysqli -> real_escape_string($_POST['description']);
                    $creatorID = $_COOKIE["userID"];

                    //Creating query
                    $sql = "INSERT INTO tQuiz (`quizID`, `creatorID`, `quizName`, `category`, `quizType`, `description`";

                    if(isset($_POST['duration'])){
                        $duration = $mysqli -> real_escape_string($_POST['duration']);
                        $sql .= ", `duration`";
                    }
                    if (is_uploaded_file($_FILES["thumbnail"]["tmp_name"])){
                        $sql .= ", `thumbnail`";

                    }
                    $sql = $sql . ") VALUES ('". $quizID. "','" . $creatorID . "','" . $quizName . "','" . $category .  "','" . $quizType . "','" . $description;

                    if(isset($_POST['duration'])) {
                        $sql .= "','" . $duration;
                    }
                    if (is_uploaded_file($_FILES["thumbnail"]["tmp_name"])) {
                        $tmpname = $_FILES["thumbnail"]["tmp_name"];
                        $name = $mysqli -> real_escape_string($_FILES["thumbnail"]["name"]);
                        $thumb = "quizImage/".$quizID . basename($name);
                        move_uploaded_file($tmpname, $uploads_dir.$thumb);
                        $sql .= "','" . $thumb;
                    }
                        $sql = $sql . "')";
                        $mysqli->query($sql); // runs query
                    if(isset($_POST['question'])){
                        $questionArray = $_POST['question'];
                        if($quizType === "text"){
                            foreach($questionArray as $array){
                               $questionSQL = "INSERT INTO tQuestion (`questionNumber`,`quizID`,`question`,`answer1`";
                               $questionNumber++;
                               $question = $mysqli->real_escape_string(rtrim($array['questions']));
                               $answer1 = $mysqli->real_escape_string(rtrim($array['answer1']));
                               if(isset($array['answer2'])){
                                  $answer2 = $mysqli->real_escape_string(rtrim($array['answer2']));
                                  $questionSQL .= ", `answer2`";
                               }
                               if(isset($array['answer3'])){
                                  $answer3 = $mysqli->real_escape_string(rtrim($array['answer3']));
                                  $questionSQL .= ", `answer3`";
                               }
                               $questionSQL .= ") VALUES ('" . $questionNumber . "','" . $quizID . "','" . $question . "','" . $answer1;
                               if(isset($array['answer2'])){;
                                  $questionSQL .= "','". $answer2;
                               }
                               if(isset($array['answer3'])){
                                  $questionSQL .= "','". $answer3;
                               }
                               $questionSQL .= "');";

                               $mysqli->query($questionSQL);
                            }
                        } else if($quizType === "clickImage"){
                            foreach($questionArray as $array){
                                $questionSQL = "INSERT INTO tQuestion (`questionNumber`,`quizID`,`question`,`answer1`";

                                $question = $mysqli->real_escape_string(rtrim($array['questions']));

                                $name = $_FILES["question"]["name"][$questionNumber];
                                $realAnswer1 = $mysqli ->real_escape_string($name["answer1"]);
                                $answer1 = "quizImage/".$quizID . $questionNumber . basename($realAnswer1);

                                $tmp_name = $_FILES["question"]["tmp_name"][$questionNumber];
                                move_uploaded_file($tmp_name["answer1"], $uploads_dir.$answer1);
                                $questionNumber++;

                                $questionSQL .= ") VALUES ('" . $questionNumber . "','" . $quizID . "','" . $question . "','" . $answer1 ."');";
                                $mysqli->query($questionSQL);
                            }
                        } else if($quizType === "typeImage") {

                            foreach($questionArray as $array){
                                $questionSQL = "INSERT INTO tQuestion (`questionNumber`,`quizID`,`question`,`answer1`";

                                $name = $_FILES["question"]["name"][$questionNumber];
                                $realName = $mysqli ->real_escape_string($name["questions"]);
                                $question = "quizImage/".$quizID . $questionNumber . basename($realName);

                                $tmp_name = $_FILES["question"]["tmp_name"][$questionNumber];
                                move_uploaded_file($tmp_name["questions"], $uploads_dir.$question);
                                $questionNumber++;

                                $answer1 = $mysqli->real_escape_string(rtrim($array['answer1']));
                                if(isset($array['answer2'])){
                                    $answer2 = $mysqli->real_escape_string(rtrim($array['answer2']));
                                    $questionSQL .= ", `answer2`";
                                }
                                if(isset($array['answer3'])){
                                    $answer3 = $mysqli->real_escape_string(rtrim($array['answer3']));
                                    $questionSQL .= ", `answer3`";
                                }

                                $questionSQL .= ") VALUES ('" . $questionNumber . "','" . $quizID . "','" . $question . "','" . $answer1;
                                if(isset($array['answer2'])){
                                    ;
                                    $questionSQL .= "','". $answer2;
                                }
                                if(isset($array['answer3'])){
                                    $questionSQL .= "','". $answer3;
                                }
                                $questionSQL .= "');";
                                $mysqli->query($questionSQL);

                            }
                        }

                    }

                     http_response_code(201);
                     echo "Quiz Created";
                } else{

                    http_response_code(400);
                }
            }

            mysqli_close($mysqli);

        }
    }

    $api = new MyAPI();
    $api -> handleRequest();

?>