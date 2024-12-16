"use client";

import { AppRoutes } from "@/app/constants/app_routes";
import { IDepartment, ISubDepartment } from "@/app/interfaces/IDepartment";
import api from "@/app/lib/axios";
import { createSubDepartmentSchema } from "@/app/yup/schemas/createDepartmentSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddSubDepartment() {
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [subDepartmentDepartment, setSubDepartmentDepartment] = useState("");
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(createSubDepartmentSchema),
  });
  const router = useRouter();

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/departments");
      setDepartments(response.data);
    } catch (error) {
      alert("Failed to load departments");
    console.error(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const onSubmit = async (data: ISubDepartment) => {
    try {
      const departmentData = {
        name: data.name,
        department: data.department,
      };

      await api.post("/create-sub-department", departmentData);
      router.push("/home");
    } catch (error) {
      alert("Failed to add sub department");
    console.error(error);
    }
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
                  New Sub Department
                </h2>
              </div>

              {/* Form to add new sub department */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <div className="flex flex-col gap-5 mt-5">
                  <div>
                    <label>Name</label>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder=""
                      className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label>Department</label>
                    <select
                      {...register("department")} // Bind form value
                      className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                      value={subDepartmentDepartment}
                      onChange={(e) =>
                        setSubDepartmentDepartment(e.target.value)
                      }
                    >
                      <option value="">Select a Department</option>
                      {departments.map((department: any) => (
                        <option key={department.id} value={department.name}>
                          {department.name}
                        </option>
                      ))}
                    </select>
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
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
