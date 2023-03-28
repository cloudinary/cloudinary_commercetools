import {getName} from 'lib/commercetools/productHelper'
import Link from 'next/link'

type BreadcrumbProps = {
  product: any
  locale: string | undefined
}

const Breadcrumb = ({product, locale}: BreadcrumbProps) => (
  <>
    <Link href="/products">
      <svg
        width="49"
        height="24"
        viewBox="0 0 49 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.93934 10.9393ZM47 13.5C47.8284 13.5 48.5 12.8284 48.5 12C48.5 11.1716 47.8284 10.5 47 10.5V13.5ZM2 13.5H47V10.5H2V13.5Z"
          className="fill-black hover:fill-[#B0DDC2]"
        />
      </svg>
    </Link>
    <div className="my-6 flex gap-6">
      <Link href="/products" className="text-[#929793]">
        Shop
      </Link>
      <span className="text-[#929793]">/</span>
      {getName(product, locale)}
    </div>
  </>
)

export default Breadcrumb
