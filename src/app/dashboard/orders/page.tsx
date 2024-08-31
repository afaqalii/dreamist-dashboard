'use client';

import React, { useEffect } from 'react';
import Accordian from './Accordian';
import Spinner from '@/components/ui/loader/loader';
import { useFetchOrders } from './useFetchOrders';
import { order } from '@/lib/interfaces';

function Orders() {
  const { data: orders = [], isLoading, isError } = useFetchOrders();
  useEffect(() => {
    if (orders)
      console.log("data", orders)
  }, [orders])

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>There was an error fetching the orders.</h1>;
  }

  return (
    <div className="text-white p-4">
      <h1>{orders.length} Orders have been placed</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <></>
          // <Accordian key={order.id} order={order} />
        ))
      ) : (
        <h1>No orders yet</h1>
      )}
    </div>
  );
}

export default Orders;
