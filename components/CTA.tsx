import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Sparkles, ArrowRight } from "lucide-react"

const CTA = () => {
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-[#EFBCD5]/20 to-[#F9DC5C]/20 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E84855]/5 to-[#3185FC]/5"></div>
      <CardContent className="relative p-8 text-center space-y-6">
        <Badge className="bg-[#F9DC5C] text-[#403F4C] hover:bg-[#F9DC5C]/90 border-0">
          <Sparkles className="w-4 h-4 mr-1" />
          Start Learning Your Way
        </Badge>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-[#403F4C] leading-tight">
            Build & Personalize Your Learning Companion
          </h2>
          <p className="text-[#403F4C]/80 leading-relaxed max-w-md mx-auto">
            Pick a name, subject, voice, & personality — and start learning through voice conversations that feel
            natural and fun.
          </p>
        </div>

        <div className="relative py-6">
          <Image
            src="/images/cta.svg"
            alt="AI Learning Companion"
            width={280}
            height={180}
            className="mx-auto drop-shadow-lg"
          />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-full animate-pulse"></div>
        </div>

        <Button
          asChild
          size="lg"
          className="w-full bg-gradient-to-r from-[#E84855] to-[#F9DC5C] hover:from-[#E84855]/90 hover:to-[#F9DC5C]/90 text-white font-semibold py-6 shadow-lg hover:shadow-xl transition-all duration-200 group"
        >
          <Link href="/companions/new">
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" />
            Build a New Companion
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default CTA
