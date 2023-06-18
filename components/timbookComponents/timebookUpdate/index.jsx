// import axios from "axios";

// import React, { useEffect, useState } from "react";
// import { getSession, useSession } from "next-auth/react";
// import TimebookSubmit from "../timebookSubmit";

// const TimebookUpdate = ({ userId, date, dateValue }) => {
//   const intDateValue = Number(dateValue)
//   const [value, setValue] = useState(intDateValue);

//   return (
//     <div className="mx-4">
//       <div className="flex divide-gray-400 justify-center items-center">
//         <div>
//           <button
//             type="button"
//             className=""
//             onClick={() =>  {
//               if (value > 0) {
//                 setValue(value - 1);
//               }
//             }}
//           >
//             -
//           </button>
//         </div>
//         <div className="mx-4">
//           <p className="text-sm">{value}</p>
//         </div>
//         <div>
//           <button type="button" onClick={() => setValue(value + 1)}>
//             +
//           </button>
//         </div>
//       </div>
//       <TimebookSubmit
//         userId={userId}
//         dateValue={value}
//         setValue={setValue}
//         date={date}
//       />
//     </div>
//   );
// };

// export default TimebookUpdate;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import TimebookSubmit from "../timebookSubmit";

const TimebookUpdate = ({ userId, date, dateValue }) => {
  const intDateValue = Number(dateValue);
  const [value, setValue] = useState(intDateValue);

  return (
    <div className="mr-12">
      <div className="flex divide-gray-400 justify-center items-center">
        <button
          type="button"
          className="font-bold text-l"
          onClick={() => {
            if (value > 0) {
              setValue(value - 1);
            }
          }}
        >
          -
        </button>
        <div className="mx-4">
          <p className="text-xl font-bold">{value}</p>
        </div>
        <button
          type="button"
          className="font-bold text-l"
          onClick={() => setValue(value + 1)}
        >
          +
        </button>
      </div>
      <div className="flex justify-center">
        <TimebookSubmit
          userId={userId}
          dateValue={value}
          setValue={setValue}
          date={date}
        />
      </div>
    </div>
  );
};

export default TimebookUpdate;
