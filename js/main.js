$(document).ready(()=>{
   
    $('#searchForm').on('submit',(e) =>{  
       let searchText=($('#searchText').val());
       var selectedType=($('#filter').val());
      // console.log("dans on submit /type="+selectedType+"  text="+searchText)
       //fonction getMovies pour consommer l'api
        getMovies(searchText,selectedType)
      
        e.preventDefault();
    });


    $("#filter").change(function(){

        var selectedType= $(this).children("option:selected").val();
        let searchText=($('#searchText').val());
        
       $(".searchTitle").text("Search for any " + selectedType)
       // console.log("dans on change /type="+selectedType+"  text="+searchText)
        //fonction getMovies pour consommer l'api avec les nouvaux paramètres de filtrage 
        getMovies(searchText,selectedType)
      
       // e.preventDefault();
    });

    $("#favoris").on('click',(e)=>{

       //redirection vers favoris.html
        window.location='favoris.html';

        
    });
    
    
  
   
});

//pour consommer l'api
function getMovies(searchText,selectedType){
    var API = "http://www.omdbapi.com/?s="+searchText+"&apikey=ee5cdc30&type="+selectedType;
    //console.log(API)
    $.ajax({
    dataType: "json",
    url: API,
    success: success1,
    });
}

function success1(response){
    //console.log(response)
    var movies=response.Search;
   // console.log(movies)
    var output='';
    $.each(movies,(index,movie)=>{
        //pour afficher la résultat
        output+=`
        <div class="item">
            <div class="item_c">
                <img class="poster" src="${movie.Poster}">
                <h3 id="title">${movie.Title}</h3>
                <input type="button" onclick="movieSelected('${movie.imdbID}')" class="Details"  href='#' value="Movie Details">
            </div>
        </div>
        
        
        
        `;


    });
    $('#movies').html(output)

    //console.log(movies)

   /* $.each(e,function(index,value)
    {

        console.log("I:"+index+" v:"+value);
    });*/
}

function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location='movie.html';
    return false;
}
//consommer l'api pour prendre les détails d'un film 
function getMovie(){
    let movieId=sessionStorage.getItem('movieId');
    var API = "http://www.omdbapi.com/?apikey=ee5cdc30&i="+movieId;
    $.ajax({
    dataType: "json",
    url: API,
    success: success2,
    });
    
}
function success2(response){

//console.log(response)
let movie=response;
//pour afficher les détails d'un film 
let output=`
<div class="row1Info">
    <div class="col-md-4">
        <img src="${movie.Poster}" class="thumbnail">
    </div>
    <div class="row">
        <ul><h1 class="detailInfo">${movie.Title}</h1></ul>
        <ul class="list-group">
            <li class="detailInfo"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="detailInfo"><strong>Type:</strong> ${movie.Type}</li>
            <li class="detailInfo"><strong>Released:</strong> ${movie.Released}</li>
            <li class="detailInfo"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="detailInfo"><strong>Director:</strong> ${movie.Director}</li>
            <li class="detailInfo"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="detailInfo"><strong>Actors:</strong> ${movie.Actors}</li>
        </ul>
    </div>
</div>
<div class="row">
    <div class="jumbotron">
    <h3 class="detailInfo">Plot</h3>
    <p class="detailInfo">${movie.Plot}</p>
    <hr>
    <div class="buttons">
    <a href="http:/imdb.com/title/${movie.imdbID}" target="_blank" class="showMovie">View IMDB</a>
    <a href="index.html"  class="goBack">Go back to search</a>
    <a onclick="setFavoris('${movie.imdbID}','${movie.Poster}','${movie.Title}')" href="#" class="AjoutFav" >Add to favoris <i class="far fa-heart"></i></a>
    </div>
    </div>
</div>

`;

$("#movie").html(output);

}
