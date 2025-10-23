"use client"

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import css from "./page.module.css"
import Link from "next/link";
import { fetchNotes } from "@/lib/api/clientApi";
import {NotesResponse } from "@/types/note";


interface NotesClientProps {
  initialData: NotesResponse;
  tag?: string;
}

export default function NotesClient({initialData, tag}: NotesClientProps) {


  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    updateSearchQuery(value);
  };
  
  const validTag = tag?.toLowerCase() === "all" ? undefined : tag;


  const {data, isLoading} = useQuery<NotesResponse>({
    queryKey: ["notes", validTag, currentPage, searchQuery],
    queryFn: () => fetchNotes({ page: currentPage, search: searchQuery, tag: validTag, perPage: 12 }),
    placeholderData: keepPreviousData,
    initialData,
  })

  const totalPages = data?.totalPages ?? 0;

  
  return (
    <div className={css.app}>
	    <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={handleSearchChange}/>
        {totalPages > 1 && (
        <Pagination totalNumberOfPages={totalPages} currentActivePage={currentPage} setPage={setCurrentPage} />)}
		    <Link href="/notes/action/create" className={css.button}>Create note +</Link>
      </header>

      {isLoading ? (
        <p className={css.loading}>Loading notes...</p>
      ) : (
        <NoteList notes={data?.data ?? []} />
      )}
  </div>
  )
}