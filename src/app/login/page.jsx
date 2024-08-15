import React from 'react';
import Login from '../../components/Login';
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Login session={session}/>
     
    </>
  );
}
