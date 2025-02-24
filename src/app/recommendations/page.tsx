// src/app/recommendation/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Match {
  id: number;
  title: string;
  release_year: number;
  content: string;
  similarity: number;
  shortSummary?: string;
}

export default function RecommendationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const question1 = searchParams.get('question1') || '';
  const question2 = searchParams.get('question2') || '';
  const question3 = searchParams.get('question3') || '';

  // We’ll combine the user’s input into one string:
  const combinedQuery = `${question1} ${question2} ${question3}`;

  const [matches, setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMatch = matches[currentIndex];

  // On mount, call our API route to get the 3 matches
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ combinedQuery })
        });
        const { matches } = await response.json();
        if (matches && Array.isArray(matches)) {
          setMatches(matches);
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      }
    };

    if (combinedQuery.trim()) {
      fetchRecommendations();
    }
  }, [combinedQuery]);

  const handleNext = () => {
    if (currentIndex < matches.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // If we're at the end, maybe go back to start or do something else
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="/popcorn.png"
        alt="PopChoice Logo"
        className="w-24 h-24 mb-4"
      />
      <h1 className="text-4xl font-bold mb-8">PopChoice</h1>

      <div className="bg-[#13264C] p-6 rounded-lg w-80 text-white">
        {currentMatch ? (
          <>
            <h2 className="text-2xl font-semibold mb-2">
              {currentMatch.title} ({currentMatch.release_year})
            </h2>
            <p className="mb-2 text-sm">Similarity: {currentMatch.similarity.toFixed(2)}</p>
            {currentMatch.shortSummary ? (
              <p className="mb-4">{currentMatch.shortSummary}</p>
            ) : (
              <p className="mb-4">{currentMatch.content}</p>
            )}
            <button
              onClick={handleNext}
              className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded"
            >
              {currentIndex < matches.length - 1 ? 'Next Movie' : 'Go Again'}
            </button>
          </>
        ) : (
          <p className="mb-4">Loading recommendations...</p>
        )}
      </div>
    </div>
  );
}