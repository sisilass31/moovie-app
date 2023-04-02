const api_key = 'api_key=31863d7f01089d052c51df01ae2b6e67';
const base_url = 'https://api.themoviedb.org/3/';
const api_url = base_url + '/trending/all/day?language=fr&sort_by=popularity.desc&' + api_key;
const img_url = 'https://image.tmdb.org/t/p/w500';
const search_url = base_url + '/search/movie?language=fr&include_adult=false&' + api_key;

const container = document.getElementById('container');
const form = document.getElementById('form');
const search = document.getElementById('search');

// searchbar
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchword = search.value;
    if (searchword) {
        getMovies(search_url + '&query=' + searchword)
    } else {
        getMovies(api_url)
    }
})

getMovies(api_url);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        ShowMovies(data.results);
    })
}

// show the movies/shows
function ShowMovies(data) {
    container.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview, release_date } = movie;
        const movie_element = document.createElement('div');
        movie_element.classList.add('movie');
        movie_element.innerHTML =
            `<div class="card">
                <div class="div_img">
                    <img src="${img_url}${poster_path}" alt="${title}"/>
                </div>
                <div class="description">
                    <p class="title">${title}</p>
                    <span class="${color(vote_average)}"><i class="fa-solid fa-star"></i>${Math.floor(vote_average)}</span>
                </div>
                <div class="more">
                    <button id= "description">
                        <span><i class="fa-solid fa-chevron-down"></i></span>
                    </button>
                </div>
                <div id="desc">
                    <div class="n-t-s-c">
                        <span>122 min</span>
                        <span>${release_date}</span>
                        <span>US</span>
                    </div>
                    <div class="overview">
                        <span>${overview}</span>
                    </div>
                    <div class="button">
                        <button><i class="fa-solid fa-play"></i></button>
                    </div>
                </div>
            </div>`
        container.appendChild(movie_element)
    })
}

// color for notes
function color(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}