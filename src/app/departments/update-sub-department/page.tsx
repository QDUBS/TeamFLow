"use client";

import { AppRoutes } from "@/app/constants/app_routes";
import {
  ISubDepartment,
  IUpdateSubDepartment,
} from "@/app/interfaces/IDepartment";
import api from "@/app/lib/axios";
import { updateSubDepartmentSchema } from "@/app/yup/schemas/updateDepartmentSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddDepartment() {
  const [allSubDepartments, setSubDepartments] = useState<ISubDepartment[]>([]);
  const [departmentId, setDepartmentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(updateSubDepartmentSchema),
  });

  const router = useRouter();
  const params = useParams();

  const onSubmit = async (data: IUpdateSubDepartment) => {
    try {
      const departmentData = {
        name: data.name,
        department: data.department,
      };

      await api.put(`/update-department/${departmentId}`, departmentData);
      router.push("/home");
    } catch (error) {
      alert("Failed to add/update department");
      console.error(error);
    }
  };

  // Fetch existing department data for updating
  const fetchDepartmentData = async (id: string) => {
    try {
      const response = await api.get(`/department/${id}`);
      const departmentData = response.data;
      setDepartmentId(departmentData.id);
      setSubDepartments(departmentData.subDepartments || []);
    } catch (error) {
      alert("Failed to fetch department data");
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchDepartmentData(params.id as string);
    }
  }, [params.id]);

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
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
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
                </div>
              </form>

              {/* Action buttons */}
              <div className="flex flex-row gap-4 mt-5">
                <button
                  onClick={() => router.back()}
                  className="secondary-button w-1/3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-button w-2/3"
                  onClick={handleSubmit(onSubmit)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
