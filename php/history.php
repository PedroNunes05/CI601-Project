<?php
    class MyAPI {

        public function handleRequest() {



            //I removed the username and password for the connection below
            $mysqli = new mysqli("brighton", "","","pn163_project"); //Connect to database

            if($mysqli->connect_errno){
                //If there is no connections it sends repsonse code 500 and ends
                http_response_code(500);
                exit();

            } else {
                if(isset($_GET["getHistory"])){
                    $userID = $_COOKIE["userID"];
                    $sql = "SELECT * FROM tQuiz INNER JOIN tHistory on tQuiz.quizID = tHistory.quizID where userID='" . $userID . "'";
                    $result = $mysqli->query($sql);
                    $rowcnt = $result->num_rows;
                    if($rowcnt>0) {
                        http_response_code(200);
                        header('Content-Type: application/json');
                        $sendArray = array();
                        foreach($result as $row){
                            $historyInfo = array("quiz" => array(
                                "quizID" => $row["quizID"],
                                "name" => $row["quizName"],
                                "description" => $row["description"],
                                "quizType" => $row["quizType"],
                                "dateTaken" => $row["dateTaken"],
                                "correctAnswers" => $row["correctAnswers"],
                                "thumbnail" => $row["thumbnail"],
                                "score" => $row["score"]
                                ));
                            array_push($sendArray, $historyInfo);
                        }
                        $sendData= array("history" => array("historyInfo"=>$sendArray));
                        http_response_code(200);
                        echo json_encode($sendData);

                    } else {// if there is no rows it will return http status of 204
                        http_response_code(204);

                    }

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