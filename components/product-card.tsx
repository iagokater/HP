"use client"

import Image from "next/image"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { Minus, Plus, Trash2 } from "lucide-react"

interface ProductCardProps {
  product: Product
  quantity: number
  onQuantityChange: (change: number) => void
}

export default function ProductCard({ product, quantity, onQuantityChange }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm w-full bg-white p-3">
      <div className="flex min-h-[100px] gap-4">
        <div className="relative h-[100px] w-[100px] flex-shrink-0 rounded-md overflow-hidden">
          <Image src={product.imageUrl || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
        <div className="flex-grow flex flex-col justify-between py-1">
          <div>
            <h3 className="font-medium text-sm truncate">{product.name}</h3>
            <p className="text-lg font-bold mt-1">{formatCurrency(product.price)}</p>
          </div>

          <div className="flex items-center justify-between w-full gap-2 mt-2">
            {quantity > 0 ? (
              <>
                <div className="flex items-center border rounded-md overflow-hidden h-8">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onQuantityChange(-1)}
                    className="h-8 w-8 rounded-none p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="font-medium px-2 min-w-[30px] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onQuantityChange(1)}
                    className="h-8 w-8 rounded-none p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => onQuantityChange(1)} className="h-8 px-2">
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            )}

            <div className="flex gap-1">
              {quantity > 0 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onQuantityChange(-quantity)}
                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => onQuantityChange(5)} className="h-8 px-2 text-xs">
                +5
              </Button>
              <Button variant="outline" size="sm" onClick={() => onQuantityChange(10)} className="h-8 px-2 text-xs">
                +10
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
