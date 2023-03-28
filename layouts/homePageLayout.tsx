import ProductList from 'components/ProductList'
import Hero from 'components/Hero'

type HomePageLayoutProps = {
  products: any[]
}

const HomePageLayout = ({products}: HomePageLayoutProps) => (
  <>
    <Hero
      image="/assets/hero.png"
      title="Happy Valentines Day!"
      description="Celebrate Valentine's Day with our special Valentine's Day kits"
    ></Hero>
    <ProductList products={products} onTheHomepage />
  </>
)

export default HomePageLayout
