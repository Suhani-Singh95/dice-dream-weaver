
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
  isOpen: boolean;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit, isOpen }) => {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="border-2 border-wood bg-parchment">
        <DialogHeader>
          <DialogTitle className="font-fantasy text-darkRed text-xl">Gemini API Key Required</DialogTitle>
          <DialogDescription>
            Please enter your Gemini API key to use the D&D Character Builder. Your key is not stored on our servers.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter your Gemini API key..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="border border-wood"
          />
          
          <div className="flex justify-end">
            <Button type="submit" className="fantasy-button" disabled={!apiKey.trim()}>
              Submit
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>You can get a Gemini API key from the <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="underline text-accent hover:text-accent-foreground">Google AI Studio</a>.</p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyInput;
