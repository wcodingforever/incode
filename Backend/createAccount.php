

<?php

$json = file_get_contents("php://input"); 
$userDataObj = json_decode($json)->params;


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
        $stmt->bindParam(":username", $userDataObj->username);
        $stmt->bindParam(":password", $userDataObj->password);
        $stmt->bindParam(":email", $userDataObj->email);
        $stmt->bindParam(":birth", $userDataObj->birth);
        bindNull(":gender", $userDataObj->gender, $stmt);
        bindNull(":country", $userDataObj->country, $stmt);

        $stmt->execute();

        $connection = null;
        $stmt = null;

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