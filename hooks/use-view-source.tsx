import { create } from "zustand";

type ViewSourceStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
  fileBeingViewedUrl: string | undefined | null,
  setFileBeingViewed: (fileUrl: string | undefined | null) => void,
  viewIsFirstView: boolean,
  setViewIsFirstViewToFalse: () => void,
  setViewIsFirstViewToTrue: () => void
};

export const useViewSource = create<ViewSourceStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false}),
  toggle: () => set({ isOpen: !get().isOpen }),
  fileBeingViewedUrl: undefined,
  setFileBeingViewed: (fileUrl: string | undefined |null) => set({ fileBeingViewedUrl: fileUrl }),
  viewIsFirstView: true,
  setViewIsFirstViewToFalse: () => set({ viewIsFirstView: false }),
  setViewIsFirstViewToTrue: () => set({ viewIsFirstView: true })
}))