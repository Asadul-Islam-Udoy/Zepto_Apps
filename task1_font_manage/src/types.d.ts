export interface Font {
  id: number;
  name: string;
  fontFamily: string;
}

export interface FontGroup {
  id: number;
  fontIds: number[];
}

export interface FontContextType {
  fonts: Font[];
  groups: FontGroup[];
  editingGroup: FontGroup | null;
  addFont: (font: Font) => void;
  addGroup: (group: FontGroup) => void;
  updateGroup: (id: number, group: FontGroup) => void;
  deleteGroup: (id: number) => void;
  setEditingGroup: (group: FontGroup | null) => void;
}
