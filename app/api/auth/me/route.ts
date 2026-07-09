import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/jwt";


export async function GET() {

  try {


    const cookieStore = await cookies();


    const token =
      cookieStore.get("token")?.value;



    if(!token){

      return NextResponse.json(
        {
          loggedIn:false
        },
        {
          status:200
        }
      );

    }



    const user =
      verifyToken(token);



    if(!user){

      return NextResponse.json(
        {
          loggedIn:false
        },
        {
          status:200
        }
      );

    }




    return NextResponse.json(
      {
        loggedIn:true,
        user
      },
      {
        status:200
      }
    );



  }
  catch(error){


    console.log("Auth check error:",error);



    return NextResponse.json(
      {
        loggedIn:false
      },
      {
        status:200
      }
    );


  }

}