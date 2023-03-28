import ProductCard from './ProductCard'

export type ProductListProps = {
  products: any[]
  onTheHomepage?: boolean
  onDetailPage?: boolean
  onOverview?: boolean
}

const ProductList = ({
  products,
  onTheHomepage,
  onDetailPage,
  onOverview,
}: ProductListProps) => (
  <div
    className={`${onDetailPage ? 'grid-cols-1 md:grid-cols-4 ' : 'p-[6.25vw]'}`}
  >
    <h2 className="mb-6 text-center text-3xl font-medium">
      {onTheHomepage ? "What's new" : ''}
      {onDetailPage ? 'More like this' : ''}
      {onOverview ? 'Our Products' : ''}
    </h2>
    <div
      className={`grid  gap-[2.5vw] ${
        onTheHomepage
          ? 'grid-cols-1 md:grid-cols-3 '
          : 'grid-cols-1 md:grid-cols-3'
      }`}
    >
      {products &&
        products.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            isSmall={onDetailPage}
          />
        ))}
    </div>
  </div>
)

export default ProductList
