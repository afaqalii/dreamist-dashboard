'use client';

import ProductCard from '@/components/ProductCard';
import Spinner from '@/components/ui/loader/loader';
import Title from '@/components/ui/Title';
import { useFirebaseData } from '@/hooks/useFirebaseData'
import React, { useEffect } from 'react'

const page = () => {
  const { data, isLoading } = useFirebaseData("/products")
  return (
    <div>
      <Title>
        Products Listing
      </Title>
      {
        isLoading ?
          <Spinner />
          :
          <>
            {data?.map((card) => (
              <ProductCard item={card} />
            ))}
          </>
      }
    </div>
  )
}

export default page