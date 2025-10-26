import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteTag } from "@/types/note";
import { createNotePost } from "../api/clientApi";

type NoteDraftStore = {
    draft: createNotePost;
  setDraft: (note: createNotePost) => void;
  clearDraft: () => void;
}

const initialDraft: createNotePost = {
  title: '',
  content: '',
  tag: 'Todo' as NoteTag,
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist<NoteDraftStore>(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
    }
  )
);