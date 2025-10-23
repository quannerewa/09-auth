import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";

interface NoteDetailsProps {
    params: Promise<{ id: string }>;
}
interface MetadataProps {
    params: Promise<{ id: string }>,
}

export const generateMetadata = async ({ params }: MetadataProps): Promise<Metadata> => {
    const { id } = await params;
    const data = await fetchNoteByIdServer(id);

    return {
        title: `Note: ${data.title}`,
        description: data.content.slice(0, 30),
        openGraph: {
            title: `Note: ${data.title}`,
            description: data.content.slice(0, 30),
            url: `https://07-routing-nextjs-blond.vercel.app/notes/${id}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: data.title,
                }
            ] 

        }
    }
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
    const { id } = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteByIdServer(id),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient id={id} />
        </HydrationBoundary>
    );
    


}

export default NoteDetails