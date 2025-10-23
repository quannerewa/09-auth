import Link from "next/link"
import css from "./SideBarNotes.module.css"
import type { NoteTag } from "@/types/note";


const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health", "Important"];

const SidebarNotes = () => {


    return (
        <ul className={css.menuList}>
            <li className={css.menuItem}>
                <Link
                    href={`/notes/filter/all`}
                    className={css.menuLink}
                    >
                    All notes
                    </Link>
            </li>

        {tags.map(tag => (
            <li key={tag} className={css.menuItem}>
                <Link
                    href={`/notes/filter/${tag}`}
                    className={css.menuLink}
                    >
                    {tag}
                    </Link>
            </li>
                   ))} 
        </ul>
    )
}

export default SidebarNotes;



