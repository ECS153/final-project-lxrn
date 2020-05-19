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