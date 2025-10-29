'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const res = await fetch("/api/generate-blocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    })

    const data = await res.json()
    setBlocks(data.blocks)
    setLoading(false)
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Cosa stai cercando?</h1>
        <Input
          placeholder="Scrivi ad esempio: 'Voglio sapere tutto sul corso di Ingegneria'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Caricamento...' : 'Genera contenuto'}
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
      </div>
    </div>
  )
}
