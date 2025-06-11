import { PricingTable } from "@clerk/nextjs"
import { Card, CardContent } from "@/components/ui/card"
import { Crown, Sparkles } from "lucide-react"

const Subscription = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#EFBCD5]/5 to-[#F9DC5C]/5 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-2xl flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#403F4C]">Choose Your Plan</h1>
              <p className="text-[#403F4C]/70 text-lg">Unlock the full potential of AI-powered learning</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#403F4C]/60">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Premium features and unlimited access</span>
          </div>
        </div>

        {/* Pricing Table */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <PricingTable
              appearance={{
                elements: {
                  card: "shadow-none bg-transparent",
                  cardBox: "border border-[#EFBCD5]/30 rounded-xl",
                  badge: "bg-gradient-to-r from-[#E84855] to-[#F9DC5C] text-white",
                  button:
                    "bg-gradient-to-r from-[#E84855] to-[#F9DC5C] hover:from-[#E84855]/90 hover:to-[#F9DC5C]/90 text-white font-semibold",
                  price: "text-[#403F4C]",
                  title: "text-[#403F4C] font-bold",
                  description: "text-[#403F4C]/70",
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Subscription
