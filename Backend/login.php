<?php

require("./setup.php");

$request_json = file_get_contents("php://input");

$erroMSG;

if($request_json !== ""){

    $request_obj = json_decode($request_json);

    if( isset($request_obj->route) && $request_obj->route === "log_in"){

        $params = $request_obj->params;

        if( isset($params->username) && $params->username !== "" && isset($params->password) && $params->password !== "" ){    

            try{

                $username = $params->username;
                $password = $params->password;

                $query1 = "SELECT `id` FROM `users` WHERE `username`=:username;";

                $stmt1 = $connection->prepare($query1);
                $stmt1->bindParam(":username", $username);
                $stmt1->execute();

                $matchedUserWithUsername = $stmt1->fetch(PDO::FETCH_ASSOC);
                // var_dump($matchedUserWithUsername);
                // echo count($matchedUserWithUsername);

                if( $matchedUserWithUsername !== FALSE){

                    $query2 = "SELECT `id` FROM `users` WHERE `username`=:username AND `password`=:password;";

                    $stmt2 = $connection->prepare($query2);
                    $stmt2->bindParam(":username", $username);
                    $stmt2->bindParam(":password", $password);                    

                    $stmt2->execute();
                    $matchedUserWithUsernameAndPW = $stmt2->fetch(PDO::FETCH_ASSOC);

                    if($matchedUserWithUsernameAndPW === FALSE){
                        $errMSG = "Wrong password.";
                    }

                }else{
                    $errMSG = "This username doesn't exist.";
                }
            }catch(PDOException $e){
                $errMSG = "Sorry, there is a problem with our services";            
            }

        }else{
            $errMSG = "UserInfo's not been sent.";
        }

    }else{
        $erroMSG = "Wrong route.";
    }

}else{
    $erroMSG = "No data's been sent.";
}


//Create an object to  create a json delivering the data about the request.
$response_obj = new stdClass();

if(!isset($errMSG)){

    $response_obj->status = "OK";

}else{

    $response_obj->status = "ERROR";
    $response_obj->message = $errMSG;

}

$response_json = json_encode($response_obj);

echo $response_json;


?>