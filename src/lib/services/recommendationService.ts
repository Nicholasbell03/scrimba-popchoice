import openai from '@/lib/openaiClient';
import supabase from '@/lib/supabaseClient';

export interface MovieMatch {
  id: number;
  title: string;
  release_year: number;
  content: string;
  similarity: number;
  shortSummary?: string;
}

export interface FormAnswers {
  question1: string;
  question2: string;
  question3: string;
}

export class RecommendationService {
  private static FUNCTION_NAME = 'match_movies';

  static combineAnswers(answers: FormAnswers): string {
    return `
      Favorite movie and why: ${answers.question1}
      Preferred era: ${answers.question2}
      Mood preference: ${answers.question3}
    `.trim();
  }

  private static async createEmbedding(text: string) {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text
    });

    return response.data[0].embedding;
  }

  private static async findMatches(embedding: number[], threshold = 0.5, limit = 3) {
    const { data: matches, error } = await supabase.rpc(
      this.FUNCTION_NAME,
      {
        query_embedding: embedding,
        match_threshold: threshold,
        match_count: limit
      }
    );

    if (error) throw new Error(error.message);
    return matches as MovieMatch[];
  }

  private static async generateSummary(
    match: MovieMatch,
    userQuery: string,
    characterLimit = 200
  ): Promise<string> {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that suggests movies based on a user's query. 
          Give a short summary of why this movie is a good match. 
          Keep your response under ${characterLimit} characters. 
          If unsure, say "I don't have enough info."`
        },
        {
          role: 'user',
          content: `
            Movie Title: ${match.title} 
            Release Year: ${match.release_year}
            Content: ${match.content}
            User Query: ${userQuery}
          `
        }
      ],
      max_tokens: 100,
      temperature: 0.7
    });

    return response.choices[0]?.message?.content?.trim() ?? '';
  }

  static async getRecommendations(answers: FormAnswers): Promise<MovieMatch[]> {
    // 1. Combine answers into a single query
    const combinedQuery = this.combineAnswers(answers);

    // 2. Create embedding
    const embedding = await this.createEmbedding(combinedQuery);

    // 3. Find matches
    const matches = await this.findMatches(embedding);

    // 4. Generate summaries for matches
    const matchesWithSummaries = await Promise.all(
      matches.map(async (match) => ({
        ...match,
        shortSummary: await this.generateSummary(match, combinedQuery)
      }))
    );

    return matchesWithSummaries;
  }
} 