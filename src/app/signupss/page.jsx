import React from 'react'
import Signup from '../../Components/Signup'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '../../lib/auth'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';

const page = async () => {
    const session = await getServerSession(authOptions);
    console.log(session);  
  return (
   
    <div>
        <Signup session={session}/>
    </div>
  )
}

export default page