<?php

    //If no search string is passed, then we can't search
    if(empty($_GET['category'])) {
        $result = "";
    } else {
        //Remove whitespace from beginning & end of passed search.
        $search = trim($_GET['category']);
        switch($search) {
        case "Nordeste" :
            $result = "<city>Fortaleza</city><city>Maceio</city><city>Recife</city><city>Salvador</city>";
            break;
        case "Sudeste" :
            $result = "<city>Belo Horizonte</city><city>Rio de Janeiro</city><city>São Paulo</city>";
            break;
        case "Sul" :
            $result = "<city>Pelotas</city><city>Porto Alegre</city><city>São Bento</city>";
            break;
        }
    }
    $result ='<?xml version="1.0" encoding="UTF-8" ?>' . "<cities>" . $result . "</cities>";
    header("Content-Type: text/xml; charset=utf-8");
    echo $result;

?>
