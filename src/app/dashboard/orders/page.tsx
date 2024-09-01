'use client';

import Title from "@/components/ui/Title";
import Spinner from "@/components/ui/loader/loader";
import { useFetchOrders } from "./useFetchOrders";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Page() { // Renamed to 'Page' with an uppercase 'P'
  const { data, isLoading } = useFetchOrders();

  return (
    <div>
      <Title>Order Listing</Title>
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
