import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getUserCompanions, getUserSessions, getBookmarkedCompanions } from "@/lib/actions/companion.actions"
import Image from "next/image"
import CompanionsList from "@/components/CompanionsList"
import { CheckCircle, GraduationCap, Bookmark, Clock, User } from "lucide-react"

const Profile = async () => {
  const user = await currentUser()

  if (!user) redirect("/sign-in")

  const companions = await getUserCompanions(user.id)
  const sessionHistory = await getUserSessions(user.id)
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id)

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#EFBCD5]/5 to-[#F9DC5C]/5 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFBCD5]/10 to-[#F9DC5C]/10"></div>
          <CardContent className="relative p-8">
            <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-6">
              <div className="flex gap-6 items-center max-sm:flex-col max-sm:text-center">
                <div className="relative">
                  <Image
                    src={user.imageUrl || "/placeholder.svg"}
                    alt={user.firstName!}
                    width={120}
                    height={120}
                    className="rounded-2xl shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h1 className="text-4xl font-bold text-[#403F4C]">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-[#403F4C]/70 text-lg">{user.emailAddresses[0].emailAddress}</p>
                  <Badge className="bg-[#F9DC5C] text-[#403F4C] hover:bg-[#F9DC5C]/90 border-0">Learning Journey</Badge>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-4 max-sm:w-full max-sm:justify-center">
                <Card className="border border-[#EFBCD5]/30 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#E84855]" />
                      <span className="text-2xl font-bold text-[#403F4C]">{sessionHistory.length}</span>
                    </div>
                    <p className="text-sm text-[#403F4C]/70">Lessons Completed</p>
                  </CardContent>
                </Card>

                <Card className="border border-[#EFBCD5]/30 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <GraduationCap className="w-5 h-5 text-[#3185FC]" />
                      <span className="text-2xl font-bold text-[#403F4C]">{companions.length}</span>
                    </div>
                    <p className="text-sm text-[#403F4C]/70">Companions Created</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journey Sections */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="bookmarks" className="border border-[#EFBCD5]/30 rounded-xl px-6">
                <AccordionTrigger className="text-xl font-bold text-[#403F4C] hover:no-underline py-6">
                  <div className="flex items-center gap-3">
                    <Bookmark className="w-6 h-6 text-[#E84855]" />
                    <span>Bookmarked Companions</span>
                    <Badge className="bg-[#EFBCD5] text-[#403F4C] border-0">{bookmarkedCompanions.length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <CompanionsList companions={bookmarkedCompanions} title="" />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="recent" className="border border-[#EFBCD5]/30 rounded-xl px-6">
                <AccordionTrigger className="text-xl font-bold text-[#403F4C] hover:no-underline py-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-[#3185FC]" />
                    <span>Recent Sessions</span>
                    <Badge className="bg-[#3185FC]/10 text-[#3185FC] border-0">{sessionHistory.length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <CompanionsList title="" companions={sessionHistory} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="companions" className="border border-[#EFBCD5]/30 rounded-xl px-6">
                <AccordionTrigger className="text-xl font-bold text-[#403F4C] hover:no-underline py-6">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-[#F9DC5C]" />
                    <span>My Companions</span>
                    <Badge className="bg-[#F9DC5C] text-[#403F4C] border-0">{companions.length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <CompanionsList title="" companions={companions} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Profile
