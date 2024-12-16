"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import { fetchDepartments } from "./api/departments";
import DepartmentCard from "./components/departments/Department";
import { AppRoutes } from "./constants/app_routes";
import { IDepartmentCard } from "./interfaces/IDepartment";

const itemsPerPage = 4;

export default function Home() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const {
    data: departments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["departments", page],
    queryFn: () => fetchDepartments(page),
  });

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      router.push(AppRoutes.Login);
    } else {
      setLoading(false);
    }
  }, []);

  const deleteDepartment = async (id: number) => {};

  const goToPage = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(departments?.length! / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = departments?.slice(startIndex, endIndex);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading departments</div>;

  return (
    <section className="h-full flex flex-col justify-between">
      <section>
        <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80">
          <p className="pt-0 font-normal text-2xl lg:text-2xl">Departments</p>
          <button
            className="w-fit bg-green px-4 py-2 rounded-md flex flex-row items-center justify-center ml-2 border-dark-gray"
            onClick={() => router.push(AppRoutes.NewDepartment)}
          >
            <p className="text-white font-normal text-md">Add Department</p>
          </button>
        </div>

        {/* Departments List */}
        <div className="w-full flex flex-row flex-wrap justify-center pt-20 mx-auto">
          {currentItems?.length! > 0 ? (
            currentItems?.map((department: IDepartmentCard) => (
              <DepartmentCard
                key={department.id}
                name={department.name}
                departmentId={department.id!}
                onEdit={() =>
                  router.push(`/departments/update-department/${department.id}`)
                }
                onDelete={() => deleteDepartment(department.id!)}
              />
            ))
          ) : (
            <div className="w-full flex flex-col items-center ">
              <div className="w-8/12 flex flex-col items-center px-10 pt-10 mt-5 pb-20 rounded-md overview-card">
                <Image
                  src="/images/empty-department.svg"
                  alt=""
                  width={120}
                  height={120}
                  className="mb-5"
                />
                <p className="text-black font-semibold text-xl mb-5">
                  You have no departments
                </p>
                <p className="text-black font-normal text-md">
                  Create a new department using the button above.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      <div className="flex flex-row justify-between w-full bg-grey-100 fixed bottom-0 z-10 bg-gray-100">
        <div></div>
        <div className="flex flex-row justify-end items-center px-10 py-8 ">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-fit bg-white px-4 py-2 rounded-md flex flex-row items-center justify-center ml-2 border-dark-gray next-prev-btn cursor-pointer"
          >
            <BiSolidChevronLeft color="#666666" size={20} />
            <p className="text-dark-grey font-normal text-md ml-2">Previous</p>
          </button>

          <button className="w-fit bg-green px-4 py-2 rounded-md flex flex-row items-center justify-center ml-2 border-dark-gray">
            <p className="text-white font-normal text-md">{currentPage}</p>
          </button>
          <div className="text-dark-grey font-normal text-md flex flex-row items-start justify-center mx-2">
            of
          </div>
          <button className="w-fit bg-white px-4 py-2 rounded-md flex flex-row items-center justify-center border-dark-gray">
            <p className="text-purplestrong font-normal text-md">
              {totalPages}
            </p>
          </button>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-fit bg-white px-4 py-2 rounded-md flex flex-row items-center justify-center ml-2 border-dark-gray next-prev-btn"
          >
            <p className="text-dark-grey font-normal text-md">Next</p>
            <BiSolidChevronRight color="#666666" size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
