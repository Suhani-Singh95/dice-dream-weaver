
import React from "react";
import { Sword } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="border-b-2 border-leather py-4 bg-wood text-parchment">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sword className="h-8 w-8 text-gold" />
          <h1 className="text-2xl md:text-3xl font-fantasy">D&D Character Builder</h1>
        </div>
        <div className="text-sm md:text-base">
          <p>Developed by <span className="font-bold text-gold">Suhani Singh (12306501)</span></p>
        </div>
      </div>
    </header>
  );
};

export default Header;
