'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MovieForm from '@/components/MovieForm';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (answers: {
    question1: string;
    question2: string;
    question3: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get recommendations');
      }

      if (!data.matches?.length) {
        setError('No matches found. Please try different preferences.');
        return;
      }

      // Store all matches in localStorage
      localStorage.setItem('movieMatches', JSON.stringify(data.matches));
      
      // Navigate to the first match
      router.push(`/recommendations/${data.matches[0].id}`);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Logo */}
      <img
        src="/popcorn.png"
        alt="PopChoice Logo"
        className="w-24 h-24 mb-4"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">PopChoice</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <MovieForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </div>
  );
}