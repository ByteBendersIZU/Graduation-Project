import {
  Button,
  Checkbox,
  Label,
  Modal,
  Progress,
  TextInput,
} from "flowbite-react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";

import { toast } from "react-toastify";
import React, { useState } from "react";
import FormGroup from "../../form/FormGroup";
import FormButton from "../../form/FormButton";
import * as Yup from "yup";
import TimebookSubmit from "../timebookSubmit";

const timebookUpdate = ({ userId, date }) => {
  const [value, setValue] = useState(0);
  return (
    <div className="mx-4">
      <div className="flex divide-gray-400 justify-center items-center">
        <div>
          <button
            type="button"
            className=""
            onClick={() => setValue(value - 1)}
          >
            -
          </button>
        </div>
        <div className="mx-4">
          <p className="text-sm">{value}</p>
        </div>
        <div>
          <button type="button" onClick={() => setValue(value + 1)}>
            +
          </button>
        </div>
      </div>
      <TimebookSubmit userId={userId} dateValue={value} date={date} />
    </div>
  );
};

export default timebookUpdate;
