export const dynamic = "force-dynamic"

import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import CTA from "@/components/CTA"
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.actions"
import { getSubjectColor } from "@/lib/utils"
import { TrendingUp, Clock } from "lucide-react"

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 })
  const recentSessionsRaw = await getRecentSessions(10)
  const recentSessionsCompanions = recentSessionsRaw.flat() as Companion[]

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#EFBCD5]/5 to-[#F9DC5C]/5 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Popular Companions Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#403F4C]">Popular Companions</h1>
              <p className="text-[#403F4C]/70 text-lg">Most loved AI tutors by our community</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {companions.map((companion, index) => (
              <div
                key={companion.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex justify-center"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CompanionCard {...companion} color={getSubjectColor(companion.subject)} />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Sessions & CTA Section */}
        <section className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#3185FC] to-[#EFBCD5] rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#403F4C]">Recently Completed Sessions</h2>
            </div>
            <CompanionsList title="" companions={recentSessionsCompanions} classNames="w-full" />
          </div>

          <div className="lg:col-span-1">
            <CTA />
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-[#403F4C] to-[#3185FC] rounded-3xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-white/80">Active Learners</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-white/80">AI Sessions</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-white/80">Success Rate</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Page
