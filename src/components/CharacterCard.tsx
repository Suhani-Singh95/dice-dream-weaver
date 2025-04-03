
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CharacterCardProps {
  character: {
    name: string;
    race: string;
    class: string;
    level: number;
    stats?: {
      strength: number;
      dexterity: number;
      constitution: number;
      intelligence: number;
      wisdom: number;
      charisma: number;
    };
  } | null;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  if (!character) {
    return (
      <Card className="border-2 border-wood">
        <CardHeader className="bg-leather text-parchment">
          <CardTitle className="font-fantasy text-center">Your Character</CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-parchment">
          <p className="text-center text-muted-foreground italic">
            Your character details will appear here as you chat with the AI.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-wood">
      <CardHeader className="bg-leather text-parchment">
        <CardTitle className="font-fantasy text-center">{character.name || "Unnamed Hero"}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-parchment">
        <div className="grid gap-2">
          <div className="flex justify-between border-b border-wood pb-2">
            <span className="font-bold">Race:</span>
            <span>{character.race}</span>
          </div>
          <div className="flex justify-between border-b border-wood pb-2">
            <span className="font-bold">Class:</span>
            <span>{character.class}</span>
          </div>
          <div className="flex justify-between border-b border-wood pb-2">
            <span className="font-bold">Level:</span>
            <span>{character.level}</span>
          </div>
          
          {character.stats && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex flex-col items-center bg-secondary p-2 rounded">
                <span className="text-xs">STR</span>
                <span className="font-bold">{character.stats.strength}</span>
              </div>
              <div className="flex flex-col items-center bg-secondary p-2 rounded">
                <span className="text-xs">DEX</span>
                <span className="font-bold">{character.stats.dexterity}</span>
              </div>
              <div className="flex flex-col items-center bg-secondary p-2 rounded">
                <span className="text-xs">CON</span>
                <span className="font-bold">{character.stats.constitution}</span>
              </div>
              <div className="flex flex-col items-center bg-secondary p-2 rounded">
                <span className="text-xs">INT</span>
                <span className="font-bold">{character.stats.intelligence}</span>
              </div>
              <div className="flex flex-col items-center bg-secondary p-2 rounded">
                <span className="text-xs">WIS</span>
                <span className="font-bold">{character.stats.wisdom}</span>
              </div>
              <div className="flex flex-col items-center bg-secondary p-2 rounded">
                <span className="text-xs">CHA</span>
                <span className="font-bold">{character.stats.charisma}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
