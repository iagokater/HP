import type { Product } from "@/types/product"

// Initial sample products
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone XYZ",
    price: 1299.99,
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Notebook Ultra",
    price: 3499.99,
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Fone de Ouvido Bluetooth",
    price: 199.99,
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    name: "Smart TV 4K",
    price: 2599.99,
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
]

// Get products from localStorage or use initial products
export const getProducts = (): Product[] => {
  if (typeof window === "undefined") return initialProducts

  const storedProducts = localStorage.getItem("products")
  if (!storedProducts) {
    localStorage.setItem("products", JSON.stringify(initialProducts))
    return initialProducts
  }

  return JSON.parse(storedProducts)
}

// Save products to localStorage
export const saveProducts = (products: Product[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("products", JSON.stringify(products))
}
