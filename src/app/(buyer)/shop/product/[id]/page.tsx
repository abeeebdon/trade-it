'use client';
import ProductDetailsPage from '@/features/shops/pages/ProductDetailsPage';
import { useParams } from 'next/navigation';

const PRoductDetails = () => {
  const { id } = useParams();
  console.log('Product ID:', id);
  return <ProductDetailsPage id={id as string} />;
};

export default PRoductDetails;
