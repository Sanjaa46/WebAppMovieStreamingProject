export default class BookmarkedComponent extends HTMLElement {
    constructor() {
        super();
        const movies = new Array();
    }
    connectedCallback() {
        this.render();
        document.getElementById('bookmarked').addEventListener('click', function () {
            console.log('checking');
        });
    }

    render() {
        this.innerHTML = `
        <li class="profile-option"><a href="movies.html" id="bookmarked"><img src="assets/images/bookmark.png" alt="bookmark">Хадгалсан</a></li>`;
    }
}