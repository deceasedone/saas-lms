import { getAllCompanions } from "@/lib/actions/companion.actions"
import CompanionCard from "@/components/CompanionCard"
import { getSubjectColor } from "@/lib/utils"
import SearchInput from "@/components/SearchInput"
import SubjectFilter from "@/components/SubjectFilter"
import { Sparkles, BookOpen } from "lucide-react"

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams
  const subject = filters.subject ? filters.subject : ""
  const topic = filters.topic ? filters.topic : ""

  const companions = await getAllCompanions({ subject, topic })

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#EFBCD5]/5 to-[#F9DC5C]/5 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <section className="flex justify-between items-start gap-6 max-sm:flex-col max-sm:gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#403F4C] leading-tight">Companion Library</h1>
                <p className="text-[#403F4C]/70 text-lg">Discover AI tutors for every subject</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 max-sm:w-full max-sm:flex-col">
            <SearchInput />
            <SubjectFilter />
          </div>
        </section>

        {/* Results Count */}
        <div className="flex items-center gap-2 text-[#403F4C]/70">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">{companions.length} companions available</span>
        </div>

        {/* Companions Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {companions.map((companion, index) => (
            <div
              key={companion.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CompanionCard {...companion} color={getSubjectColor(companion.subject)} />
            </div>
          ))}
        </section>

        {/* Empty State */}
        {companions.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <div className="w-24 h-24 bg-gradient-to-r from-[#EFBCD5] to-[#F9DC5C] rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-[#403F4C]">No companions found</h3>
            <p className="text-[#403F4C]/70 max-w-md mx-auto">
              Try adjusting your search criteria or explore different subjects to find the perfect learning companion.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default CompanionsLibrary
