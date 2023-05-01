<?php
    class MyAPI {

        public function handleRequest() {

            $reporterID = "";
            $quizID = "";
            $reason = "";
            //I removed the username and password for the connection below
            $mysqli = new mysqli("brighton", "","","pn163_project"); //Connect to database

            if($mysqli->connect_errno){
                //If there is no connections it sends repsonse code 500 and ends
                http_response_code(500);
                exit();

            } else {
                if(isset($_COOKIE["quizID"]) && isset($_COOKIE["userID"]) && isset($_POST["reason"])){

                    $quizID = $_COOKIE["quizID"];
                    $reporterID = $_COOKIE["userID"];
                    $reason = $mysqli -> real_escape_string($_POST["reason"]);
                    $sql = "INSERT INTO tReport (`quizID`,`reporterID`,`reason`) VALUES ('" . $quizID . "', '" . $reporterID . "', '" . $reason . "');";
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