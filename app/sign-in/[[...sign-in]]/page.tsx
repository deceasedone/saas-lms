import { SignIn } from "@clerk/nextjs"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Sparkles } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#EFBCD5]/10 to-[#F9DC5C]/10 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xs sm:max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-[#403F4C]">LearnAI</h1>
              <p className="text-[#403F4C]/70">Welcome back!</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#403F4C]/60">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">AI-Powered Learning Platform</span>
          </div>
        </div>

        {/* Sign In Component */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-gradient-to-r from-[#E84855] to-[#F9DC5C] hover:from-[#E84855]/90 hover:to-[#F9DC5C]/90 text-white font-semibold",
                  card: "shadow-none bg-transparent",
                  headerTitle: "text-[#403F4C] text-2xl font-bold",
                  headerSubtitle: "text-[#403F4C]/70",
                  socialButtonsBlockButton: "border-[#EFBCD5] text-[#403F4C] hover:bg-[#EFBCD5]/10",
                  formFieldInput: "border-[#EFBCD5] focus:border-[#3185FC] focus:ring-[#3185FC]/20",
                  footerActionLink: "text-[#3185FC] hover:text-[#3185FC]/80",
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
