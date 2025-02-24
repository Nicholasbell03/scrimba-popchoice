'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MovieForm from '@/components/MovieForm';
import type { MovieMatch } from '@/lib/services/recommendationService';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (answers: {
    question1: string;
    question2: string;
    question3: string;
  }) => {
    try {
      setIsLoading(true);
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

      // Get the first match's ID to use in the URL
      const firstMatch = data.matches[0] as MovieMatch;
      if (firstMatch) {
        // Store the full matches data in localStorage for the recommendation page
        localStorage.setItem('movieMatches', JSON.stringify(data.matches));
        // Navigate to the recommendation page with just the ID
        router.push(`/recommendation/${firstMatch.id}`);
      } else {
        // Handle no matches case
        router.push('/recommendation/no-matches');
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
      // Handle error appropriately
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

      <MovieForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </div>
  );
}