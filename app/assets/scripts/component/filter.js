export default class FilterComponent extends HTMLElement {
  movies = [];
  filteredMovies = [];

  constructor() {
    super();
    this.fetchMovies();
  }

  connectedCallback() {
    this.render();
    this.addEventListener('submit', this.handleFormSubmit.bind(this));
  }

  async fetchMovies() {
    try {
      const response = await fetch('/app/assets/scripts/modules/movies.json');
      this.movies = await response.json();
      this.filteredMovies = [...this.movies];
      this.updatePagination();
    } catch (error) {
      console.error('Error fetching data:', error);
      this.movies = [];
      this.filteredMovies = [];
    }
  }

  renderMovies() {
    const movieList = document.querySelector('movie-list');

    if (!movieList) return;

    movieList.movies = this.filteredMovies.slice(0, 24);  // Display first page of movies
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    const type = document.getElementById('type').value;
    const country = document.getElementById('country').value;
    const age = document.getElementById('age').value;
    const genre = document.getElementById('genre').value;
    const rating = document.getElementById('rating').value;
    const name = document.getElementById('name').value;

    this.filteredMovies = this.filterMovies(type, country, age, genre, rating, name);
    this.updatePagination();
    this.renderMovies();
    this.updateUrlParams({ type, country, age, genre, rating, name });
    this.updateTitle();
  }

  filterMovies(type, country, age, genre, rating, name) {
    return this.movies.filter(movie => {
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
  }

  updatePagination() {
    const pagination = document.querySelector('pagination-component');
    if (pagination) {
      pagination.updateMovies(this.filteredMovies);
    }
  }

  updateUrlParams(params) {
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

  updateTitle() {
    const titleOfMovies = document.querySelector('.filter').querySelector('.title');
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') || 'all';

    document.getElementById('number-of-movies').textContent = this.filteredMovies.length + ' кинонууд';

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

  render() {
    this.innerHTML = `<style>
      :root {
        --color-background: #0a0a0a;
        --color-button: #ff770b;
        --color-gray-button: #1c1c1c;
        --color-gray: #6c6c6c;
        --height-header: 64px;
        --color-gray-font: #808080;
        --color-white-font: #ffffff;
        --color-filter-gray: #3333338d;
        --color-footer: ;
      }
 
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: rgba(255, 255, 255);
      }
      .filter {
        width: 80%;
        margin: 0 auto;
      }
 
      .filter ul {
        list-style: none;
        display: flex;
        gap: 30px;
        padding: 20px 70px 5px;
        font-size: 18px;
        align-items: center;
      }
 
      .filter .title {
        font-size: 20px;
      }
      .search-middle {
        display: flex;
        width: 300px;
        height: 33px;
        padding: 5px 10px;
        align-items: center;
        background-color: var(--color-gray);
        border-radius: 20px;
      }
 
      .filter-dropdown option {
        background-color: rgba(108, 108, 108);
        font-size: 20px;
      }
 
      .filter-dropdown select {
        background-color: transparent;
        width: 200px;
        height: 40px;
        border-radius: 10px;
        border: none;
      }
 
      .filter ul button {
        color: var(--color-button);
      }
 
      .filter li > button.filter-button {
        background-color: var(--color-button);
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 15px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        width: 105px;
        height: 35px;
      }
 
      .filter li > button.filter-button:hover {
        background-color: white;
        color: #595959;
      }
 
      .filter #name {
        background-color: transparent;
        border: none;
      }
    </style>
 
    <section class="filter">
      <div>
        <p><strong class="title"></strong></p>
        <p id="number-of-movies">7600 кинонууд</p>
      </div>
      <form id="filterForm">
        <ul>
          <li class="search-middle">
            <img
              src="assets/images/search.png"
              alt="search-icon"
              class="search-icon"
            />
            <input
              type="text"
              name="name"
              id="name"
              class="search-input"
              placeholder="Хайх..."
            />
          </li>
          <li class="filter-dropdown">
            <select id="type" name="type">
              <option value="all">Сонголт</option>
              <option value="movie">Кино</option>
              <option value="tv_show">ТВ шоу</option>
              <option value="series">Цуврал</option>
            </select>
          </li>
          <li class="filter-dropdown">
            <select id="country" name="country">
              <option value="all">Улс</option>
              <option value="Mongolia">Монгол</option>
              <option value="United States">Америк</option>
              <option value="Japan">Япон</option>
              <option value="Korea">Солонгос</option>
              <option value="Poland">Польш</option>
              <option value="United Kingdom">Их Британи</option>
            </select>
          </li>
          <li class="filter-dropdown">
            <select id="age" name="age">
              <option value="all">Насны ангилал</option>
              <option value="13+">13+</option>
              <option value="16+">16+</option>
              <option value="18+">18+</option>
              <option value="R">R</option>
              <option value="PG-13">PG-13</option>
              <option value="PG">PG</option>
              <option value="E10+">E10+</option>
              <option value="G">G</option>
            </select>
          </li>
          <li class="filter-dropdown">
            <select id="genre" name="genre">
              <option value="all">Төрөл</option>
              <option value="Adventure">Адал явдалт</option>
              <option value="Horror">Аймшгийн</option>
              <option value="Thriller">Аллага</option>
              <option value="Western">Вестерн</option>
              <option value="Crime">Гэмт хэрэгт</option>
              <option value="Family">Гэр бүлийн</option>
              <option value="War">Дайны</option>
              <option value="Drama">Драм</option>
              <option value="Comedy">Инээдмийн</option>
              <option value="Music">Мюзикл</option>
              <option value="Science Fiction">Шинжлэх ухааны</option>
              <option value="History">Түүх</option>
              <option value="Romance">Романтик</option>
              <option value="Detective">Детектив</option>
              <option value="Fantasy">Уран зөгнөлт</option>
              <option value="Action">Экшн</option>
              <option value="Anime">Анимэ</option>
              <option value="Cartoon">Хүүхэлдэйн кино</option>
            </select>
          </li>
          <li class="filter-dropdown">
            <select id="rating" name="rating">
              <option value="all">Үнэлгээ</option>
              <option value="1-2">1-2</option>
              <option value="2-3">2-3</option>
              <option value="3-4">3-4</option>
              <option value="4-5">4-5</option>
            </select>
          </li>
          <li>
            <button type="submit" class="filter-button">Шүүх</button>
          </li>
        </ul>
      </form>
    </section>
    `;
  }
}

customElements.define("filter-component", FilterComponent);