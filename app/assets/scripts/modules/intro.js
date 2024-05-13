import Movie from './Movies.js';

export default class Intro {
    constructor(movie) {
        this.poster = movie.poster
        this.cover = movie.cover;
        this.studio = movie.studio;
        this.director = movie.director;
        this.actor = movie.actors[1];
        this.name = movie.name;
        this.age = movie.age;
        this.rating = movie.rating;
        this.since = movie.since;
        this.country = movie.country;
        this.duration = movie.duration;
        this.genre = movie.genre;
        this.trailer = movie.trailer;
    }

    render() {
        const genres = this.genre.join('/');
        // <div class="trailer">
        //     <iframe width="560" height="315" src="${this.trailer}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        // </div>
        return `
        <img src="assets/images/cover.jpg" class="cover-image" />
        <div class="studio-name">
          <p><strong>Studio:Warner bros</strong></p>
        </div>
        <div class="poster">
          <img src="${this.poster}" alt="movie-small-sized-poster" />
          <p class="procuder-actor-name">${this.director} | ${this.actor}</p>
        </div>

        <div class="intro-details">
          <h2>${this.name}</h2>
          <div class="movie-rating">
            <p class="age">${this.age}</p>
            <p class="rating">IMDB ${this.rating}</p>
            <p class="since">${this.since}</p>
            <p class="origin">${this.country}</p>
            <p class="movie-duration">${this.duration} Мин</p>
          </div>
          <div>
            <p class="movie-genre">${genres}</p>
            <p class="introduction">
              Street-smart Nathan Drake (Tom Holland) is recruited by seasoned
              treasure hunter Victor "Sully" Sullivan (Mark Wahlberg) to recover
              a fortune amassed by Ferdinand Magellan and lost 500 years ago by
              the House of Moncada. What starts as a heist job for the duo
              becomes a globe-trotting, white-knuckle race to reach the prize
              before the ruthless Santiago Moncada (Antonio Banderas), who
              believes he and his family are the rightful heirs.
            </p>
          </div>
          <div class="buttons">
            <button class="show-button">
              <span class="glyphicon glyphicon-play"></span> Үзэх
            </button>
            <div class="other-icons">
              <p><span class="glyphicon glyphicon-bookmark"></span></p>
              <p><span class="glyphicon glyphicon-comment"></span></p>
              <p><span class="glyphicon glyphicon-film"></span></p>
            </div>
          </div>
        </div>
        <div>
          <button class="report">report</button>
        </div>`;
    }
};

async function renderMovie() {
    let moviesData = '';
    const movie = await searchMovies();

    const mov = new Intro(movie);
    moviesData = mov.render();
    const movieContainer = document.querySelector(".intro-movie");
    movieContainer.innerHTML = moviesData;
    //-------------------------------------//
    const recommendations = await filterMoviesByGenres();
    recommendations.sort((a, b) => b.since - a.since);

    let recommendationsData = '';
    let i = 0;
    while (i < 12) {
        const rec = new Movie(recommendations[i]);
        recommendationsData += rec.render();
        i++;
    }
    document.querySelector(".movies-container-12").insertAdjacentHTML("beforeend", recommendationsData);
}

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

async function searchMovies() {
    const movies = await fetchMovies();
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const searchedMovie = movies.find(movie => movie.name.toLowerCase() === name.toLowerCase());
    return searchedMovie;
}

renderMovie();

async function filterMoviesByGenres() {
    const movies = await fetchMovies();
    const urlParams = new URLSearchParams(window.location.search);
    const genreParam = urlParams.get('genre');
    const genres = genreParam ? genreParam.split(',') : [];
    console.log(genres);
    const filteredMovies = movies.filter(movie => {
        return genres.some(genre => movie.genre.includes(genre.trim()));
    });
    console.log(filteredMovies);
    return filteredMovies;
}


