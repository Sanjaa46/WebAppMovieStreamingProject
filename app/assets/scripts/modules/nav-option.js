import Movie from './Movies.js';

async function fetchMovies() {
    try {
        const response = await fetch('/app/assets/scripts/modules/movies.json');
        const data = await response.json();
        console.log(data.length);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}



// Filter movies based on the selected option
async function filterMoviesByType(type1) {
    const movies = await fetchMovies();
    return movies.filter(movie => movie.type === type1);
}


// Render movies to the UI
function renderMovies(movies) {
    let moviesData = '';

    movies.forEach(movie => {
        const mov = new Movie(movie);
        moviesData += mov.render();
    });
    const movieContainer = document.getElementById('movie-list').querySelector(".movies-container-12");
    movieContainer.innerHTML = moviesData;
}

// Event listener for each option
document.getElementById('movies-option').addEventListener('click', async function () {
    const titleOfMovies = document.querySelector('.filter').querySelector('.title');
    titleOfMovies.textContent = 'Кино';
    const filteredMovies = await filterMoviesByType('movie');
    document.getElementById('number-of-movies').textContent = filteredMovies.length + ' кинонууд'
    renderMovies(filteredMovies);
});

document.getElementById('series-option').addEventListener('click', async function () {
    const titleOfMovies = document.querySelector('.filter').querySelector('.title');
    titleOfMovies.textContent = 'Цуврал';
    const filteredMovies = await filterMoviesByType('series');
    document.getElementById('number-of-movies').textContent = filteredMovies.length + ' кинонууд'
    renderMovies(filteredMovies);
});

document.getElementById('tv-shows-option').addEventListener('click', async function () {
    const titleOfMovies = document.querySelector('.filter').querySelector('.title');
    titleOfMovies.textContent = 'ТВ шоу';
    const filteredMovies = await filterMoviesByType('tv_show');
    document.getElementById('number-of-movies').textContent = filteredMovies.length + ' кинонууд'
    renderMovies(filteredMovies);
});


// eventlistener for index page
// Read the URL parameter to determine the movie type
function getMovieTypeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('type');
}

// Event listener for rendering movies based on the movie type
document.addEventListener('DOMContentLoaded', async function () {
    const movieType = getMovieTypeFromUrl();
    if (movieType) {
        const filteredMovies = await filterMoviesByType(movieType);
        renderMovies(filteredMovies);
    }
});




// title changer
async function titleChanger() {
    const titleOfMovies = document.querySelector('.filter').querySelector('.title');
    const typeFromUrl = getMovieTypeFromUrl();
    const movies = await fetchMovies();
    const numberOfMovies = movies.filter(movie => movie.type === typeFromUrl).length;
    document.getElementById('number-of-movies').textContent = numberOfMovies + ' кинонууд';

    switch (typeFromUrl) {
        case 'movie':
            titleOfMovies.textContent = 'Кино';
            break;
        case 'series':
            titleOfMovies.textContent = 'Цуврал';
            break;
        case 'tv_show':
            titleOfMovies.textContent = 'ТВ шоу';
            break;
        default:
            break;
    }
}

titleChanger();