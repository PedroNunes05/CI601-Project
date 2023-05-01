<?php
class MyAPI {

    public function handleRequest() {

        $mysqli = new mysqli("brighton", "pn163_CI601project","CI601project","pn163_project"); //Connect to database

        if($mysqli->connect_errno){
            //If there is no connections it sends repsonse code 500 and ends
            http_response_code(500);
            exit();

        } else {
            if(isset($_POST['searchCookie'])){
                $search = $mysqli -> real_escape_string($_POST['searchCookie']);
                setcookie("searchCookie", $search, time()+600, "/");

            } else if(isset($_POST['cateCookie'])){
                $cate = $mysqli -> real_escape_string($_POST['cateCookie']);
                setcookie("cateCookie", $cate, time()+600, "/");

            }else if(isset($_GET["searchPage"])){
                $sql = "SELECT * from tQuiz WHERE ";
                $search = null;
                $category = null;

            if(isset($_COOKIE["searchCookie"])){
                $search = $_COOKIE["searchCookie"];
                setcookie("searchCookie", "", time()-3600, "/");
            }
             if(isset($_COOKIE["cateCookie"])){
                $category = $_COOKIE["cateCookie"];
                setcookie("cateCookie", "", time()-3600, "/");
             }
             if(isset($search) && isset($category)){
                 $sql .= "quizName like '%" . $search . "%' AND category = '" . $category . "'";
             } else if(isset($category)){
                 $sql .= "category = '" . $category . "'";
             } else if(isset($search)){
                $sql .= "quizName like '%" . $search . "%'";
             }
             if(isset($_GET["sort"])){
                 $sort = $_GET["sort"];
                 if($sort === "none"){
                     $sql .= "ORDER BY quizReview DESC";
                 } else {
                     $sql.= " ORDER BY " . $sort . " DESC";
                 }
             }

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
                                "avgScore" => $row["avgScore"],
                                "quizType" => $row["quizType"],
                                "attempts" =>$row["attempts"],
                                "quizReview" => $row["quizReview"]
                                ));
                                array_push($quizData, $sendArray);
                                }
                        $sendQuiz= array("quizzes" => array("quizData" =>$quizData));
                        echo json_encode($sendQuiz);
                }  else {// if there is no rows it will return http status of 204
                    http_response_code(204);

                }
            }
            }

            mysqli_close($mysqli);

        }
    }

    $api = new MyAPI();
    $api -> handleRequest();

?>