"use strict"

const server_url = "https://project153-server.glitch.me/";

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
