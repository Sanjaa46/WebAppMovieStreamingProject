import Movie from './Movies.js';

export async function fetchMovies() {
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

async function listMovies() {
    const data = await fetchMovies();
    let moviesData = '';

    data.forEach(movie => {
        const mov = new Movie(movie);
        moviesData += mov.render();
    });

    document.getElementById('movie-list').querySelector(".movies-container-12").insertAdjacentHTML("beforeend", moviesData);
}

async function filterMovies() {
    const data = await fetchMovies();
    const listedmovie = data.filter((movie) => movie.type === 'movie');
    console.log('Filtered movies:', listedmovie);
    let moviesData = '';

    listedmovie.forEach(movie => {
        const mov = new Movie(movie);
        moviesData += mov.render();
    });

    document.getElementById('movie-list').querySelector(".movies-container-12").insertAdjacentHTML("beforeend", moviesData);
}

filterMovies();
