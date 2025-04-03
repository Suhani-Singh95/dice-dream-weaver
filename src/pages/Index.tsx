
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import CharacterCard from "@/components/CharacterCard";
import ApiKeyInput from "@/components/ApiKeyInput";
import CharacterBuilder from "@/components/CharacterBuilder";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);
  const [character, setCharacter] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key exists in localStorage
    const savedApiKey = localStorage.getItem("gemini-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    localStorage.setItem("gemini-api-key", key);
    setShowApiKeyInput(false);
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved for this session.",
    });
  };

  const handlePromptSelect = (prompt: string) => {
    // This function will be passed to our prompt buttons
    const chatInterface = document.querySelector("input");
    if (chatInterface) {
      // Simulate setting the value and dispatching an input event
      const inputEvent = new Event("input", { bubbles: true });
      (chatInterface as HTMLInputElement).value = prompt;
      chatInterface.dispatchEvent(inputEvent);
      // Focus the input
      chatInterface.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-parchment bg-[url('/parchment-bg.jpg')] bg-repeat">
      <Header />
      
      <main className="container flex-1 py-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Character Card and Quick Prompts Section */}
          <div className="space-y-6">
            <CharacterCard character={character} />
            
            <div className="border-2 border-wood bg-parchment p-4 rounded">
              <h2 className="font-fantasy text-xl text-darkRed mb-4 text-center">Quick Prompts</h2>
              <CharacterBuilder onPromptSelect={handlePromptSelect} />
            </div>
            
            <div className="border-2 border-wood bg-parchment p-4 rounded">
              <h2 className="font-fantasy text-xl text-darkRed mb-2 text-center">About</h2>
              <p className="text-sm text-muted-foreground">
                This D&D Character Builder helps you create and understand Dungeons & Dragons characters. 
                Ask about races, classes, abilities, spells, or any other character creation questions!
              </p>
              <Separator className="my-2 bg-wood" />
              <p className="text-xs text-center font-bold">
                Developed by Suhani Singh (12306501)
              </p>
            </div>
          </div>
          
          {/* Chat Interface */}
          <div className="md:col-span-2 border-2 border-wood rounded-lg overflow-hidden bg-parchment flex flex-col h-[600px]">
            <Tabs defaultValue="chat" className="flex flex-col h-full">
              <div className="border-b border-wood px-4">
                <TabsList className="bg-transparent border-b-0">
                  <TabsTrigger value="chat" className="font-fantasy text-darkRed data-[state=active]:text-primary data-[state=active]:bg-secondary">Chat</TabsTrigger>
                  <TabsTrigger value="guide" className="font-fantasy text-darkRed data-[state=active]:text-primary data-[state=active]:bg-secondary">Guide</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="chat" className="flex-1 m-0 overflow-hidden">
                <ChatInterface 
                  apiKey={apiKey} 
                  onApiKeyMissing={() => setShowApiKeyInput(true)}
                  onCharacterUpdate={setCharacter}
                />
              </TabsContent>
              
              <TabsContent value="guide" className="flex-1 m-0 p-6 overflow-auto">
                <ScrollArea className="h-full">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-fantasy text-darkRed">Welcome to D&D Character Builder!</h2>
                      <p className="mt-2">
                        This assistant helps you create and understand Dungeons & Dragons characters using AI. 
                        It can answer questions about races, classes, abilities, spells, and more.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-fantasy text-darkRed">How to Use</h3>
                      <ul className="list-disc pl-6 space-y-2 mt-2">
                        <li>Ask questions about D&D character creation</li>
                        <li>Get explanations about classes, races, and abilities</li>
                        <li>Generate random characters or specific builds</li>
                        <li>Learn about game mechanics related to characters</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-fantasy text-darkRed">Example Questions</h3>
                      <ul className="list-disc pl-6 space-y-2 mt-2">
                        <li>"What's the best class for a beginner?"</li>
                        <li>"Create a half-elf bard character for me"</li>
                        <li>"Explain the difference between Wizards and Sorcerers"</li>
                        <li>"What are the racial traits of Dragonborn?"</li>
                        <li>"Help me distribute ability scores for a Rogue"</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-fantasy text-darkRed">Limitations</h3>
                      <p className="mt-2">
                        This assistant is focused on D&D character creation only. It won't answer questions 
                        about topics outside of Dungeons & Dragons or character creation.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center border-t border-wood bg-wood text-parchment">
        <p className="text-sm">© 2025 D&D Character Builder · Developed by Suhani Singh (12306501)</p>
      </footer>
      
      <ApiKeyInput 
        isOpen={showApiKeyInput} 
        onApiKeySubmit={handleApiKeySubmit} 
      />
    </div>
  );
};

export default Index;
