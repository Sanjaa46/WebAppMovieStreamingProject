class Pagination extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <style>
            .pagination {
                padding-top: 20px;
                text-align: center;
            }

            .pagination a {
                color: white;
                text-decoration: none;
                padding: 10px;
                display: inline-block;
            }

            .pagination a.active {
                background-color: grey;
                font-weight: bold;
                border-radius: 5px;
            }

            .pagination a:hover:not(.active) {
                background-color: #555;
                border-radius: 5px;
            }
        </style>
        <section class="pagination">
            <a href="#" class="prev">&laquo;</a>
            <a href="#" class="active">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#" class="next">&raquo;</a>
        </section>
        <ul id="movie-list"></ul>
        `;

        // Fetch movies data and setup pagination
        this.fetchMoviesFromJSON().then(() => {
            this.setupPagination();
        });
    }

    async fetchMoviesFromJSON() {
        try {
            const response = await fetch('/app/assets/scripts/modules/movies.json');
            this.movies = await response.json();
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    setupPagination() {
        var movieList = document.getElementById('movie-list');
        var moviesPerPage = 3; // Adjust the number of movies per page as needed
        var currentPage = 1;

        function showPage(page) {
            for (var i = 0; i < this.movies.length; i++) {
                movieList.children[i].style.display = i >= (page - 1) * moviesPerPage && i < page * moviesPerPage ? 'block' : 'none';
            }
        }

        function updatePaginationButtons() {
            var paginationContainer = document.querySelector('.pagination');
            paginationContainer.innerHTML = '';

            var totalPages = Math.ceil(this.movies.length / moviesPerPage);

            for (var i = 1; i <= totalPages; i++) {
                var a = document.createElement('a');
                a.textContent = i;
                a.href = '#';
                a.addEventListener('click', function () {
                    currentPage = parseInt(this.textContent);
                    showPage(currentPage);
                    updatePaginationButtons();
                });

                if (i === currentPage) {
                    a.classList.add('active');
                }

                paginationContainer.appendChild(a);
            }
        }

        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
                updatePaginationButtons();
            }
        }

        function nextPage() {
            if (currentPage < Math.ceil(this.movies.length / moviesPerPage)) {
                currentPage++;
                showPage(currentPage);
                updatePaginationButtons();
            }
        }

        document.querySelector('.prev').addEventListener('click', prevPage);
        document.querySelector('.next').addEventListener('click', nextPage);

        // Initial page display
        showPage(currentPage);
        updatePaginationButtons();
    }
}

window.customElements.define('wc-pagination', Pagination);
