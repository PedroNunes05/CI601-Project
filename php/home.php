<?php
    class MyAPI {

        public function handleRequest() {

            $rating = "";
            $mysqli = new mysqli("brighton", "pn163_CI601project","CI601project","pn163_project"); //Connect to database

            if($mysqli->connect_errno){
                //If there is no connections it sends repsonse code 500 and ends
                http_response_code(500);
                exit();

            } else {

                if(isset($_GET['rating'])){ //Check if it is a get method with the from paramaters set

                    $rating = $mysqli -> real_escape_string($_GET['rating']);
                    $sql = "SELECT * from tQuiz "
                         . "WHERE quizReview = '" . $rating . "'";

                    $result = $mysqli->query($sql);
                    $rowcnt = $result->num_rows; //count the number of rows in that is returned from the sql query

                    if($rowcnt>0) {
                        http_response_code(200);
                        header('Content-Type: application/json');
                        $quizData = array();
                        foreach($result as $row){  // for each row it it will create an array with the values then send it back
                            $sendArray = array("quiz" => array("id" => $row["quizID"],
                                "name" => $row["quizName"],
                                "category" => $row["category"],
                                "description" => $row["description"],
                                "thumbnail" => $row["thumbnail"],
                                "attempts" =>$row["attempts"],
                                "quizReview" => $row["quizReview"]
                                ));
                                array_push($quizData, $sendArray);
                                }
                        $sendQuiz= array("quizzes" => array("quizData" =>$quizData));
                            echo json_encode($sendQuiz);

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