import React, { createContext, useState } from "react";
import { Font, FontGroup, FontContextType } from "../types";

export const FontContext = createContext<FontContextType>({} as FontContextType);

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [groups, setGroups] = useState<FontGroup[]>([]);
  const [editingGroup, setEditingGroup] = useState<FontGroup | null>(null);

  const addFont = (font: Font) => setFonts(prev => [...prev, font]);
  const addGroup = (group: FontGroup) => setGroups(prev => [...prev, group]);
  const updateGroup = (id: number, group: FontGroup) => {
    setGroups(prev => prev.map(g => (g.id === id ? group : g)));
  };
  const deleteGroup = (id: number) => setGroups(prev => prev.filter(g => g.id !== id));

  return (
    <FontContext.Provider value={{
      fonts, groups, editingGroup,
      addFont, addGroup, updateGroup, deleteGroup, setEditingGroup
    }}>
      {children}
    </FontContext.Provider>
  );
};
