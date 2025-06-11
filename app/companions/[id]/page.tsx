import { getCompanion } from "@/lib/actions/companion.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getSubjectColor } from "@/lib/utils"
import Image from "next/image"
import CompanionComponent from "@/components/CompanionComponent"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, BookOpen } from "lucide-react"

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params
  const companion = await getCompanion(id)
  const user = await currentUser()

  const { name, subject, title, topic, duration } = companion

  if (!user) redirect("/sign-in")
  if (!name) redirect("/companions")

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#EFBCD5]/5 to-[#F9DC5C]/5 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Session Header */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFBCD5]/10 to-[#F9DC5C]/10"></div>
          <CardContent className="relative p-8">
            <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-6">
              <div className="flex items-center gap-6">
                {/* Subject Icon */}
                <div
                  className="w-20 h-20 flex items-center justify-center rounded-2xl shadow-lg max-md:w-16 max-md:h-16"
                  style={{ backgroundColor: getSubjectColor(subject) }}
                >
                  <Image
                    src={`/icons/${subject}.svg`}
                    alt={subject}
                    width={40}
                    height={40}
                    className="max-md:w-8 max-md:h-8"
                  />
                </div>

                {/* Companion Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl font-bold text-[#403F4C] max-md:text-2xl">{name}</h1>
                    <Badge
                      className="text-white border-0 max-sm:hidden"
                      style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                      {subject}
                    </Badge>
                  </div>
                  <p className="text-xl text-[#403F4C]/80 max-md:text-lg">{topic}</p>
                  <div className="flex items-center gap-4 text-[#403F4C]/60">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span className="text-sm">AI Tutor</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm">Interactive Session</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Duration Badge */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#3185FC] to-[#EFBCD5] text-white px-6 py-3 rounded-xl shadow-lg max-md:self-start">
                <Clock className="w-5 h-5" />
                <span className="text-lg font-semibold">{duration} minutes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Companion Component */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <CompanionComponent {...companion} companionId={id} userName={user.firstName!} userImage={user.imageUrl!} />
        </div>
      </div>
    </main>
  )
}

export default CompanionSession
