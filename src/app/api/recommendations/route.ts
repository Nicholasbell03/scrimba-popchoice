// src/app/api/recommendations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { RecommendationService, FormAnswers } from '@/lib/services/recommendationService';

export async function POST(request: NextRequest) {
  try {
    const answers = await request.json() as FormAnswers;

    if (!answers.question1 || !answers.question2 || !answers.question3) {
      return NextResponse.json(
        { error: 'Missing required answers' },
        { status: 400 }
      );
    }

    const recommendations = await RecommendationService.getRecommendations(answers);
    return NextResponse.json({ matches: recommendations });

  } catch (error) {
    console.error('Error in POST /recommendations:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}