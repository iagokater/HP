"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Pencil, Trash, Plus } from "lucide-react"
import type { Product } from "@/types/product"
import { getProducts, saveProducts } from "@/lib/product-service"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load products on component mount
    const loadedProducts = getProducts()
    setProducts(loadedProducts)
  }, [])

  const handleSave = () => {
    saveProducts(products)
  }

  const handleAddProduct = () => {
    setIsAdding(true)
    setEditingProduct({
      id: Date.now().toString(),
      name: "",
      price: 0,
      imageUrl: "/placeholder.svg?height=200&width=200",
    })
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product })
    setIsAdding(false)
  }

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter((p) => p.id !== productId)
    setProducts(updatedProducts)
    saveProducts(updatedProducts)
  }

  const handleSaveProduct = () => {
    if (!editingProduct) return

    if (isAdding) {
      setProducts([...products, editingProduct])
      saveProducts([...products, editingProduct])
    } else {
      const updatedProducts = products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      setProducts(updatedProducts)
      saveProducts(updatedProducts)
    }

    setEditingProduct(null)
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
  }

  return (
    <div className="flex min-h-screen flex-col items-center max-w-md mx-auto p-4">
      <div className="w-full flex justify-between items-center mb-6">
        <button onClick={() => router.push("/")} className="flex items-center text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </button>
        <h1 className="text-2xl font-bold">Gerenciar Produtos</h1>
      </div>

      {editingProduct ? (
        <div className="w-full border rounded-lg p-4 mb-6">
          <h2 className="text-lg font-medium mb-4">{isAdding ? "Adicionar Produto" : "Editar Produto"}</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: Number.parseFloat(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <Input
                id="imageUrl"
                value={editingProduct.imageUrl}
                onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancelar
              </Button>
              <Button onClick={handleSaveProduct}>Salvar</Button>
            </div>
          </div>
        </div>
      ) : (
        <Button onClick={handleAddProduct} className="mb-6 w-full">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Produto
        </Button>
      )}

      <div className="w-full space-y-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="flex">
              <div className="relative h-24 w-24 flex-shrink-0">
                <Image src={product.imageUrl || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="p-3 flex-grow">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-lg font-bold mt-1">{formatCurrency(product.price)}</p>
              </div>
              <div className="flex flex-col p-2 gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
