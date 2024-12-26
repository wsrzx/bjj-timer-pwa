import Timer from '@/components/timer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
      <h1 className="mb-8 text-4xl font-bold text-white">Web Timer</h1>
      <Timer />
    </main>
  )
}

