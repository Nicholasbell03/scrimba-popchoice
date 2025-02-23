import openai from '../lib/openaiClient.js';
import supabase from '../lib/supabaseClient.js';
import movies from '../data/movies.js';

async function embedAndStoreMovies() {
    try {
        console.log('Starting to process movies...');
        
        // Process each movie
        const moviesWithEmbeddings = await Promise.all(
            movies.map(async (movie) => {
                // Create embedding for movie content
                const embeddingResponse = await openai.embeddings.create({
                    model: "text-embedding-ada-002",
                    input: movie.content
                });
                
                return {
                    title: movie.title,
                    release_year: movie.releaseYear,
                    content: movie.content,
                    embedding: embeddingResponse.data[0].embedding
                };
            })
        );
        
        // Store in Supabase
        const { data, error } = await supabase
            .from('movies')
            .insert(moviesWithEmbeddings);
            
        if (error) {
            throw error;
        }
        
        console.log('Successfully embedded and stored', moviesWithEmbeddings.length, 'movies');
        return data;
        
    } catch (error) {
        console.error('Error processing movies:', error);
        throw error;
    }
}

// Execute the function
embedAndStoreMovies()
    .then(() => console.log('Movie embedding process completed'))
    .catch(error => console.error('Failed to process movies:', error)); 