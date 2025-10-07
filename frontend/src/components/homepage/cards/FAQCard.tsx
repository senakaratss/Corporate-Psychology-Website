import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQCardProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}
const FAQCard = ({ question, answer, isOpen, onToggle }: FAQCardProps) => {
  return (
    <div className="rounded-lg shadow-sm bg-white overflow-hidden">
      <button
        className="w-full flex justify-between items-center px-5 py-4 text-left text-gray-900 font-medium hover:bg-gray-50"
        onClick={onToggle}
      >
        <span>{question}</span>

        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-green-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 py-2 text-sm text-gray-600">{answer}</div>
      )}
    </div>
  );
};

export default FAQCard;
