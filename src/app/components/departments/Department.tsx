import { DepartmentProps } from "@/app/interfaces/IDepartment";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { PiListNumbersFill } from "react-icons/pi";

const DepartmentCard = ({
  name,
  departmentId,
  onEdit,
  onDelete,
}: DepartmentProps) => {
  const [showSmallModal, setShowSmallModal] = useState(false);

  return (
    <div className=" w-5/12 bg-white p-4 mr-10 rounded-md beneficiary-card relative">
      <div className="relative">
        <div className="flex flex-row items-center">
          <div className="beneficiary-image bg-blue-700 rounded-full flex flex-col justify-center items-center text-white font-bold text-2xl">
            {name?.charAt(0)}
          </div>
          <p className="text-purplestrong font-normal text-xl ml-4">{name}</p>
        </div>

        <div className="flex flex-row items-center justify-between pl-6 mt-3">
          <div className="flex flex-row items-center">
            <PiListNumbersFill color="#000000" size={18} />
            <p className="text-black font-semibold text-md ml-2">
              {departmentId}
            </p>
          </div>

          <div className="w-1/2 flex flex-col relative">
            {showSmallModal && (
              <div className="w-full bg-gray rounded-md absolute bottom-7 overview-card">
                <div
                  onClick={onDelete}
                  className="w-full text-dark-grey font-semibold text-sm text-center cursor-pointer p-3 border-b-gray"
                >
                  Delete
                </div>
                <div
                  onClick={onEdit}
                  className="w-full text-dark-grey font-semibold text-sm text-center cursor-pointer p-3"
                >
                  Edit
                </div>
              </div>
            )}
            <p
              onClick={() => setShowSmallModal(!showSmallModal)}
              className="relative self-end cursor-pointer"
            >
              <BiDotsVerticalRounded color="#000000" size={22} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
