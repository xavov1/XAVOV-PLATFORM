'use client'

let CART:any[] = []

export function addToCart(product:any){
  CART.push(product)
}

export function getCart(){
  return CART
}