"use client"

import { ChevronUp } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/product"

interface TotalSummaryProps {
  total: number
  isExpanded: boolean
  onToggle: () => void
  selectedProducts: (Product & { quantity: number })[]
}

export default function TotalSummary({ total, isExpanded, onToggle, selectedProducts }: TotalSummaryProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto">
      <div
        className={cn(
          "bg-white border-t border-x rounded-t-lg shadow-lg transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-96 overflow-y-auto" : "max-h-16",
        )}
      >
        <button onClick={onToggle} className="w-full p-4 flex justify-between items-center">
          <span className="font-bold text-lg">Total:</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{formatCurrency(total)}</span>
            <ChevronUp className={cn("h-5 w-5 transition-transform", isExpanded ? "transform rotate-180" : "")} />
          </div>
        </button>

        {isExpanded && (
          <div className="px-4 pb-4">
            <h3 className="font-medium mb-2">Itens selecionados:</h3>
            {selectedProducts.length > 0 ? (
              <ul className="space-y-2">
                {selectedProducts.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Nenhum item selecionado</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
