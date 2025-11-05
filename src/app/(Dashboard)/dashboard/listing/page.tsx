'use client';

import Title from "@/components/ui/Title";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useFetchProducts } from "./useFetchProducts";
import Spinner from "@/components/ui/loader/loader";

export default function Page() { // Renamed to 'Page' with an uppercase 'P'
  const { data, isLoading } = useFetchProducts();

  return (
    <div>
      <Title>Product Listing</Title>
      {
        isLoading ?
          <div className="grid place-items-center min-h-[400px]">
            <Spinner />
          </div>
          :
          <DataTable columns={columns} data={data ?? []} />
      }
    </div>
  );
}
