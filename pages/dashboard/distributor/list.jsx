import { useSession } from "next-auth/react";
import React from "react";

const List = () => {
  const session = useSession();
  console.log("session", session);

  return <div>List</div>;
};

export default List;

List.auth = true;
