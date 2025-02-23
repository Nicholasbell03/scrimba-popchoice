interface QuestionInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function QuestionInput({ id, label, value, onChange, placeholder }: QuestionInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-24 p-2 rounded-lg bg-[#3B4877] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={2}
        required
      />
    </div>
  );
} 