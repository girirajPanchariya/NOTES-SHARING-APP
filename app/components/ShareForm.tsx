"use client";

import { useState } from "react";


interface ShareFormProps {

  noteId:string;

  onSuccess?:()=>void;

}



export default function ShareForm({

 noteId,

 onSuccess

}:ShareFormProps){



const [loading,setLoading]=useState(false);


const [shareType,setShareType]=useState<
"ONE_TIME"|"TIME"
>("ONE_TIME");


const [accessType,setAccessType]=useState<
"PUBLIC"|"PASSWORD"
>("PUBLIC");


const [expiresAt,setExpiresAt]=useState("");


const [password,setPassword]=useState("");


const [shareLink,setShareLink]=useState("");





async function generateLink(){


try{


setLoading(true);


setShareLink("");



if(
shareType==="TIME" &&
!expiresAt
){

alert("Select expiry date");

setLoading(false);

return;

}




if(
accessType==="PASSWORD" &&
!password
){

alert("Enter password");

setLoading(false);

return;

}




const res =
await fetch("/api/share",{


method:"POST",


credentials:"include",


headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

noteId,

shareType,

accessType,

expiresAt:
shareType==="TIME"
?
expiresAt
:
null,


password:
accessType==="PASSWORD"
?
password
:
null


})


});





const data =
await res.json();





if(!res.ok){

alert(data.message);

return;

}





setShareLink(
`${window.location.origin}${data.shareLink}`
);



onSuccess?.();



}
catch(error){

console.log(error);

alert("Something went wrong");


}
finally{

setLoading(false);

}


}





async function copyLink(){


await navigator.clipboard.writeText(
shareLink
);


alert("Copied");


}





return (

<div className="border rounded-xl p-6 space-y-5">


<h2 className="text-2xl font-bold">
Share Note
</h2>





<div>

<label>
Share Type
</label>


<select

value={shareType}

onChange={(e)=>
setShareType(
e.target.value as
"ONE_TIME"|"TIME"
)
}

className="border w-full p-3 rounded"

>


<option value="ONE_TIME">
One Time
</option>


<option value="TIME">
Time Based
</option>


</select>


</div>







<div>

<label>
Access Type
</label>


<select

value={accessType}

onChange={(e)=>{

setAccessType(
e.target.value as
"PUBLIC"|"PASSWORD"
);


setPassword("");

}}

className="border w-full p-3 rounded"

>


<option value="PUBLIC">
Public
</option>


<option value="PASSWORD">
Password Protected
</option>


</select>


</div>







{
accessType==="PASSWORD" &&

<input

type="text"

placeholder="Enter Password"

value={password}

onChange={(e)=>
setPassword(e.target.value)
}

className="border w-full p-3 rounded"

/>

}







{
shareType==="TIME" &&

<input

type="datetime-local"

value={expiresAt}

onChange={(e)=>
setExpiresAt(e.target.value)
}

className="border w-full p-3 rounded"

/>

}






<button

onClick={generateLink}

disabled={loading}

className="bg-green-600 text-white w-full py-3 rounded"

>

{
loading
?
"Generating..."
:
"Generate Share Link"
}


</button>






{
shareLink &&

<div className="border p-4 rounded space-y-3">


<input

readOnly

value={shareLink}

className="border w-full p-3 rounded"

/>



<button

onClick={copyLink}

className="bg-blue-600 text-white px-5 py-2 rounded"

>

Copy Link

</button>



{
accessType==="PASSWORD" &&

<p className="text-sm">

Password:
<b>{password}</b>

</p>

}



</div>

}



</div>


);


}