/** 
    File contains the functions to call when client wants to send POST or GET requests: register(), send(), login(), deleteMsg(), receive()
**/
"use strict";

const server_url = "https://project153-server.glitch.me/";

/**
    function to call when user wants to send a '/register' POST request to server to register for an account
**/
function register()
{
    
    var url = server_url+"v1/register";
    
    
    //temporary name and password for register
    //TODO: check if username is taken
    var name = "temp_name";
    var password = "temp_password";
    
    var jsonObj = 
    {
        username: name,
        password: password
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(jsonString);
    
    xhr.onloadend = function(e) {
         console.log(xhr.responseText);
    }
    
    
    xhr.send(jsonObj);
}

/**
    function to call when user wants to send a '/login' POST request to server to login to the app
**/
function login()
{
    
    var url = server_url+"v1/login";
    
    
    //temporary name and password for login
    //TODO: make dynamic through html/css
    var name = "temp_name";
    var password = "temp_password";
    
    var jsonObj = 
    {
        username: name,
        password: password
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(jsonString);
    
    xhr.onloadend = function(e) {
         console.log(xhr.responseText);
    }
    
    
    xhr.send(jsonObj);
}

/**
    function to call when user wants to send a '/send' POST request to server to send a message
**/
function send()
{
    
    var url = server_url+"v1/send";
    
    
    //TODO: make dynamic
    var auth_token = "temp_auth_token";
    var expiration = "temp_expiration";
    
    var jsonObj = 
    {
        auth_token: auth_token,
        expiration: expiration
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(jsonString);
    
    xhr.onloadend = function(e) {
         console.log(xhr.responseText);
    }
    
    
    xhr.send(jsonObj);
}

/** 
    function to call when user wants to send a '/delete/ POST request to server to delete a message
**/

function deleteMsg()
{
    
    var url = server_url+"v1/delete";
    
    
    //TODO: actually get auth_token
    var auth_token = "temp_auth_token";
    
    var jsonObj = 
    {
        auth_token: auth_token
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(jsonString);
    
    xhr.onloadend = function(e) {
         console.log(xhr.responseText);
    }
    
    
    xhr.send(jsonObj);
}

/**
    function to call when user wants to send a '/receive' GET request to server to receive a message
**/
function receive()
{
    var url = server_url+"v1/receive";
    
    //TODO: actually get auth_token
    var auth_token = "temp_auth_token";
    
    var jsonObj = 
    {
        auth_token: auth_token
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(jsonString);
    
    xhr.onloadend = function(e) {
         console.log(xhr.responseText);
    }
    
    
    xhr.send(jsonObj);
    
}
