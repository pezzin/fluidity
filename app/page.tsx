'use client'

import { useState } from 'react'
import Head from 'next/head'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { KNOWLEDGE_BASE } from "@/data/knowledge"
import Image from "next/image"

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
    const primary = ranked[0]?.matchScore > 1 || (ranked[0]?.matchScore === 1 && ranked[1]?.matchScore === 0)
      ? [ranked[0]]
      : []
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
    <>
      <Head>
        <title>Nextor University</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-3xl w-full text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Image src="/nextor-logo.png" alt="Nextor University" width={40} height={40} />
            <h1 className="text-4xl font-bold tracking-tight">Nextor University</h1>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            Dove le idee diventano realtà
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Crea la tua interfaccia universitaria semplicemente scrivendo ciò che ti serve ✨
          </p>

          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 flex flex-col items-center">
            <Input
              placeholder="Es. Voglio sapere tutto su psicologia"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full max-w-2xl mb-4 text-black"
            />
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? '🎓 Sto cercando le info per te...' : 'Crea la mia interfaccia'}
            </Button>

            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {['Info su Erasmus', 'Esiste una mensa?', 'Come faccio a iscrivermi', 'Orario segreteria'].map((tag, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(tag)}
                  className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm hover:bg-zinc-700"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-4xl w-full">
          {primaryBlocks.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-red-400 mb-4">📌 Risposta principale</h2>
              {primaryBlocks.map((block, i) => (
                <Card key={i} className="border-red-400 border-2 shadow-md bg-zinc-800">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-3 text-white">{block.title}</h3>
                    <p className="text-gray-300">{block.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {secondaryBlocks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-400 mb-2">🔎 Altre informazioni utili</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {secondaryBlocks.map((block, i) => (
                  <Card key={i} className="bg-zinc-900 border border-zinc-700">
                    <CardContent className="p-4">
                      <h4 className="text-lg font-bold mb-2 text-white">{block.title}</h4>
                      <p className="text-sm text-gray-300">{block.content}</p>
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
    </>
  )
}
