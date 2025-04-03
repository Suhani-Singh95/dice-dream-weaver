
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import ChatMessage from "./ChatMessage";
import { queryGemini } from "@/services/geminiService";

interface ChatMessage {
  content: string;
  isUser: boolean;
}

interface ChatInterfaceProps {
  apiKey: string;
  onApiKeyMissing: () => void;
  onCharacterUpdate?: (character: any) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  apiKey, 
  onApiKeyMissing,
  onCharacterUpdate
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: "Greetings, adventurer! I'm your D&D character creation assistant. How may I help you build your character today?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function that attempts to extract character information from AI responses
  const extractCharacterInfo = (text: string) => {
    // This is a simple implementation - in a real app you might want more complex parsing
    const characterInfo: any = {};
    
    // Try to extract name
    const nameMatch = text.match(/name:\s*([^\n,\.]+)/i);
    if (nameMatch) characterInfo.name = nameMatch[1].trim();
    
    // Try to extract race
    const raceMatch = text.match(/race:\s*([^\n,\.]+)/i) || 
                     text.match(/a\s+([^\s]+)\s+(dragonborn|dwarf|elf|gnome|half-elf|half-orc|halfling|human|tiefling)/i);
    if (raceMatch) characterInfo.race = raceMatch[1].trim();
    
    // Try to extract class
    const classMatch = text.match(/class:\s*([^\n,\.]+)/i) ||
                      text.match(/(barbarian|bard|cleric|druid|fighter|monk|paladin|ranger|rogue|sorcerer|warlock|wizard)/i);
    if (classMatch) characterInfo.class = classMatch[1].trim();
    
    // Set level (default to 1 if not found)
    const levelMatch = text.match(/level:\s*(\d+)/i);
    characterInfo.level = levelMatch ? parseInt(levelMatch[1]) : 1;
    
    // Check if we have at least some basic info
    if (characterInfo.name || characterInfo.race || characterInfo.class) {
      if (!characterInfo.name) characterInfo.name = "Unnamed Hero";
      if (!characterInfo.race) characterInfo.race = "Unknown";
      if (!characterInfo.class) characterInfo.class = "Adventurer";
      
      // Try to extract ability scores
      const strMatch = text.match(/strength:\s*(\d+)/i);
      const dexMatch = text.match(/dexterity:\s*(\d+)/i);
      const conMatch = text.match(/constitution:\s*(\d+)/i);
      const intMatch = text.match(/intelligence:\s*(\d+)/i);
      const wisMatch = text.match(/wisdom:\s*(\d+)/i);
      const chaMatch = text.match(/charisma:\s*(\d+)/i);
      
      // If we found any stats, add them
      if (strMatch || dexMatch || conMatch || intMatch || wisMatch || chaMatch) {
        characterInfo.stats = {
          strength: strMatch ? parseInt(strMatch[1]) : 10,
          dexterity: dexMatch ? parseInt(dexMatch[1]) : 10,
          constitution: conMatch ? parseInt(conMatch[1]) : 10,
          intelligence: intMatch ? parseInt(intMatch[1]) : 10,
          wisdom: wisMatch ? parseInt(wisMatch[1]) : 10,
          charisma: chaMatch ? parseInt(chaMatch[1]) : 10,
        };
      }
      
      return characterInfo;
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    if (!apiKey) {
      onApiKeyMissing();
      return;
    }

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to chat
    setMessages((prev) => [...prev, { content: userMessage, isUser: true }]);
    
    setIsLoading(true);
    
    try {
      const response = await queryGemini(userMessage, apiKey);
      
      // Add AI response to chat
      setMessages((prev) => [...prev, { content: response, isUser: false }]);
      
      // Try to extract character info from the conversation
      const characterInfo = extractCharacterInfo(response);
      if (characterInfo && onCharacterUpdate) {
        onCharacterUpdate(characterInfo);
      }
    } catch (error) {
      console.error("Error in chat submission:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 scroll-container">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.content} isUser={message.isUser} />
        ))}
        {isLoading && (
          <div className="bot-message">
            <p className="text-sm animate-pulse">The Dungeon Master is thinking...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-wood">
        <div className="flex gap-2">
          <Input
            className="chat-input"
            placeholder="Ask about D&D character creation..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="fantasy-button" 
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
