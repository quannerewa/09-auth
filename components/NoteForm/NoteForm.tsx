"use client"

import css from "./NoteForm.module.css"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { NewNote } from "@/types/note";
import { createNote } from "@/lib/api/clientApi";


interface FormValues {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping" | "Ideas" | "Travel" | "Finance" | "Health" | "Important";
}

const values: FormValues = {
    title: "",
    content: "",
    tag: "Todo",
}

const AddNoteSchema = Yup.object().shape({
    title: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required field"),
    content: Yup.string().max(500, "Too Long!"),
    tag: Yup.string().oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health", "Important"]),
})


export default function NoteForm() {
    const fieldId = useId();
    const queryClient = useQueryClient();
    const router = useRouter();
    const { draft, setDraft, clearDraft } = useNoteDraftStore();

    const handleChange = (event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDraft({ ...draft, [event.target.name]: event.target.value });
    };

    const { mutate, isPending } = useMutation({
        mutationFn: (newNote: NewNote) => createNote(newNote),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["notes"],
            });
            clearDraft();
            router.push("/notes/filter/all");
        }
    })

    const handleSubmit = (values: FormValues) => {
        mutate({
            title: values.title,
            content: values.content,
            tag: values.tag,
        });
    };
    

    return (
        <Formik
            initialValues={draft ?? values}
            validationSchema={AddNoteSchema}
            onSubmit={handleSubmit}
            enableReinitialize
    >
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-title`}>Title</label>
                    <Field
                        id={`${fieldId}-title`}
                        type="text"
                        name="title"
                        onChange={handleChange}
                        className={css.input} />
                    <ErrorMessage
                        name="title"
                        component="span"
                        className={css.error}
                        />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-content`}>Content</label>
                    <Field
                        as="textarea"
                        name="content"
                        rows={8}
                        id={`${fieldId}-content`}
                        onChange={handleChange}
                        className={css.textarea}
                    >
                    </Field>
                    <ErrorMessage
                        name="content"
                        component="span"
                        className={css.error}
                        />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <Field
                        as="select"
                        name="tag"
                        id={`${fieldId}-tag`}
                        onChange={handleChange}
                        className={css.select}
                    >
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage
                        name="tag"
                        component="span"
                        className={css.error}
                    />
                </div>
                <button
                        type="submit"
                        className={css.submitButton}
                        disabled={isPending}
                    >
                    {isPending ? "Creating..." : "Create note"}
                </button>
                
                <button
                    type="button"
                    className={css.cancelButton}
                    onClick={() => { clearDraft(); router.back()}}
                >
                    Cancel
                </button>
            </Form>
    </Formik>
    )
}