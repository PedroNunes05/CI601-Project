<?php
    class MyAPI {

        public function handleRequest() {

            //Removed username and password 
            $mysqli = new mysqli("brighton", "","","pn163_project"); //Connect to database

            if($mysqli->connect_errno){
                //If there is no connections it sends repsonse code 500 and ends
                http_response_code(500);
                exit();

            } else {

                if(isset($_GET["getCook"])){
                    if(isset($_COOKIE["confirm"])){
                        header('Content-Type: application/json');
                        http_response_code(200);
                        echo json_encode($_COOKIE["confirm"]);
                    } else {
                        header('Content-Type: application/json');
                        http_response_code(200);
                        echo json_encode("no");
                    }
                } else if(isset($_POST["logOut"])){
                    if(isset($_COOKIE["confirm"])){
                        setcookie("confirm", "", time() - 3600, "/");
                    }
                    if(isset($_COOKIE["userID"])){
                        setcookie("userID", "", time() - 3600, "/");
                    }
                } else if(isset($_POST['username']) && isset($_POST['email']) && isset($_POST['pass'])){

                    $username = $mysqli -> real_escape_string($_POST['username']);
                    $email = $mysqli -> real_escape_string($_POST['email']);
                    $pass = $mysqli -> real_escape_string($_POST['pass']);
                    $userID = "";
                    $sql = "INSERT INTO tUser (`username`,`email`,`userpass`) VALUES ('" . $username . "', '" . $email. "', '" . $pass . "'); ";
                    $mysqli->query($sql);
                    $search = "SELECT userID from tUser WHERE tUser.email ='" . $email . "'";
                    $result = $mysqli->query($search);
                    foreach($result as $row){
                        $userID = $row["userID"];
                    }
                    http_response_code(201);
                    setcookie("userID", $userID, time()+60*60*24, "/");
                    setcookie("confirm", "yes", time()+60*60*24, "/");
                    echo "Account Created";

                } else if(isset($_POST['email']) && isset($_POST["pass"])){ //Check if it is a get method with the from paramaters set

                    $email = $mysqli -> real_escape_string($_POST['email']);
                    $pass = $mysqli -> real_escape_string($_POST['pass']);
                    $sql = "SELECT userID, email, userpass, salt from tUser WHERE tUser.email ='" . $email . "'";
                    $dbpass = "";
                    $salt = "";
                    $userID = "";
                    $result = $mysqli->query($sql);
                    foreach($result as $row){
                        $dbpass = $row["userpass"];
                        $salt = $row["salt"];
                        $userID = $row["userID"];
                    }
                    $saltedpass = $pass.$salt;
                    $hashpass = (hash('sha256', $saltedpass));

                    if($dbpass === $hashpass){
                        //Response code goes here for correct details
                        header('Content-Type: application/json');
                        http_response_code(200);
                        setcookie("userID", $userID, time()+60*60*24, "/");
                        setcookie("confirm", "yes", time()+60*60*24, "/");
                        echo "Successful login";
                    } else {
                        header('Content-Type: application/json');
                        http_response_code(400);
                        echo "Wrong details";
                    }
                } else {
                    http_response_code(400);
                    $test = $_POST["logOut01"];
                    echo $test;
                }

            }

            mysqli_close($mysqli);

        }
    }

    $api = new MyAPI();
    $api -> handleRequest();

?>
