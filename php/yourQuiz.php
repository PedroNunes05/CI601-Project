<?php
    class MyAPI {

        public function handleRequest() {



            $mysqli = new mysqli("brighton", "","","pn163_project"); //Connect to database

            if($mysqli->connect_errno){
                //If there is no connections it sends repsonse code 500 and ends
                http_response_code(500);
                exit();

            } else {
                if(isset($_GET["getYourQuiz"])){
                    $userID = $_COOKIE["userID"];
                    $sql = "SELECT * FROM tQuiz where creatorID='" . $userID . "'";
                    $result = $mysqli->query($sql);
                    $rowcnt = $result->num_rows;
                    if($rowcnt>0) {
                        http_response_code(200);
                        header('Content-Type: application/json');
                        $sendArray = array();
                        foreach($result as $row){
                            $quizInfo = array("quiz" => array(
                                "quizID" => $row["quizID"],
                                "name" => $row["quizName"],
                                "description" => $row["description"],
                                "quizType" => $row["quizType"],
                                "category" => $row["category"],
                                "dateCreated" => $row["dateCreated"],
                                "thumbnail" => $row["thumbnail"],
                                "attempts" => $row["attempts"],
                                "quizReview" => $row["quizReview"],
                                "avgScore" => $row["avgScore"]
                                ));
                            array_push($sendArray, $quizInfo);
                        }
                        $sendData= array("yourQuiz" => array("quizInfo"=>$sendArray));
                        http_response_code(200);
                        echo json_encode($sendData);

                    } else {// if there is no rows it will return http status of 204
                        http_response_code(204);

                    }

            }

            mysqli_close($mysqli);

        }}
    }

    $api = new MyAPI();
    $api -> handleRequest();

?>