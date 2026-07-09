"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NoteCard from "@/app/components/NoteCard";

interface ShareLink {
  token: string;
  accessType: "PUBLIC" | "PASSWORD";
  shareType: "ONE_TIME" | "TIME";
  viewCount: number;
  revoked: boolean;
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  shareLinks?: ShareLink[];
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      setLoading(true);

      const res = await fetch("/api/notes", {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to load notes");
        return;
      }

      setNotes(data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }


  async function deleteNote(id: string) {

    const confirmDelete = confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;


    try {

      const res = await fetch(`/api/notes/${id}`, {
        method:"DELETE",
        credentials:"include"
      });


      const data = await res.json();


      if(!res.ok){
        alert(data.message);
        return;
      }


      setNotes((prev)=>
        prev.filter((note)=>note.id !== id)
      );


    }catch(error){
      console.log(error);
      alert("Delete failed");
    }
  }



  if(loading){
    return(
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-600">
          Loading notes...
        </div>
      </div>
    )
  }



  return (

    <div className="min-h-screen bg-gray-50 flex">


      {/* Sidebar */}

      <aside className="hidden md:flex w-64 bg-white border-r min-h-screen flex-col p-6">


        <h1 className="text-2xl font-bold text-blue-600">
          SecureNotes
        </h1>


        <nav className="mt-10 space-y-3">


          <Link
            href="/notes"
            className="block px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium"
          >
            📒 My Notes
          </Link>


          <Link
            href="/notes/new"
            className="block px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            ✏️ Create Note
          </Link>


        </nav>



      </aside>




      {/* Main Content */}

      <main className="flex-1 p-6 md:p-10">


        <div className="flex justify-between items-center mb-10">


          <div>

            <h2 className="text-3xl font-bold text-gray-900">
              My Notes
            </h2>

            <p className="text-gray-500 mt-1">
              Manage your private notes securely
            </p>

          </div>



          <Link
            href="/notes/new"
            className="
            bg-blue-600 
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            shadow
            transition
            "
          >
            + New Note
          </Link>



        </div>





        {
          notes.length===0 ?

          (

          <div className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          p-12
          text-center
          ">


            <div className="text-5xl mb-4">
              📝
            </div>


            <h3 className="text-xl font-semibold">
              No notes yet
            </h3>


            <p className="text-gray-500 mt-2">
              Create your first secure note
            </p>



            <Link
              href="/notes/new"
              className="
              inline-block
              mt-6
              bg-green-600
              hover:bg-green-700
              text-white
              px-6
              py-3
              rounded-lg
              "
            >
              Create Note
            </Link>



          </div>


          )

          :


          (

          <div className="
          grid
          sm:grid-cols-2
          xl:grid-cols-3
          gap-6
          ">


            {
              notes.map((note)=>(

                <div
                key={note.id}
                className="
                bg-white
                rounded-2xl
                border
                shadow-sm
                hover:shadow-md
                transition
                p-1
                "
                >

                  <NoteCard
                    note={note}
                    onDelete={deleteNote}
                  />

                </div>

              ))
            }



          </div>

          )

        }



      </main>


    </div>

  );
}