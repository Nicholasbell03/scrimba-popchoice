# PopChoice: AI-Powered Movie Recommendation Engine

PopChoice is a sophisticated movie recommendation system that leverages advanced AI technologies to provide personalized movie suggestions. Built with Next.js and powered by OpenAI's embedding models, this application demonstrates modern approaches to content-based recommendation systems.

## 🚀 Technical Features

- **Vector Embeddings**: Utilizes OpenAI's `text-embedding-ada-002` model to create high-dimensional vector representations of movies and user preferences
- **Semantic Search**: Implements cosine similarity matching in Supabase for efficient and accurate movie recommendations
- **Real-time AI Processing**: Integrates OpenAI's GPT-3.5 Turbo for dynamic summary generation and recommendation explanations
- **Modern Tech Stack**:
  - Next.js 15 with App Router
  - TypeScript for type safety
  - Supabase for vector storage and similarity search
  - TMDB API integration for movie metadata and posters
  - Tailwind CSS for responsive design

## 🎯 How It Works

1. **Data Processing**: Movies are processed through OpenAI's embedding model to create vector representations of their content
2. **User Input Analysis**: User preferences are converted into the same vector space using the embedding model
3. **Semantic Matching**: Advanced similarity algorithms find movies that best match user preferences
4. **AI-Generated Explanations**: Each recommendation comes with a personalized explanation of why it matches the user's preferences

## 🛠️ Getting Started

1. Clone the repository
2. Install dependencies:
```bash
yarn install
```
3. Set up environment variables:
```bash
OPENAI_API_KEY=your_key_here
SUPABASE_URL=your_url_here
SUPABASE_ANON_KEY=your_key_here
TMDB_AUTH_TOKEN=your_token_here
```
4. Run the development server:
```bash
yarn dev
```

## 💡 Implementation Details

The system uses a sophisticated pipeline for processing and matching:

- Vector embeddings are generated using OpenAI's embedding model
- Matches are found using Supabase's vector similarity search capabilities
- Real-time summaries are generated using GPT-3.5 Turbo
- Movie metadata and posters are fetched from TMDB's API

## 🔒 Security

- All API keys are properly secured using environment variables
- Authentication tokens are handled securely
- No sensitive data is exposed to the client

## 🌐 Live Demo

Visit [your-deployment-url-here] to try out the application.

## 📝 Future Improvements

- Implement collaborative filtering
- Add user authentication and personalized history
- Expand movie database and recommendation criteria
- Add more sophisticated matching algorithms

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
