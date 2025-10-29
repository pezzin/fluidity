import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const blocks = [
    {
      title: 'Risposta al prompt',
      content: `Hai chiesto: "${prompt}". Ecco le informazioni rilevanti.`
    },
    {
      title: 'Prossimi passi',
      content: 'Naviga le sezioni suggerite o fai un’altra domanda.'
    },
    {
      title: 'Supporto',
      content: 'Se hai bisogno di aiuto, puoi contattare l’assistenza studenti.'
    }
  ]

  return NextResponse.json({ blocks })
}
