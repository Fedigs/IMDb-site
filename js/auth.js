$(function(){
    //si on click sur login 
    $("#btnLogin").click(function(){
        //masquer bouton login
        $("#btnLogin").hide();
         //masquer bouton Register
        $("#btnRegister").hide();
        //insertion de load image
        $("#login_message").html("<img src='img/loadImage.gif'>");
        //get valeur username et password
        var username=$("#username").val();
        var password=$("#password").val();
       // console.log("username="+username+" password="+password)
        //setTimeout pour donner le temps pour voir le spinner 
        setTimeout(function(){
            if(auth(username, password)){
                //user existe
                //redirection vers index.html
                window.location="index.html";
            }else{
                //user n'existe pas
                $("#login_message").text("Invalid Username or Password ! Try again");
                $("#btnLogin").show();
                $("#btnRegister").show();
            }
            
            
            
        }, 3000);

        

    });
    //logout function
    $("#btnLogout").click(function(){
        var original=sessionStorage.getItem("currentUser")
        var obj=JSON.parse(original);
        obj.username="";
        obj.password="";
        var str=JSON.stringify(obj);
        sessionStorage.setItem("currentUser",str);
        window.location="login.html"



    });
    //si on click sur register
    $("#btnRegister").click(function(){

        var output=`
                    <div class="divu">
                            <p id="uname">Username :</p>
                            <div class="Inu" > 
                                <input type="text" class="form-control" id="usernameRegister" placeholder="Username">  
                            </div>

                    </div>
                    <div class="dive">
                            <p id="email">Email :</p>
                            <div class="Ine" > 
                            <input type="email" class="form-control" id="email1" placeholder="email">   
                            </div>

                    </div>
                
                    <div class="divp" >
                            <p id="pword">Password : </p>
                            <div class="Inp" >
                                <input type="password" class="form-control" id="password1" placeholder="Password">
                            </div>
                    </div>

                    <div class="divp" >
                    <p id="pword">Confirm Password : </p>
                    <div class="Inp" >
                        <input type="password" class="form-control" id="password2" placeholder="write the password again">
                    </div>
            </div>
                    <div class="divbtn">
                            <input type="button"  class="btnLogin" id="submit" value="submit" >
                            <input type="button"  class="btnRegister" id="cancel" value="cancel" >
                    </div>
                    
                    <span id="register_message"></span>  
        
        `;
        $(".LoginTitle").text("Register");
        $("#authForm").html(output);


        $("#submit").click(function(){

        $("#submit").hide();
        $("#cancel").hide();
        $("#register_message").html("<img src='img/loadImage.gif'>");
        


        var usernameRegister=$("#usernameRegister").val();
        var email=$("#email1").val();
        var password1=$("#password1").val();
        var password2=$("#password2").val();
        setTimeout(function(){
                if(password1===password2){
                    register(usernameRegister,email,password1);
                    alert("user added with success :)");
                }else{
                    $("#register_message").text("Password 2 should be equal to Password1 !");

                }


        }, 3000);
        });

        $("#cancel").click(function(){
            $("#usernameRegister").val("");
            $("#email").val("");
            $("#password1").val("");
            $("#password2").val(""); 
            window.location="login.html"
        });







    });

//fonction pour vérifier si le user existe dans le sessionStorage ou non
function auth(username,password){
    
    currentUser=
        {
        
          "username":"",
          "password":"",
        };
    var returnValue=false;
    //console.log(username +" "+ password)

    //get valeur  la liste users de la localStorage
    var original=localStorage.getItem("listeUser")
    //conversion en objet car le tableau est sous forme d'un string
    var obj=JSON.parse(original);
    //console.log("original:"+original)
    var length;
    //si l'objet est null donc aucun user enregistré dans localStorage
    if(obj!=null){
        $.each(obj,(index,user)=>{
            if(user.username===username && user.password===password){
                //console.log("user exists")
                currentUser.username=username;
                currentUser.password=password;
                var str=JSON.stringify(currentUser);
                sessionStorage.setItem("currentUser",str);

                
                returnValue=true;
                
            }

         });
        
    }
     return returnValue;

}

function register(usernameRegister,email,password){
    var listeUser=[
        {
    
            "username":"",
            "password":"",
            "email":"",
          },


    ];
    var original=localStorage.getItem("listeUser")
    //conversion en objet car le tableau est sous forme d'un string
    var obj=JSON.parse(original);
   // console.log("original:"+original)
    var length;
        listeUser[0].username=usernameRegister;
        listeUser[0].password=password;
        listeUser[0].email=email;
        
    if(obj==null){
        
                //conversion de tableau Favoris en string
                var str=JSON.stringify(listeUser);
                //enregistré le string dans le localStorage
                localStorage.setItem("listeUser",str);
                
            }else{
                length=obj.length;
                obj[length]=listeUser[0];
                //console.log(obj)
                //enregistré le nouveau tableau des favoris
                var str=JSON.stringify(obj);
                localStorage.setItem("listeUser",str);

            }
    //console.log(usernameRegister+" "+email+" "+password)
    window.location="login.html"




}




});