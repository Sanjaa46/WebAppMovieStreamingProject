export default class Movie {
    constructor(movie) {
        this.name = movie.name;
        this.since = movie.since;
        this.duration = movie.duration;
        this.director = movie.director;
        this.poster = movie.poster;
    }


    render() {
        return `
            <article class="movie-small-sized">
                <div class="details">
                    <h3 class="Name">${this.name}</h3>
                    <p class="year-and-duration"><img src="webimage/movieIcon.png" alt="movie-icon" class="movie-icon"> ${this.since} - ${this.duration} мин</p>
                    <div class="info">
                        <p>Directed by ${this.director}</p>
                    </div>
                </div>
                <div class="poster">
                    <img src="${this.poster}" alt="movie-small-sized-poster">
                </div>
            </article>`;
    }
}

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
            console.log(data.length);

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