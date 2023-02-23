import { getSession, useSession } from "next-auth/react";

import React from "react";

const List = (props) => {
  // const session = useSession();
  console.log(props);
  return <div>List</div>;
};

List.auth = true;

export default List;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};
