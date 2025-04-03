
import React from "react";
import { Dice, BookOpen, User, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CharacterBuilderProps {
  onPromptSelect: (prompt: string) => void;
}

const CharacterBuilder: React.FC<CharacterBuilderProps> = ({ onPromptSelect }) => {
  const commonPrompts = [
    {
      icon: <Dice className="h-5 w-5" />,
      title: "Random Character",
      prompt: "Generate a random D&D character for me with stats, race, and class.",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Class Guide",
      prompt: "Explain the Fighter class and its subclasses.",
    },
    {
      icon: <User className="h-5 w-5" />,
      title: "Race Guide",
      prompt: "Tell me about the Elf race and its subraces in D&D.",
    },
    {
      icon: <Swords className="h-5 w-5" />,
      title: "Combat Build",
      prompt: "What's a good combat-focused character build?",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {commonPrompts.map((item, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-auto flex flex-col p-4 border-2 border-wood bg-parchment hover:bg-secondary items-center"
          onClick={() => onPromptSelect(item.prompt)}
        >
          <div className="text-leather mb-2">{item.icon}</div>
          <div className="font-fantasy text-sm">{item.title}</div>
        </Button>
      ))}
    </div>
  );
};

export default CharacterBuilder;
