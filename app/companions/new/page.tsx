import CompanionForm from "@/components/CompanionForm"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { newCompanionPermissions } from "@/lib/actions/companion.actions"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Crown, Sparkles } from "lucide-react"

const NewCompanion = async () => {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const canCreateCompanion = await newCompanionPermissions()

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#EFBCD5]/5 to-[#F9DC5C]/5 p-6">
      <div className="max-w-4xl mx-auto">
        {canCreateCompanion ? (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-2xl flex items-center justify-center">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl font-bold text-[#403F4C]">Companion Builder</h1>
                  <p className="text-[#403F4C]/70 text-lg">Create your personalized AI tutor</p>
                </div>
              </div>
              <Badge className="bg-[#F9DC5C] text-[#403F4C] hover:bg-[#F9DC5C]/90 border-0">
                <Sparkles className="w-4 h-4 mr-1" />
                AI-Powered Creation
              </Badge>
            </div>

            {/* Form Container */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <CompanionForm />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[70vh]">
            <Card className="max-w-lg w-full border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8 text-center space-y-6">
                <div className="relative">
                  <Image
                    src="/images/limit.svg"
                    alt="Companion limit reached"
                    width={200}
                    height={150}
                    className="mx-auto"
                  />
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-gradient-to-r from-[#E84855] to-[#F9DC5C] text-white border-0">
                      <Crown className="w-4 h-4 mr-1" />
                      Upgrade Required
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl font-bold text-[#403F4C]">You've Reached Your Limit</h1>
                  <p className="text-[#403F4C]/70 leading-relaxed">
                    You've reached your companion limit. Upgrade to create more companions and unlock premium features.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#E84855] to-[#F9DC5C] hover:from-[#E84855]/90 hover:to-[#F9DC5C]/90 text-white font-semibold py-6"
                  >
                    <Link href="/subscription">
                      <Crown className="w-5 h-5 mr-2" />
                      Upgrade My Plan
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full border-[#3185FC] text-[#3185FC] hover:bg-[#3185FC] hover:text-white"
                  >
                    <Link href="/companions">Browse Companions</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}

export default NewCompanion
