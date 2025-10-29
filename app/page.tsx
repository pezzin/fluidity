'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { KNOWLEDGE_BASE } from "@/data/knowledge"

type Block = {
  title: string
  content: string
  id?: string
  tags?: string[]
}

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [primaryBlocks, setPrimaryBlocks] = useState<Block[]>([])
  const [secondaryBlocks, setSecondaryBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)

    const normalized = prompt
      .toLowerCase()
      .normalize('NFD')
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)

    const matches = KNOWLEDGE_BASE.map((block) => {
      const matchScore = block.tags?.reduce((acc, tag) => {
        return acc + normalized.filter(word => word.includes(tag) || tag.includes(word)).length
      }, 0) || 0

      return { ...block, matchScore }
    })

    const ranked = matches.sort((a, b) => b.matchScore - a.matchScore)
    const primary = ranked[0]?.matchScore > 1 ? [ranked[0]] : []
    const secondary = KNOWLEDGE_BASE.filter(b => !primary.find(p => p.id === b.id))

    setPrimaryBlocks(primary)
    setSecondaryBlocks(secondary)
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
        <h1 className="text-4xl font-bold mb-4">Benvenuto alla Nextor University. Cosa stai cercando?</h1>
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

      <div className="mt-12 max-w-3xl mx-auto">
        {primaryBlocks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">📌 Risposta principale</h2>
            {primaryBlocks.map((block, i) => (
              <Card key={i} className="border-red-400 border-2 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3">{block.title}</h3>
                  <p>{block.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {secondaryBlocks.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-600 mb-2">🔎 Forse ti potrebbe interessare anche...</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {secondaryBlocks.map((block, i) => (
                <Card key={i} className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <h4 className="text-lg font-bold mb-2">{block.title}</h4>
                    <p className="text-sm text-gray-700">{block.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {primaryBlocks.length === 0 && !loading && (
          <p className="text-center text-gray-500">Nessuna informazione trovata per il prompt inserito.</p>
        )}
      </div>
    </div>
  )
}
