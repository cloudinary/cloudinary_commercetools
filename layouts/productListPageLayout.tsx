import ProductList from 'components/ProductList'

type ProductListPageProps = {
  products: any[]
}

const ProductListPageLayout = ({products}: ProductListPageProps) => (
  <>
    <ProductList products={products} onOverview />
  </>
)

export default ProductListPageLayout
