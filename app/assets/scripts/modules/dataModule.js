export default class DataModule {
    constructor() {
        this.apiUrl = 'https://api.jsonbin.io/v3/b/6645bc42e41b4d34e4f48a87';
    }

    async fetchMovies() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch movies:', error);
            throw error;
        }
    }

    async sendMovie(movie) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to send movie:', error);
            throw error;
        }
    }
}
