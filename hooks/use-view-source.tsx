import { create } from "zustand";

type ViewSourceStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};

export const useViewSource = create<ViewSourceStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false}),
  toggle: () => set({ isOpen: !get().isOpen })
}))