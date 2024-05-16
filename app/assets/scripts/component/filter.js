import Movie from '../modules/Movies.js';


class FilterComponent extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();

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
            <option value="Action">Тулаант</option>
            <option value="History">Түүхэн</option>
            <option value="Fairy">Үлгэрийн</option>
            <option value="Fantasy">Зөгнөлт</option>
            <option value="Animation">Хүүхэлдэйн кино</option>
            <option value="Sci-Fi">Ш/У уран зөгнөлт</option>
          </select>
        </li>
        <li class="filter-dropdown">
          <select id="rating" name="rating">
            <option value="all">Үнэлгээ</option>
            <option value="8-10">8-10</option>
            <option value="6-8">6-8</option>
            <option value="4-6">4-6</option>
            <option value="2-4">2-4</option>
            <option value="0-2">0-2</option>
          </select>
        </li>
        <li>
          <button type="submit" class="filter-button">Хайх</button>
        </li>
      </ul>
    </form>
  </section>`;
  };


}

customElements.define("filter-component", FilterComponent);

