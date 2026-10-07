import HomepageProducts from '@/features/landingPage/components/HomepageProducts';

const ProductsPage = () => {
  return (
    <main>
      <HomepageProducts
        showCategoryGrid={true}
        category=""
        debouncedSearch=""
      />
    </main>
  );
};

export default ProductsPage;
