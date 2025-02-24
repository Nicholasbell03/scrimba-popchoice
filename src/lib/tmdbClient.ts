const TMDB_AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTJhOTc0NGQwODUyZTllZjUwNThkM2Y4ZTRmZjdjNyIsIm5iZiI6MTc0MDQzMTc0OC44NTQsInN1YiI6IjY3YmNlMTg0MzBhYjlmZWRhOTk5OWM3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1IfN_ARZuNHSTCEReWRVhW4PQQsNnTgARa7th5nQQ04';
const BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
    'accept': 'application/json',
    'Authorization': `Bearer ${TMDB_AUTH_TOKEN}`
};

export async function searchMovie(title: string, year?: number) {
    const response = await fetch(
        `${BASE_URL}/search/movie?query=${encodeURIComponent(title)}${year ? `&year=${year}` : ''}`,
        { headers }
    );
    const data = await response.json();
    return data.results?.[0] || null;
}

export function getMoviePosterUrl(posterPath: string, size: 'w500' | 'original' = 'w500') {
    return `https://image.tmdb.org/t/p/${size}${posterPath}`;
} 