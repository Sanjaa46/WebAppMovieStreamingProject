import Movie from './Movies.js';

async function fetchMovies() {
    try {
        const response = await fetch('/app/assets/scripts/modules/movies.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}



// Filter movies based on the selected option
async function filterMoviesByType(type) {
    const movies = await fetchMovies();
    return movies.filter(movie => movie.type === type);
}

async function filterMoviesByGenre(genre) {
    const movies = await fetchMovies();
    return movies.filter(movie => movie.genre.includes(genre));
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


document.getElementById('filterForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const type = document.getElementById('type').value;
    const country = document.getElementById('country').value;
    const age = document.getElementById('age').value;
    const genre = document.getElementById('genre').value;
    const rating = document.getElementById('rating').value;

    const filteredMovies = await filterMovies(type, country, age, genre, rating);
    renderMovies(filteredMovies);
});

// Function to filter movies based on multiple criteria
async function filterMovies(type, country, age, genre, rating) {
    const movies = await fetchMovies();
    return movies.filter(movie => {
        if (type !== 'all' && movie.type !== type) return false;
        if (country !== 'all' && movie.country !== country) return false;
        if (age !== 'all' && movie.age !== age) return false;
        if (genre !== 'all' && !movie.genre.includes(genre)) return false;
        if (rating !== 'all') {
            const [minRating, maxRating] = rating.split('-');
            if (movie.rating < parseInt(minRating) || movie.rating > parseInt(maxRating)) return false;
        }
        return true;
    });

}

// eventlistener for index page
// Read the URL parameter to determine the movie type
function getMovieTypeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('type');
}

function getMovieGenreFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('genre');
}

// Event listener for rendering movies based on the movie type
document.addEventListener('DOMContentLoaded', async function () {
    const movieType = getMovieTypeFromUrl();
    if (movieType) {
        const filteredMovies = await filterMoviesByType(movieType);
        renderMovies(filteredMovies);
    }
});

document.addEventListener('DOMContentLoaded', async function () {
    const movieGenre = getMovieGenreFromUrl();
    if (movieGenre) {
        const filteredMovies = await filterMoviesByGenre(movieGenre);
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