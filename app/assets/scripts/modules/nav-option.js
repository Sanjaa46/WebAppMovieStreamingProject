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
document.getElementById('movies-option').addEventListener('click', async function (event) {
    event.preventDefault();
    const filteredMovies = await filterMoviesByType('movie');
    renderMovies(filteredMovies);
});

document.getElementById('series-option').addEventListener('click', async function (event) {
    event.preventDefault();
    const filteredMovies = await filterMoviesByType('series');
    renderMovies(filteredMovies);
});

document.getElementById('tv-shows-option').addEventListener('click', async function (event) {
    event.preventDefault();
    const filteredMovies = await filterMoviesByType('tv_show');
    renderMovies(filteredMovies);
});

