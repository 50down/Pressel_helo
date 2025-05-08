"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MapPin, Send } from "lucide-react"

// Interface para os dados de localização
interface LocationData {
  city?: string
  state?: string
  country?: string
  loading: boolean
  error?: string
}

export default function PreSellPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [locationData, setLocationData] = useState<LocationData>({
    loading: true,
  })

  // Efeito para reproduzir o vídeo
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  // Efeito para obter a localização do usuário baseada no IP
  useEffect(() => {
    const getLocationByIP = async () => {
      try {
        // Usando a API ipapi.co para obter localização baseada no IP (sem necessidade de permissão)
        const response = await fetch("https://ipapi.co/json/")

        if (!response.ok) {
          throw new Error("Falha ao obter dados de localização")
        }

        const data = await response.json()

        setLocationData({
          city: data.city,
          state: data.region,
          country: data.country_name,
          loading: false,
        })
      } catch (error) {
        setLocationData({
          loading: false,
          error: "Não foi possível determinar sua localização",
        })
      }
    }

    getLocationByIP()
  }, [])

  // Função para renderizar o texto de localização
  const renderLocation = () => {
    if (locationData.loading) {
      return "Detectando localização..."
    }

    if (locationData.error) {
      return locationData.error
    }

    if (locationData.city && locationData.state) {
      return `Moro em ${locationData.city}, ${locationData.state}`
    }

    if (locationData.city) {
      return `Moro em ${locationData.city}`
    }

    if (locationData.state) {
      return `Moro em ${locationData.state}`
    }

    return "Localização desconhecida"
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Blurred video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover filter blur-md"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/fundo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Semi-transparent container with profile photo */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="relative bg-[#fff8fa]/80 rounded-lg p-8 w-full max-w-2xl min-h-[500px] flex flex-col items-center shadow-lg">
          {/* Profile photo - strategically placed at the top, slightly overlapping */}
          <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden border-4 border-pink-200 shadow-lg">
            <Image src="/images/perfil.jpeg" alt="Profile" width={128} height={128} className="object-cover" />
          </div>

          {/* Names with cleaner styling */}
          <div className="mt-10 text-center">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">Heloisa Carvalho</h1>

              {/* Online status indicator - right after the name */}
              <div className="inline-flex items-center px-3 py-0.5 mt-1 bg-gradient-to-r from-green-50 to-green-100 rounded-full shadow-sm border border-green-200">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="ml-1.5 text-xs font-medium text-green-700 tracking-wide">online</span>
              </div>
            </div>

            {/* Decorative line */}
            <div className="h-0.5 w-16 bg-pink-200 mx-auto mt-2 mb-2"></div>

            {/* Location display - below the decorative line */}
            <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-4">
              <MapPin className="w-4 h-4 text-pink-400" />
              <span className="font-medium">{renderLocation()}</span>
            </div>

            {/* Biography section - with lines extremely close together */}
            <div className="text-gray-700 max-w-lg mx-auto mb-8 font-bold text-lg text-center">
              <p>Será que é apertadinha ou só faz charme? 💖</p>
              <p className="-mt-0.5">Então vem tirar a prova… clica aí 👇🏻</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-4 mt-4 mb-8">
              {/* Top row with Privacy and Telegram buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <div className="sm:mr-8">
                  <a
                    href="https://privacy-yasmin.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-white hover:bg-gray-100 p-3 rounded-full border border-gray-300 shadow-sm transition-colors duration-300"
                    aria-label="Política de Privacidade"
                  >
                    <Image
                      src="/images/privacy-logo.png"
                      alt="Privacy Logo"
                      width={32}
                      height={32}
                      className="h-8 w-auto"
                    />
                  </a>
                </div>

                <a
                  href="https://t.me/vipyasmin1_bot?start=pressel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-sm transition-colors duration-300"
                >
                  <Send className="w-5 h-5" />
                  <span>VIP TELEGRAM</span>
                </a>
              </div>
            </div>

            {/* Fine print / Copyright notice */}
            <p className="text-xs text-gray-500 mt-auto">
              Todos os diretos de imagem reservados a Heloisa Carvalho sob a Lei nº 9.610/98
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

