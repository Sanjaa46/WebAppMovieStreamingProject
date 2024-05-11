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

// Render movies
function renderMovies(movies) {
    let moviesData = '';

    movies.forEach(movie => {
        const mov = new Movie(movie);
        moviesData += mov.render();
    });
    const movieContainer = document.getElementById('movie-list').querySelector(".movies-container-12");
    movieContainer.innerHTML = moviesData;
}


document.getElementById('filterForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const type = document.getElementById('type').value;
    const country = document.getElementById('country').value;
    const age = document.getElementById('age').value;
    const genre = document.getElementById('genre').value;
    const rating = document.getElementById('rating').value;
    const name = document.getElementById('name').value;

    const filteredMovies = await filterMovies(type, country, age, genre, rating, name);
    renderMovies(filteredMovies);
    titleChanger(filteredMovies);
});

async function filterMovies(type, country, age, genre, rating, name) {
    const movies = await fetchMovies();
    const filteredMovies = movies.filter(movie => {
        if (type !== 'all' && movie.type !== type) return false;
        if (country !== 'all' && movie.country !== country) return false;
        if (age !== 'all' && movie.age !== age) return false;
        if (genre !== 'all' && !movie.genre.includes(genre)) return false;
        if (rating !== 'all') {
            const [minRating, maxRating] = rating.split('-');
            if (movie.rating < parseInt(minRating) || movie.rating > parseInt(maxRating)) return false;
        }
        if (name && !movie.name.toLowerCase().includes(name.toLowerCase())) return false;
        return true;
    });

    updateUrlParams({ type, country, age, genre, rating, name });

    return filteredMovies;
}

function updateUrlParams(params) {
    const urlParams = new URLSearchParams(window.location.search);
    for (const key in params) {
        if (params[key] === 'all') {
            urlParams.delete(key);
        } else {
            urlParams.set(key, params[key]);
        }
    }
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
}



document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') || 'all';
    const country = urlParams.get('country') || 'all';
    const age = urlParams.get('age') || 'all';
    const genre = urlParams.get('genre') || 'all';
    const rating = urlParams.get('rating') || 'all';
    const name = urlParams.get('name') || '';

    const filteredMovies = await filterMovies(type, country, age, genre, rating, name);
    renderMovies(filteredMovies);

    document.getElementById('number-of-movies').textContent = filteredMovies.length + ' кинонууд';
    titleChanger(filteredMovies);
});

// title changer
async function titleChanger(filteredMovies) {
    const titleOfMovies = document.querySelector('.filter').querySelector('.title');

    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') || 'all';

    document.getElementById('number-of-movies').textContent = filteredMovies.length + ' кинонууд';

    switch (type) {
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
            titleOfMovies.textContent = 'Үр дүн';
            break;
    }
}

