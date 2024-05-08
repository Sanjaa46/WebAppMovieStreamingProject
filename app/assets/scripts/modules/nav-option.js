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
function filterMoviesByType(type) {
    return movies.filter(movie => movie.type === type);
}

// Render movies to the UI
function renderMovies(movies) {
    let moviesData = '';

    movies.forEach(movie => {
        const mov = new Movie(movie);
        moviesData += mov.render();
    });
    document.getElementById('movie-list').querySelector(".movies-container-12").insertAdjacentHTML("beforeend", moviesData);
}

// Event listener for each option
document.getElementById('movies-option').addEventListener('click', function () {
    const filteredMovies = filterMoviesByType('movie');
    renderMovies(filteredMovies);
});

document.getElementById('series-option').addEventListener('click', function () {
    const filteredMovies = filterMoviesByType('series');
    renderMovies(filteredMovies);
});

document.getElementById('tv-shows-option').addEventListener('click', function () {
    const filteredMovies = filterMoviesByType('tv_show');
    renderMovies(filteredMovies);
});
