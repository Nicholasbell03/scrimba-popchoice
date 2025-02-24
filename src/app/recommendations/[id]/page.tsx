'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { MovieMatch } from '@/lib/services/recommendationService';
import { searchMovie, getMoviePosterUrl } from '@/lib/tmdbClient';

interface MovieDetails extends MovieMatch {
  posterUrl?: string;
}

export default function MovieRecommendationPage() {
  const router = useRouter();
  const params = useParams();
  const [currentMatch, setCurrentMatch] = useState<MovieDetails | null>(null);
  const [allMatches, setAllMatches] = useState<MovieDetails[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMovieDetails(match: MovieMatch): Promise<MovieDetails> {
      try {
        const movieData = await searchMovie(match.title, match.release_year);
        return {
          ...match,
          posterUrl: movieData?.poster_path ? getMoviePosterUrl(movieData.poster_path) : undefined
        };
      } catch (error) {
        console.error('Error fetching movie poster:', error);
        return match;
      }
    }

    async function initializeMatches() {
      setIsLoading(true);
      const storedMatches = localStorage.getItem('movieMatches');
      if (!storedMatches) {
        router.push('/');
        return;
      }

      const matches: MovieMatch[] = JSON.parse(storedMatches);
      const index = matches.findIndex(match => match.id.toString() === params.id);
      if (index === -1) {
        router.push('/');
        return;
      }

      // Load movie details for all matches
      const matchesWithDetails = await Promise.all(
        matches.map(loadMovieDetails)
      );
      
      setAllMatches(matchesWithDetails);
      setCurrentIndex(index);
      setCurrentMatch(matchesWithDetails[index]);
      setIsLoading(false);
    }

    initializeMatches();
  }, [params.id, router]);

  const handleNext = () => {
    if (currentIndex < allMatches.length - 1) {
      const nextMatch = allMatches[currentIndex + 1];
      router.push(`/recommendations/${nextMatch.id}`);
    } else {
      router.push('/');
    }
  };

  if (isLoading || !currentMatch) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#020817] text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020817] text-white p-4 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold">
          {currentMatch.title} ({currentMatch.release_year})
        </h1>
        
        {currentMatch.posterUrl ? (
          <div className="relative aspect-[2/3] max-h-[30rem] mx-auto rounded-lg overflow-hidden my-4 md:my-8">
            <img
              src={currentMatch.posterUrl}
              alt={currentMatch.title}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="bg-[#13264C] aspect-[2/3] max-h-[30rem] rounded-lg flex items-center justify-center my-4 md:my-8">
            <p className="text-lg">No poster available</p>
          </div>
        )}

        <p className="text-lg mb-6 text-justify">{currentMatch.content}</p>

        <button
          onClick={handleNext}
          className="w-full bg-[#4ade80] hover:bg-[#22c55e] text-black font-bold py-4 rounded-lg text-xl transition-colors"
        >
          {currentIndex < allMatches.length - 1 ? 'Next Movie' : 'Start Over'}
        </button>
      </div>
    </div>
  );
} 