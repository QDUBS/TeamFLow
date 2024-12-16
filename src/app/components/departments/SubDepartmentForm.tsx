import { MdCancel } from "react-icons/md";

type Props = {
  name: string;
  department: string;
  removeSubDepartment: () => void;
};

const SubDepartment = ({ name, department, removeSubDepartment }: Props) => {
  return (
    <div className="flex flex-row items-center bg-[#F3F3F3] px-2 py-3">
      <p
        className="text-md font-medium w-1/3 text-inactive/80"
        id="subtitle-name"
      >
        {name}
      </p>
      <p className="text-md text-center font-medium w-1/3 text-inactive/80">
        {department}
      </p>
      <p onClick={removeSubDepartment}>
        <MdCancel color="#666" size={20} className="cursor-pointer" />
      </p>
    </div>
  );
};

export default SubDepartment;
