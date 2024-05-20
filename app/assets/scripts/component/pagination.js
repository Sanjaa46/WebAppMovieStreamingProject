class Pagination extends HTMLElement {
    constructor() {
        super();
        this.currentPage = 1;
        this.moviesPerPage = 24;
        this.movies = [];
    }

    async connectedCallback() {
        await this.fetchMoviesFromJSON();
        this.render();
    }

    async fetchMoviesFromJSON() {
        try {
            const response = await fetch('/app/assets/scripts/modules/movies.json');
            this.movies = await response.json();
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    render() {
        // Clear previous pagination buttons
        this.innerHTML = '';

        // Calculate total number of pages
        const totalPages = Math.ceil(this.movies.length / this.moviesPerPage);

        // Create and append pagination buttons
        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add('pagination');
        
        const prevButton = document.createElement('a');
        prevButton.href = '#';
        prevButton.classList.add('prev');
        prevButton.innerHTML = '&laquo;';
        prevButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.goToPage(this.currentPage - 1);
        });
        paginationContainer.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('a');
            button.href = '#';
            button.textContent = i;
            button.classList.add('pagination-link');
            if (i === this.currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', (event) => {
                event.preventDefault();
                this.goToPage(i);
            });
            paginationContainer.appendChild(button);
        }

        const nextButton = document.createElement('a');
        nextButton.href = '#';
        nextButton.classList.add('next');
        nextButton.innerHTML = '&raquo;';
        nextButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.goToPage(this.currentPage + 1);
        });
        paginationContainer.appendChild(nextButton);

        this.appendChild(paginationContainer);

        // Show the current page
        this.showPage(this.currentPage);
    }

    goToPage(pageNumber) {
        // Ensure page number is within valid range
        const totalPages = Math.ceil(this.movies.length / this.moviesPerPage);
        if (pageNumber < 1) pageNumber = 1;
        if (pageNumber > totalPages) pageNumber = totalPages;

        // Update current page
        this.currentPage = pageNumber;

        // Update active pagination link
        const links = this.querySelectorAll('.pagination-link');
        links.forEach(link => link.classList.remove('active'));
        if (links[pageNumber - 1]) {
            links[pageNumber - 1].classList.add('active');
        }

        // Show movies for the selected page
        this.showPage(pageNumber);
    }

    showPage(pageNumber) {
        // Calculate start and end indices for movies to display
        const startIndex = (pageNumber - 1) * this.moviesPerPage;
        const endIndex = pageNumber * this.moviesPerPage;

        // Display movies for the selected page
        const moviesContainer = document.getElementById('movies');
        moviesContainer.innerHTML = ''; // Clear previous movies
        for (let i = startIndex; i < endIndex && i < this.movies.length; i++) {
            const movieElement = this.createMovieElement(this.movies[i]);
            moviesContainer.appendChild(movieElement);
        }
    }

    createMovieElement(movie) {
        const article = document.createElement('article');
        article.classList.add('movie-small-sized');
        article.innerHTML = `
            <a href="intro.html?name=${movie.name}&genre=${movie.genre}">
                <div class="details">
                    <h3 class="Name">${movie.name}</h3>
                    <p class="year-and-duration"><img src="webimage/movieIcon.png" alt="movie-icon" class="movie-icon"> ${movie.since} - ${movie.duration} мин</p>
                    <div class="info">
                        <p>Directed by ${movie.director}</p>
                    </div>
                </div>
                <div class="poster">
                    <img src="${movie.poster}" alt="movie-small-sized-poster">
                </div>
            </a>
        `;
        return article;
    }
}

window.customElements.define('pagination-component', Pagination);
