<?php

    //*How to create an object without a class!!

    //1. Use (object)
    // $obj = (object) 
    //     [ 'name' => 'Julia', 
    //     'sex' => 'female' ];  

    // $obj->country = "Korea";


    //2. Use stdClass()

    $obj = new stdClass();
    // echo $obj->name === undefined;
    $obj->name = "Julia";
    $obj = json_encode($obj);
    echo $obj;
    // $params = new stdClass();
    // $params->puzzle_id = "345";

    // $obj->params = $params; 

    // // echo ($obj->params)->puzzle_id;

    // $obj2 = (object);

    // var_dump($puzzleObj);
    

    
?>