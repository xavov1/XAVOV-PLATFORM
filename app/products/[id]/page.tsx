import ProductViewer from "@/app/components/ProductViewer"

const PRODUCTS:any = {
  ww90:{
    name:"غسالة سامسونج AddWash",
    en:"Samsung AddWash Washer",
    price:2199
  },

  lg100:{
    name:"غسالة LG",
    en:"LG Washer",
    price:1999
  }
}

export default async function Page({params}:any){

  const { id } = await params

  const product = PRODUCTS[id]

  if(!product){
    return <div style={{padding:40}}>المنتج غير موجود</div>
  }

  return (

    <div style={{padding:40}}>

      <h1>{product.name}</h1>

      <h2>{product.en}</h2>

      <p>السعر: {product.price} ريال</p>

      <ProductViewer product={product}/>

    </div>

  )

}