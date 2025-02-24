interface QuestionInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function QuestionInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled = false
}: QuestionInputProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="p-2 border rounded-md min-h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
} 