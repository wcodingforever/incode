<?php

require("../setup.php");

$json = file_get_contents("php://input");
$obj = json_decode($josn);
$response = (object) [];
$errorMSG = null;

if($obj->route === "get_puzzle"){

    $puzzle_id = ($obj->params)->puzzle_id;

    if($puzzle_id !== "" || isset($puzzle_id) ){

        $query = "SELECT `id`, `name`, `description`, `date_from`, `date_to` FROM `puzzle` WHERE `id` = :id";
        
        $stmt = $connection->prepare($query);
        $stmt->bindParam(":id", $puzzle_id);

        $stmt->execute();
        $puzzleObj = $stmt->fetch(PDO::FETCH_OBJ);

        if($puzzleObj === false){

            $errorMSG = "ERROR: Wrong puzzle id.";

        }else{

            $response->status = "OK";
            $response->params = $puzzleObj;
        }

    }else{
        $errorMSG = "ERROR: Puzzle id was not sent.";
    }

}else{
    $errorMSG = "ERROR: Wrong route.";
}

if($errorMSG !== null){
    $response->status = "ERROR";
    $response->message = $errorMSG;
}

//obj -> json string
$response = json_encode($reponse);
echo $response;

?>