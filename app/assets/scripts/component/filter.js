

class FilterComponent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const template = document.createElement("template");
        template.innerHTML = `
        <style>
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
          
          .filter > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 60px;
            border-bottom: 1px solid white;
            width: 100%;
            max-width: 1350px;
            margin: 0 auto;
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
      </section>
      
        `;

        shadow.appendChild(template.content.cloneNode(true));
    }


}

customElements.define("filter-component", FilterComponent);
