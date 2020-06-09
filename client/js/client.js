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


var models = require('../model/model.js');
var path = require('path');
var bodyParser = require('body-parser');



module.exports = function (app,io){
    app.use( bodyParser.json() );
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get('/',function(req,res){
        res.sendFile(path.resolve(__dirname+"/../views/index.html"));
    });


  //  var mongoose = require('mongoose');

//    var Schema = mongoose.Schema;
    app.post('/register',function(req,res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Method","'GET, POST, OPTIONS, PUT, PATCH, DELETE'");
        var user={
            "name":req.body.name,
            "handle":req.body.handle,
            "password":req.body.password,
            "phone":req.body.phone,
            "email":req.body.email,
        };
        console.log(user);
        console.log("i am here");
/*
        var schema = new mongoose.Schema({ name: 'string', size: 'string' });
        var Tank = mongoose.model('Tank', schema);

  var small = new Tank({ size: 'small' });
  small.save(function (err) {
    console.log("here17");

    if (err) return handleError(err);
    // saved!
  }); */
console.log("here16");


        models.user.findOne({"handle":req.body.handle},function(err,doc){
            if(err){
                res.json(err);
                console.log("here1");
            }
          //  console.log(doc);
//quick
            if(doc==null){
              console.log("here2");

                models.user.create(user,function(err,doc){
                    if(err) res.json(err);
                    else{
                        console.log("here13");
                        res.send("success");
                    }
                });
            }else{
              console.log("here3");

                res.send("User already found");
            }
          //  console.log("i am her2e");

        })
    //    console.log("here6");

    }

  );


    var handle=null;
    var private=null;
    var users={};
    var keys={};

    app.post('/login',function(req,res){
        console.log(req.body.handle);
        console.log(req.body.password);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Method","'GET, POST, OPTIONS, PUT, PATCH, DELETE'");
        handle = req.body.handle;
        console.log("here10");
      //console.log(models.user.findOne());

        models.user.findOne({"handle":req.body.handle, "password":req.body.password},function(err,doc){
            if(err){
              console.log("here9");

                res.send(err);

            }
            console.log("here12");
            //quick
            if(doc==null){
              console.log("here8");
                res.send("User has not registered");
            }
            else{
                console.log("Asas"+__dirname);
                console.log("suc");
                //res.sendFile(path.resolve(__dirname+"/../views/chat.html"));
                res.send("success");
            }

    });
    console.log("here11");
    });

    io.on('connection',function(socket){
        console.log("Connection :User is connected  "+handle);
        console.log("Connection : " +socket.id);
        io.to(socket.id).emit('handle', handle);
        users[handle]=socket.id;
        keys[socket.id]=handle;
        console.log("Users list : "+users);
        console.log("keys list : "+keys);
        models.user.find({"handle" : handle},{friends:1,_id:0},function(err,doc){
            if(err){res.json(err);}
            else{
                friends=[];
                pending=[];
                all_friends=[];
                console.log("friends list: "+doc);
                list=doc[0].friends.slice();
                console.log(list);

                for(var i in list){
                    if(list[i].status=="Friend"){
                        friends.push(list[i].name);
                    }
                    else if (list[i].status=="Pending"){
                        pending.push(list[i].name);
                    }
                    else{
                        continue;
                    }
                }
                console.log("pending list: "+pending);
                console.log("friends list: "+friends);
                io.to(socket.id).emit('friend_list', friends);
                io.to(socket.id).emit('pending_list', pending);
                io.emit('users',users);
            }
        });



        socket.on('group message',function(msg){
            console.log(msg);
            console.log("here20");
            io.emit('group',msg);
        });

        socket.on('private message',function(msg){
          //  console.log(recipt);
            console.log("first para",msg.firstp);
            console.log("second para",msg.secondp);
          //  console.log('message  :'+msg.split("#*@")[0]);
             models.messages.create({
               "message":"test1",
               "sender" :"8888",
               "reciever":"9999",
               //modified5
              /*  "message":msg.firstp.split("#*@")[1],
                "sender" :msg.firstp.split("#*@")[2],
                "reciever":msg.firstp.split("#*@")[0],*/
                "date" : new Date()});
            io.to(users[msg.secondp]).emit('private message', msg.firstp);

        });
        // code here

        //modified!

          socket.on('PUBLIC_KEY', (key) => {
          console.log("here27");
          console.log(key);
        io.emit('PUBLIC_KEY', key)})

        socket.on('PUBLIC_KEY_p', (key) => {
        console.log("here27");
        console.log(key);
      io.emit('PUBLIC_KEY_p', key)})

        //over

        socket.on('disconnect', function(){
            delete users[keys[socket.id]];
            delete keys[socket.id];
            io.emit('users',users);
            console.log(users);
        });
    });

    app.post('/friend_request',function(req,res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Method","'GET, POST, OPTIONS, PUT, PATCH, DELETE'");
        friend=true;
        models.user.find({"handle" : req.body.my_handle,"friends.name":req.body.friend_handle},function(err,doc){
            if(err){res.json(err);}
            else if(doc.length!=0){
                console.log("Friend request : "+doc.length);
                console.log("Friend request : friend request already sent "+doc);
                res.send("Friend request already sent ");
            }
            else{
                console.log("Friend request : "+doc.length);
                models.user.update({
                    handle:req.body.my_handle
                },{
                    $push:{
                        friends:{
                            name: req.body.friend_handle,
                            status: "Pending"
                        }
                    }
                },{
                    upsert:true
                },function(err,doc){
                    if(err){res.json(err);}
                    //            else{
                    //                console.log(doc);
                    //            }
                });
                io.to(users[req.body.friend_handle]).emit('message', req.body);
            }
        });
    });

    app.post('/friend_request/confirmed',function(req,res){
        console.log("friend request confirmed : "+req.body);
        if(req.body.confirm=="Yes"){
            models.user.find({
                "handle" : req.body.friend_handle,
                "friends.name":req.body.my_handle
            },function(err,doc){
                if(err){
                    res.json(err);
                }
                else if(doc.length!=0){
                    console.log("Friend request confirmed : "+doc.length);
                    console.log("Friend request confirmed : friend request already sent "+doc);
                    res.send("Friend request already accepted");
                }
                else{
                    models.user.update({
                        "handle":req.body.my_handle,
                        "friends.name":req.body.friend_handle
                    },{
                        '$set':{
                            "friends.$.status":"Friend"
                        }
                    },function(err,doc){
                        if(err){res.json(err);}
                        else{

                            console.log("friend request confirmed : Inside yes confirmed");
                            io.to(users[req.body.friend_handle]).emit('friend', req.body.my_handle);
                            io.to(users[req.body.my_handle]).emit('friend', req.body.friend_handle);
                        }
                    });
                    models.user.update({
                        handle:req.body.friend_handle
                    },{
                        $push:{
                            friends:{
                                name: req.body.my_handle,
                                status: "Friend"
                            }
                        }
                    },{upsert:true},function(err,doc){
                        if(err){res.json(err);}
                        //            else{
                        //                console.log(doc);
                        //            }
                    });
                }
            });
        }
        else{

            console.log("friend request confirmed : Inside No confirmed");
            models.user.update({
                "handle":req.body.my_handle
            },{
                '$pull':{
                    'friends':{
                        "name":req.body.friend_handle,
                    }
                }
            },function(err,doc){
            if(err){res.json(err);}
            else{
                console.log("No");
            }
        });
        }
    });

}

