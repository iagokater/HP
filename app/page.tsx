"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ProductCard from "@/components/product-card"
import TotalSummary from "@/components/total-summary"
import type { Product } from "@/types/product"
import { getProducts } from "@/lib/product-service"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Map<string, number>>(new Map())
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load products on component mount
    const loadedProducts = getProducts()
    setProducts(loadedProducts)
  }, [])

  const handleQuantityChange = (productId: string, change: number) => {
    setSelectedProducts((prev) => {
      const newMap = new Map(prev)
      const currentQuantity = prev.get(productId) || 0
      const newQuantity = Math.max(0, currentQuantity + change)

      if (newQuantity === 0) {
        newMap.delete(productId)
      } else {
        newMap.set(productId, newQuantity)
      }

      return newMap
    })
  }

  const calculateTotal = () => {
    let total = 0
    selectedProducts.forEach((quantity, productId) => {
      const product = products.find((p) => p.id === productId)
      if (product) {
        total += product.price * quantity
      }
    })
    return total
  }

  const getSelectedProductsDetails = () => {
    return Array.from(selectedProducts.entries()).map(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId)
      return {
        ...product,
        quantity,
      }
    })
  }

  const handleAdminLogin = () => {
    router.push("/admin/login")
  }

  return (
    <main className="flex min-h-screen flex-col items-center max-w-md mx-auto p-4 pb-32 relative">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orçamento</h1>
        <button onClick={handleAdminLogin} className="text-sm text-gray-500 hover:text-gray-700">
          Admin
        </button>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={selectedProducts.get(product.id) || 0}
            onQuantityChange={(change) => handleQuantityChange(product.id, change)}
          />
        ))}
      </div>

      <TotalSummary
        total={calculateTotal()}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        selectedProducts={getSelectedProductsDetails()}
      />
    </main>
  )
}
