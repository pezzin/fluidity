'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const KNOWLEDGE_BASE = [
  {
    id: 'psicologia',
    tags: ['psicologia', 'corso', 'laurea', 'triennale'],
    title: 'Corso di Laurea in Psicologia',
    content: 'Il corso di laurea in Psicologia ha una durata triennale e offre una solida base teorica e pratica nei principali ambiti della psicologia.'
  },
  {
    id: 'economia',
    tags: ['economia', 'facoltà', 'corso', 'aziendale'],
    title: 'Facoltà di Economia e Management',
    content: 'Il corso prepara esperti in analisi economica e gestione aziendale, con sbocchi nel settore pubblico e privato.'
  },
  {
    id: 'segreteria',
    tags: ['segreteria', 'orari', 'studenti', 'contatti'],
    title: 'Segreteria Studenti',
    content: 'La segreteria è aperta dal lunedì al venerdì dalle 9 alle 13. Email: segreteria@universita.it'
  },
  {
    id: 'immatricolazione',
    tags: ['immatricolazione', 'iscrizione', 'documenti'],
    title: 'Come immatricolarsi',
    content: 'Per immatricolarsi è necessario registrarsi online, compilare il modulo e allegare i documenti richiesti.'
  },
  {
    id: 'biblioteca',
    tags: ['biblioteca', 'libri', 'orari', 'prestito'],
    title: 'Biblioteca Universitaria',
    content: 'La biblioteca offre servizi di consultazione e prestito dal lunedì al sabato. Accesso tramite badge universitario.'
  },
  {
    id: 'mensa',
    tags: ['mensa', 'pranzo', 'studenti', 'cibo'],
    title: 'Servizio Mensa',
    content: 'Il servizio mensa è disponibile in diverse sedi. È possibile pagare con la tessera studenti o app universitaria.'
  },
  {
    id: 'erasmus',
    tags: ['erasmus', 'scambi', 'estero', 'mobilità'],
    title: 'Programma Erasmus',
    content: 'Il programma Erasmus consente agli studenti di studiare all’estero per un semestre o un anno in università partner.'
  },
  {
    id: 'tasse',
    tags: ['tasse', 'pagamento', 'contributi'],
    title: 'Tasse Universitarie',
    content: 'Le tasse universitarie variano in base al reddito e si pagano in tre rate. Info su tasse.universita.it'
  },
  {
    id: 'orientamento',
    tags: ['orientamento', 'open day', 'scelta', 'guida'],
    title: 'Servizio Orientamento',
    content: 'Aiuta gli studenti a scegliere il corso più adatto, tramite colloqui e attività di orientamento.'
  }
]

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

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Cosa stai cercando?</h1>
        <Input
          placeholder="Scrivi ad esempio: 'Voglio sapere tutto sul corso di Psicologia'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? '🎓 Sto cercando le info per te...' : 'Genera contenuto'}
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
