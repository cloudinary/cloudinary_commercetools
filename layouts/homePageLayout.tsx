import ProductList from 'components/ProductList'
import Hero from 'components/Hero'

type HomePageLayoutProps = {
  products: any[]
}

const HomePageLayout = ({products}: HomePageLayoutProps) => (
  <>
    <Hero
      public_id="ecommsamples/hero"
      title="Happy Valentines Day!"
      description="Celebrate Valentine's Day with our special Valentine's Day kits"
      width={2048} // No curly braces needed for numerical value
    />
    <ProductList products={products} onTheHomepage />
  </>
)

export default HomePageLayout
