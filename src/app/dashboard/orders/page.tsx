import React from 'react';
import { useSelector } from 'react-redux';
import Accordian from './Accordian';
import Spinner from '@/components/ui/loader/loader';

function Orders() {
  const { orders, isLoading } = useSelector(state => state.orders)

  return (
    <div className="text-white p-4">
      <h1>{orders.length} Orders have been placed</h1>
      {
        isLoading ? <Spinner />
          : orders.length > 0 ?
            orders.map((order) => (
              <Accordian key={order?.id || order.items[0].id} order={order} />
            ))
            : <h1>No orders yet</h1>
      }
    </div>
  );
}

export default Orders;
