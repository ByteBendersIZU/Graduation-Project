import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { fetchBranchList } from "../../redux/services/CompanyBranchService";

const RemoveBranch = ({ id }) => {
  const dispatch = useDispatch();
  const {
    data: {
      session: {
        user: { jwt },
      },
    },
  } = useSession();
  const [show, setShow] = useState(false);

  const handleDelete = async () => {
    const data = await axios({
      method: "delete",
      url: `http://${process.env.NEXT_PUBLIC_IP_ADRESS}/v1/branch/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).catch(function (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    });
    console.log(data);
    if (data.data.code) {
      toast.success(data.data.message);
      dispatch(fetchBranchList());
    }
    setShow(false);
  };

  return (
    <React.Fragment>
      <div
        className="cursor-pointer text-red-600"
        onClick={() => setShow(true)}
      >
        <MdDeleteOutline />
      </div>
      <Modal show={show} size="md" popup={true} onClose={() => setShow(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this branch?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  handleDelete();
                }}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShow(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RemoveBranch;
