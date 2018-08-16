

<?php

$json = file_get_contents("php://input"); 
$userDataObj = json_decode($json);

//Chk if all nessecary datas were sent
$response = "OK";

if($userDataObj->username !== "" && $userDataObj->password !== "" && $userDataObj->birth !== ""){

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "incode";
    
    try{

        $connection = new PDO("mysql:host=$servername;dbname=$dbname;", $username, $password);

        $query = "INSET INTO `users` (`username`, `password`, `email`, `birth`, `gender`, `country`) " .
        "VALUES ( :username, :password, :email, :birth, :gender, :country)";

        $stmt = $connection->prepare($query);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $password);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":birth", $birth);
        bindParam(":gender", $gender, $stmt);
        bindParam(":country", $country, $stmt);

        $stmt->execute();

    }catch(PDOException $e){

        $response = "ERROR: PDO ERROR.";        
    }

}else{
    $response = "ERROR: All nesscary datas weren't sent.";
}

echo $response; 


function bindNull( $placeholder, $value, $stmt){
    if($value !== null ){
        $stmt->bindParam($placeholder, $value);
    }else{
        $stmt->bindValue($placeholder, $value, PDO::PARAM_NULL);        
    }
}


?>