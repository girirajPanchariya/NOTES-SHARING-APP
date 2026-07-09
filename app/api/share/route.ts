import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/app/lib/auth";
import bcrypt from "bcryptjs";
import crypto from "crypto";


export async function POST(req: NextRequest) {

  try {

    const userId = await getUserId();


    if(!userId){
      return NextResponse.json(
        {
          message:"Unauthorized"
        },
        {
          status:401
        }
      );
    }


    const body = await req.json();


    const {
      noteId,
      shareType,
      accessType,
      expiresAt,
      password
    } = body;



    if(!noteId){

      return NextResponse.json(
        {
          message:"Note id required"
        },
        {
          status:400
        }
      );

    }



    if(
      !["ONE_TIME","TIME"].includes(shareType)
    ){

      return NextResponse.json(
        {
          message:"Invalid share type"
        },
        {
          status:400
        }
      );

    }



    if(
      !["PUBLIC","PASSWORD"].includes(accessType)
    ){

      return NextResponse.json(
        {
          message:"Invalid access type"
        },
        {
          status:400
        }
      );

    }




    const note =
    await prisma.note.findFirst({

      where:{
        id:noteId,
        userId
      }

    });



    if(!note){

      return NextResponse.json(
        {
          message:"Note not found"
        },
        {
          status:404
        }
      );

    }




    let expiryDate = null;



    if(shareType==="TIME"){


      if(!expiresAt){

        return NextResponse.json(
          {
            message:"Expiry date required"
          },
          {
            status:400
          }
        );

      }



      expiryDate =
      new Date(expiresAt);



      if(expiryDate <= new Date()){

        return NextResponse.json(
          {
            message:"Expiry must be future date"
          },
          {
            status:400
          }
        );

      }

    }





    let hashedPassword = null;



    if(accessType==="PASSWORD"){


      if(!password){

        return NextResponse.json(
          {
            message:"Password required"
          },
          {
            status:400
          }
        );

      }



      hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    }





    const token =
    crypto
    .randomBytes(32)
    .toString("hex");





    const share =
    await prisma.shareLink.create({

      data:{

        token,

        noteId,

        shareType,

        accessType,

        password:
        hashedPassword,

        expiresAt:
        expiryDate

      }

    });





    return NextResponse.json(

      {

        success:true,

        shareLink:
        `/share/${token}`

      },

      {
        status:201
      }

    );



  }
  catch(error){

    console.log(error);


    return NextResponse.json(
      {
        message:"Server error"
      },
      {
        status:500
      }
    );

  }

}