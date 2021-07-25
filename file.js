const API_KEY = 'api_key=81294a52a615cceba149ec8b9b562b2d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY;
const IMG_URL ='https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const main =document.getElementById('main');
const form =document.getElementById('form');
const search = document.getElementById('search');

fetchMovies(API_URL)

function fetchMovies(url){

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        displaymovies(data.results)
    })
}

function displaymovies(data){
    
    main.innerHTML = '';

    data.forEach(movie => {
        const {title , poster_path , vote_average, overview, release_date,original_language} = movie;
        const ele= document.createElement('div');
        ele.classList.add('movie');
        ele.innerHTML=`
        
        <img src="${IMG_URL+poster_path}" alt="${title}">
            
            <div class="movie-det">
                <h4>${title}</h4>
                <span class ="${getRatings(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
              <h6>${overview}</h6>
              <h5>Released on: ${release_date}</h5>
              <h5>Original Language: ${original_language}</h5>
            </div>

        `

        main.appendChild(ele);

    })
}

function getRatings(vote){

    if(vote>=7.5){
        return 'green'
    }
    else if(vote>=5.0){
        return 'orange'
    }
    else{
        return 'red'
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchword= search.value;

    if(searchword){
        fetchMovies(searchURL+'&query='+searchword);
    }
    else{
        fetchMovies(API_URL);
    }
})