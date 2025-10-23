import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "New Note Page",
    description: "Page for add new note",
    openGraph: {
        title: "New Note Page",
        description: "Page for add new note",
        url: "https://07-routing-nextjs-blond.vercel.app/notes/action/create",
        images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: "New Note Page",
                }
            ]
    }
}

const CreateNote = () => {


    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm/>
            </div>
        </main>
    )
}

export default CreateNote;