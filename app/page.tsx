"use client"
import ThreeScene from "@/app/components/three-scene"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full h-screen">
        <ThreeScene />
      </div>
    </main>
  )
}
