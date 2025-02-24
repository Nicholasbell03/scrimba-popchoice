// /components/Form.tsx
'use client';

import React from 'react';
import { QuestionInput } from './QuestionInput';
import { Button } from './Button';

interface MovieFormProps {
  onSubmit: (answers: {
    question1: string;
    question2: string;
    question3: string;
  }) => void;
  isLoading?: boolean;
}

const questions = [
  {
    id: 'question1',
    label: "What's your favourite movie and why?",
    placeholder: "The Shawshank Redemption\nBecause it taught me to never give up hope..."
  },
  {
    id: 'question2',
    label: "Are you in the mood for something new or a classic?",
    placeholder: "I want to watch movies released after 1990"
  },
  {
    id: 'question3',
    label: "Do you wanna have fun or do you want something serious?",
    placeholder: "I want something fun and lighthearted"
  }
] as const;

export default function MovieForm({ onSubmit, isLoading = false }: MovieFormProps) {
  const [answers, setAnswers] = React.useState({
    question1: '',
    question2: '',
    question3: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  const handleAnswerChange = (questionId: keyof typeof answers) => (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-lg w-full max-w-md flex flex-col space-y-4 text-sm sm:text-base"
    >
      {questions.map(question => (
        <QuestionInput
          key={question.id}
          id={question.id}
          label={question.label}
          value={answers[question.id]}
          onChange={handleAnswerChange(question.id)}
          placeholder={question.placeholder}
          disabled={isLoading}
        />
      ))}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Finding Movies...' : 'Let\'s Go'}
      </Button>
    </form>
  );
}