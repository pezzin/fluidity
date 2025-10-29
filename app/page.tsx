'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { KNOWLEDGE_BASE } from "@/data/knowledge"

type Block = {
  title: string
  content: string
}

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)

    const words = prompt.toLowerCase().split(/\s+/)
    const results = KNOWLEDGE_BASE.filter(block =>
      block.tags.some(tag => words.includes(tag))
    )

    setBlocks(results)
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Cosa stai cercando?</h1>
        <Input
          placeholder="Scrivi ad esempio: 'Voglio sapere tutto sul corso di Psicologia'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="mb-4"
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? '🎓 Sto cercando le info per te...' : 'Crea la mia interfaccia'}
        </Button>
      </div>

      <div className="mt-12 grid gap-4 max-w-3xl mx-auto">
        {blocks.map((block, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{block.title}</h2>
              <p>{block.content}</p>
            </CardContent>
          </Card>
        ))}
        {blocks.length === 0 && !loading && (
          <p className="text-center text-gray-500">Nessuna informazione trovata per il prompt inserito.</p>
        )}
      </div>
    </div>
  )
}
