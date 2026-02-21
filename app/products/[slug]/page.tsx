type Product = {
  slug: string
  name: string
  price: number
  availability: string
}

const products: Product[] = [
  {
    slug: "gaming-pc",
    name: "Gaming PC",
    price: 4999,
    availability: "متوفر",
  },
  {
    slug: "xbox-series-x",
    name: "Xbox Series X",
    price: 1899,
    availability: "متوفر",
  },
  {
    slug: "playstation-5",
    name: "PlayStation 5",
    price: 1999,
    availability: "متوفر",
  },
]

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return (
      <div style={{ padding: "80px", textAlign: "center" }}>
        <h2>المنتج غير موجود</h2>
      </div>
    )
  }

  return (
    <div style={{ padding: "80px", color: "#fff" }}>
      <h1 style={{ marginBottom: "20px" }}>{product.name}</h1>

      <p style={{ marginBottom: "10px" }}>
        السعر: SAR {product.price}
      </p>

      <p style={{ marginBottom: "30px" }}>
        الحالة: {product.availability}
      </p>

      <button
        style={{
          padding: "14px 30px",
          border: "1px solid #cfa55b",
          background: "transparent",
          color: "#cfa55b",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        إضافة للسلة
      </button>
    </div>
  )
}
