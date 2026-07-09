"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Navbar() {

  const pathname = usePathname();
  const router = useRouter();


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);



  // Check user login status
  useEffect(() => {


    const checkLogin = async () => {

      try {

        const res = await fetch(
          "/api/auth/me",
          {
            method:"GET",
            credentials:"include",
            cache:"no-store"
          }
        );


        const data = await res.json();


        setIsLoggedIn(
          data.loggedIn === true
        );


      }
      catch(error){

        console.log(error);

        setIsLoggedIn(false);

      }
      finally{

        setLoading(false);

      }

    };


    checkLogin();


  }, [pathname]);





  // Logout Function
  const logout = async () => {


    try {


      const res = await fetch(
        "/api/auth/logout",
        {
          method:"POST",
          credentials:"include"
        }
      );



      if(res.ok){

        setIsLoggedIn(false);


        router.push("/auth/login");


        router.refresh();

      }


    }
    catch(error){

      console.log(error);

    }


  };





  const linkClass = (path:string) => {


    return pathname === path

      ? "text-blue-600 font-semibold"

      : "text-gray-700 hover:text-blue-600";


  };





  if(loading){

    return null;

  }





  return (

    <nav className="w-full border-b bg-white shadow-sm">


      <div
        className="
        max-w-6xl
        mx-auto
        px-6
        py-4
        flex
        items-center
        justify-between
        "
      >


        {/* Logo */}

        <Link

          href="/"

          className="
          text-2xl
          font-bold
          text-blue-600
          "

        >

          NoteShare

        </Link>





        {/* Navigation */}

        <div className="flex items-center gap-6">


          {
            isLoggedIn ? (

              <>


                <Link

                  href="/notes/new"

                  className={
                    linkClass("/notes/new")
                  }

                >

                  New Note

                </Link>





                <Link

                  href="/notes"

                  className={
                    linkClass("/notes")
                  }

                >

                  My Notes

                </Link>





                <button

                  onClick={logout}

                  className="
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  transition
                  "

                >

                  Logout

                </button>



              </>


            ) : (

              <>


                <Link

                  href="/auth/login"

                  className={
                    linkClass("/auth/login")
                  }

                >

                  Login

                </Link>





                <Link

                  href="/auth/register"

                  className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  transition
                  "

                >

                  Register

                </Link>



              </>

            )

          }



        </div>



      </div>


    </nav>

  );

}