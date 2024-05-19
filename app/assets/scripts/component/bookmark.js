export default class BookmarkedComponent extends HTMLElement {
    // Define movies as a class property
    movies = new Array();

    constructor() {
        super();
        this.movies = [];
    }

    connectedCallback() {
        this.render();
        this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
        this.addEventListener('click', this.handleBookmarkClick);
    }

    disconnectedCallback() {
        // Remove event listener when the component is removed from the DOM
        this.removeEventListener('click', this.handleBookmarkClick);
    }

    handleBookmarkClick(event) {
        if (event.target.id === 'bookmarked') {
            const movieNames = this.movies.map(movie => movie.name);
            this.storeBookmarkedMovies(movieNames);
        }
    }


    storeBookmarkedMovies(movies) {
        this.movies.push(movies);
        console.log(movies);
    }

    render() {
        this.innerHTML = `
        <li class="profile-option"><a href="movies.html" id="bookmarked"><img src="assets/images/bookmark.png" alt="bookmark">Хадгалсан</a></li>`;
    }
}
