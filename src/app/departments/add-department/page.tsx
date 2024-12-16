"use client";

import SubDepartment from "@/app/components/departments/SubDepartmentForm";
import { AppRoutes } from "@/app/constants/app_routes";
// import { createDepartment } from "@/app/graphql/mutations/createDepartment";
import { IDepartment, ISubDepartment } from "@/app/interfaces/IDepartment";
import api from "@/app/lib/axios";
import { createDepartmentSchema } from "@/app/yup/schemas/createDepartmentSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

export default function AddDepartment() {
  const [allSubDepartments, setSubDepartments] = useState<ISubDepartment[]>([]);
  const [subDepartmentName, setSubDepartmentName] = useState("");
  const [subDepartmentDepartment, setSubDepartmentDepartment] = useState("");
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(createDepartmentSchema),
  });
  const router = useRouter();

  // const { mutate, isLoading, error, isSuccess, data } =
  //   useMutation(createDepartment);

  const onSubmit = async (data: IDepartment) => {
    // mutate(data);
  };

  const saveSubDepartment = (e: React.FormEvent) => {
    e.preventDefault();

    const newSubDepartment = {
      name: subDepartmentName,
      department: subDepartmentDepartment,
    };

    setSubDepartments([...allSubDepartments, newSubDepartment]);

    setSubDepartmentName("");
    setSubDepartmentDepartment("");

    setValue("subDepartments", [...allSubDepartments, newSubDepartment]);
  };

  const removeSubDepartment = (name: string) => {
    setSubDepartments(allSubDepartments.filter((dept) => dept.name !== name));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push(AppRoutes.Login);
    } else {
      setLoading(false);
    }
  });

  if (loading) {
  }

  return (
    <>
      <section className="relative">
        <div
          className="relative bg-cover h-screen"
          id="login-background-image"
        ></div>

        {/* Overlay */}
        <div className="w-screen h-screen absolute top-0 left-0 z-10 flex flex-col justify-center items-center backdrop-blur-md bg-black/10 px-6">
          <div className="bg-white px-5 py-8 md:p-10 w-full h-screen md:max-w-[500px] lg:max-w-[550px] overflow-y-auto">
            <div className="mt-5 md:mt-7">
              <div className="flex justify-center">
                <h2 className="text-lg md:text-xl lg:text-3xl">
                  New Department
                </h2>
              </div>

              {/* Sub Departments */}
              <div className="bg-[#F3F3F3] p-1 mt-5 rounded-md">
                {allSubDepartments.length > 0 ? (
                  allSubDepartments.map((department: ISubDepartment) => (
                    <div key={department.name}>
                      <SubDepartment
                        name={department.name}
                        department={department.department!}
                        removeSubDepartment={() =>
                          removeSubDepartment(department.name)
                        }
                      />
                      <div className="border-b-gray"></div>
                    </div>
                  ))
                ) : (
                  <p className=" text-center text-gray-500 py-2">
                    No sub-departments added
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* sName */}
                <div className="flex flex-col gap-5 mt-5">
                  <div>
                    <label>Name</label>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="Department Name"
                      className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                    />
                  </div>

                  {/* Sub Departments */}
                  <h3 className="text-lg md:text-xl lg:text-2xl mt-5">
                    Sub Departments
                  </h3>
                  <div className="flex flex-col gap-5 mt-5">
                    <div>
                      <label>Sub-Department Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Accounting"
                        value={subDepartmentName}
                        onChange={(e) => setSubDepartmentName(e.target.value)}
                        className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                      />
                    </div>

                    <div>
                      <label>Sub-Department Department</label>
                      <input
                        type="text"
                        placeholder="e.g. Finance"
                        value={subDepartmentDepartment}
                        onChange={(e) =>
                          setSubDepartmentDepartment(e.target.value)
                        }
                        className="mt-3 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                      />
                    </div>

                    <button
                      className="primary-button w-full mt-5"
                      onClick={saveSubDepartment}
                    >
                      Save Sub-Department
                    </button>
                  </div>
                </div>
              </form>

              {/* Action buttons */}
              <div className="flex flex-row gap-4 mt-5">
                <button
                  onClick={() => router.back()}
                  className="secondary-button w-1/3"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="primary-button w-2/3"
                  onClick={handleSubmit(onSubmit)}
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
