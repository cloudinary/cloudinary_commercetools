type ProductTagsProps = {
  tags: string[]
}

const ProductTags = ({tags}: ProductTagsProps) => {
  if (!tags || tags.length === 0) {
    return null
  }

  return (
    <div className="mt-2 flex gap-2">
      {tags.map(x => (
        <span
          key={x}
          className="rounded-2xl border border-[#89B592] bg-white/40 px-2 py-1 text-base"
        >
          {x}
        </span>
      ))}
    </div>
  )
}

export default ProductTags
