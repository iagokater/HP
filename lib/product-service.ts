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

// Storage keys
const PRODUCTS_STORAGE_KEY = "global_products_data"
const SELECTED_PRODUCTS_KEY = "user_selected_products"

// Get products from localStorage or use initial products
export const getProducts = (): Product[] => {
  if (typeof window === "undefined") return initialProducts

  const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY)
  if (!storedProducts) {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(initialProducts))
    return initialProducts
  }

  return JSON.parse(storedProducts)
}

// Save products to localStorage
export const saveProducts = (products: Product[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products))
}

// Save selected products to localStorage
export const saveSelectedProducts = (selectedProducts: Map<string, number>): void => {
  if (typeof window === "undefined") return

  // Convert Map to array for storage
  const selectedProductsArray = Array.from(selectedProducts.entries())
  localStorage.setItem(SELECTED_PRODUCTS_KEY, JSON.stringify(selectedProductsArray))
}

// Get selected products from localStorage
export const getSelectedProducts = (): Map<string, number> => {
  if (typeof window === "undefined") return new Map()

  const storedSelectedProducts = localStorage.getItem(SELECTED_PRODUCTS_KEY)
  if (!storedSelectedProducts) {
    return new Map()
  }

  // Convert stored array back to Map
  const selectedProductsArray = JSON.parse(storedSelectedProducts)
  return new Map(selectedProductsArray)
}
