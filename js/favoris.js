$(document).ready(()=>{
    //pour afficher les favoris
    getFavoris();
   /* $("#delete").on('click',(e)=>{

       
    deleteFavoris();

        
    });*/
    
});


//pour enregister un favori dans le localstorage
function setFavoris(id,poster,title){
   // console.log(poster+" "+id+" "+title)
    //déclaration tableau favoris vide
    Favoris= [
        {
          "username":"",
          "Poster":"",
          "imdbID":"",
          "Title":"",
          "Type":"",
          "year":"",
         


        },];

    //get valeur de tableau Favoris de la localStorage
    var original=localStorage.getItem("Favoris")
    //conversion en objet car le tableau est sous forme d'un string
    var obj=JSON.parse(original);
    //console.log("original:"+original)
    var length;
    var str_currentUser=sessionStorage.getItem("currentUser")
    var obj_currentUser=JSON.parse(str_currentUser);
    Favoris[0].username=obj_currentUser.username;
    Favoris[0].Poster=poster;
    Favoris[0].imdbID=id;
    Favoris[0].Title=title;
    //si l'objet est null donc aucun favoris enregistré dans localStorage => enregistré un tableau vide de favoris
    if(obj==null){
        
//conversion de tableau Favoris en string
        var str=JSON.stringify(Favoris);
        //enregistré le string dans le localStorage
        localStorage.setItem("Favoris",str);
        //get le string 
         original=localStorage.getItem("Favoris")
         //conversion en objet
         obj=JSON.parse(original);  
    }else
    if(existe(obj,Favoris[0])==false){
//ajout de nouveau favori
length=obj.length;
    
//console.log(Favoris)
obj[length]=Favoris[0];

//enregistré le nouveau tableau des favoris
var str=JSON.stringify(obj);
localStorage.setItem("Favoris",str);
alert("favori added with success :)");
    }
    
    return false;
    
}

function existe(obj,Favori){
   var  i=0;
   var  v=false;
   
   if(obj!=null){
    var n=obj.length;
    
     while((i<=n-1) && (v==false)){
        
         
         if(((obj[i].username==Favori.username))&&(obj[i].imdbID==Favori.imdbID)){
             
             v=true;
             alert("déjà existe dans la liste des favoris")
         }
        
         i++;
        
     }
 
   }
   
    return v ;
    

}
    

//pour afficher les favoris qui sont enregistrés dans le localstorage
function getFavoris(){
    
   
    var original=localStorage.getItem("Favoris")
   // console.log(original)
    //conversion en objet
    var fav=JSON.parse(original);  
   // console.log(fav)
    if(fav !=null){
        var output='';
        //rendre le user courrent
        var str_currentUser=sessionStorage.getItem("currentUser")
        var obj_currentUser=JSON.parse(str_currentUser);
        //console.log(obj_currentUser.username)
        $.each(fav,(index,movie)=>{
           // console.log(obj_currentUser.username+","+fav.username)
            //pour chercher les favoris d'un user
            if(movie.username===obj_currentUser.username){
                if(movie.Poster!="" && movie.imdbID!="" && movie.Title!="" ){
                    output+=`
                    <div class="item">
                        <div class="item_c">
                            <a  id="delete" onclick="deleteFavoris('${movie.imdbID}')"><i class="far fa-times-circle"></i></a>
                            <img class="poster" src="${movie.Poster}">
                            <h3 id="title">${movie.Title}</h3>
                            <a onclick="movieSelected('${movie.imdbID}')" class="Details" href='#'>Movie Details</a>
                            
                        </div>
                    </div>
                    `;
                }
            }
           
          
    
    
        });
        //afficher les favoris
        $('#FavorisMovies').html(output)
        
    }
    

    
}

function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location='movie.html';
    return false;
}
//pour supprimer un favori
function deleteFavoris(id){
    var original=localStorage.getItem("Favoris")
    //console.log(original)
    //conversion en objet
    var fav=JSON.parse(original); 
    $.each(fav,(index,movie)=>{
        if(movie.imdbID==id ){
       //console.log("existe")
       //écraser l'objet
       movie.imdbID=0;
       movie.Poster="";
       movie.Title="";


        } 
    });

    var str=JSON.stringify(fav);
        //enregistré le string dans le localStorage
        localStorage.setItem("Favoris",str);
        //refresh la liste affichée
        getFavoris();

    

}