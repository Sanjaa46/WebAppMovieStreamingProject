import Movie from './Movies.js';

class Movies {
    constructor() { }

    async list(container_type) {
        let id;
        let movieType;
        switch (container_type) {
            case 'new-added-movies':
                id = 'new-added-movies';
                movieType = 'movie';
                break;
            case 'new-added-series':
                id = 'new-added-series';
                movieType = 'series';
                break;
            case 'new-added-tvshows':
                id = 'new-added-tvshows';
                movieType = 'tv_show';
                break;
            default:
                console.error('Invalid container type');
                return;
        }
        try {
            const response = await fetch('/app/assets/scripts/modules/movies.json');
            const data = await response.json();

            // Sort movies by 'since' year in descending order
            data.sort((a, b) => b.since - a.since);

            let moviesData = '';
            let i = 0;
            let j = 0;
            while (i < data.length && j < 12) {
                if (data[i].type === movieType) {
                    const mov = new Movie(data[i]);
                    moviesData += mov.render();
                    j++;
                }
                i++;
            }
            document.getElementById(id).querySelector(".movies-container-12").insertAdjacentHTML("beforeend", moviesData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
};

const movies = new Movies();
movies.list('new-added-movies');
movies.list('new-added-series');
movies.list('new-added-tvshows');


class MovieMediumSized {
    constructor(movie, rank) {
        this.name = movie.name;
        this.genre = movie.genre;
        this.poster = movie.poster;
        this.rank = rank;
    }

    render() {
        const paddedRank = (this.rank + 1).toString().padStart(2, '0'); // Ensure rank is displayed as '01', '02', etc.
        const genres = this.genre.join(', ');
        return `
        <article class="movie-medium-sized"><a href="intro.html?name=${this.name}&genre=${this.genre}">
        <p class="rank">${paddedRank}</p>
        <div class="details">
            <h3 class="name">${this.name}</h3>
            <p class="movie-type">${genres}</p>
        </div>
        <div class="poster">
            <img src="${this.poster}" alt="movie-medium-sized-poster">
        </div></a>
    </article>`;
    }
}

class MostViewed {
    async list() {
        try {
            const response = await fetch('/app/assets/scripts/modules/movies.json');
            const data = await response.json();

            // Sort movies by 'since' year in descending order
            data.sort((a, b) => b.views - a.views);

            let moviesData = '';
            for (let i = 0; i < Math.min(5, data.length); i++) {
                const mov = new MovieMediumSized(data[i], i);
                moviesData += mov.render();
            }
            document.querySelector('.most-viewed-movies-container').querySelector(".most-viewed-movies-slider").insertAdjacentHTML("beforeend", moviesData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

const mostViewed = new MostViewed();
mostViewed.list();