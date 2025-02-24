import { NextResponse } from 'next/server';
import { embedAndStoreMovies } from '@/utils/embedMovies';

export async function GET() {
    try {
        await embedAndStoreMovies();
        return NextResponse.json({ message: 'Movies embedded and stored successfully' });
    } catch (error) {
        console.error('Error in embed route:', error);
        return NextResponse.json(
            { error: 'Failed to embed and store movies' },
            { status: 500 }
        );
    }
} 