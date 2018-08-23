<?php

require("../setup.php");

$response = "OK";

// Read input from POST.
$json = file_get_contents("php://input"); 
$userDataObj = null;
if ($json !== FALSE && $json !== "") $userDataObj = json_decode($json)->params;
else $response = "Invalid input.";

// Check if all necessary data was sent
if($userDataObj != null
    && $userDataObj->username !== ""
    && $userDataObj->password !== ""
    && $userDataObj->birth !== "")
{
    try {
        $query = "INSERT INTO `users` (`username`, `password`, `email`, `birth`, `gender`, `country`) " .
            "VALUES ( :username, :password, :email, :birth, :gender, :country)";

        $stmt = $connection->prepare($query);
        $stmt->bindParam(":username", $userDataObj->username);
        $stmt->bindParam(":password", $userDataObj->password);
        $stmt->bindParam(":email", $userDataObj->email);
        $stmt->bindParam(":birth", $userDataObj->birth);
        bindNull(":gender", $userDataObj->gender, $stmt);
        bindNull(":country", $userDataObj->country, $stmt);

        $stmt->execute();

        // Release database resources.
        $connection = null;
        $stmt = null;
    }
    catch(PDOException $e) {
        // Default error message to front-end.
        $response = "Sorry, there is a problem with our services.";
        
        // If the error is because of duplicate username, send custom error.
        if (isset($e->errorInfo)) {
            $code = $e->errorInfo[1];
            if ($code === 1062) { $response = "User already exists."; }
        }

        // Add the error to the log file.
        // addToLog("createAccount: PDOException: code: {$code}" . " errorCode:". $e->errorCode() . " file:" . $e->getFile() . " line:" . $e->getLine() . " trace:" . $e->getTraceAsString() . PHP_EOL);
        addToLog("createAccount: PDOException: " . json_encode($e). PHP_EOL);
    }

}
else {
    $response = "Missing required data.";
}

// Change the response string into a JSON object for the UI, per API documents.
if ($response === "OK") {
    $respObj['status'] = "OK";
}
else {
    $respObj['status'] = "ERROR";
    $respObj['message'] = $response;
}

echo json_encode($respObj);

?>