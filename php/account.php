<?php
    class MyAPI {

        public function handleRequest() {



            $mysqli = new mysqli("brighton", "pn163_CI601project","CI601project","pn163_project"); //Connect to database

            if($mysqli->connect_errno){
                //If there is no connections it sends repsonse code 500 and ends
                http_response_code(500);
                exit();

            } else {
                if(isset($_GET["account"])){
                    $userID = $_COOKIE["userID"];
                    $sql = "SELECT tUser.userID, username, email, ROUND(AVG(tHistory.score),2) as avgScore, COUNT(tHistory.userID) as completedQuiz FROM tUser"
                          ." INNER JOIN tHistory on tUser.userID = tHistory.userID"
                          ." WHERE tUser.userID ='".$userID."';";
                    $result = $mysqli->query($sql);
                    $userArray = array();
                    foreach($result as $row){
                        $avgScore = "";
                        if($row["avgScore"] == null){
                            $avgScore = "No quiz has been taken";
                        } else {
                            $avgScore = $row["avgScore"];
                        }
                        $sendArray = array(
                            "username" => $row["username"],
                            "email" => $row["email"],
                            "completedQuiz" => $row["completedQuiz"],
                            "avgScore" => $avgScore
                            );
                        array_push($userArray, $sendArray);
                    }
                    $sendAccount= array("account" => array("accountInfo" =>$userArray));
                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($sendAccount);
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