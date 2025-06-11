"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { subjects } from "@/constants"
import { useRouter, useSearchParams } from "next/navigation"
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"
import { Filter } from "lucide-react"

const SubjectFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("subject") || ""

  const [subject, setSubject] = useState(query)

  useEffect(() => {
    let newUrl = ""
    if (subject === "all" || subject === "") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      })
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      })
    }
    router.push(newUrl, { scroll: false })
  }, [subject, router, searchParams])

  return (
    <div className="relative min-w-[180px]">
      <Select onValueChange={setSubject} value={subject}>
        <SelectTrigger className="border-[#EFBCD5]/50 focus:border-[#3185FC] focus:ring-[#3185FC]/20 bg-white/90 text-[#403F4C] capitalize h-12">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#403F4C]/60" />
            <SelectValue placeholder="Filter by subject" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white border-[#EFBCD5]/30">
          <SelectItem value="all" className="hover:bg-[#EFBCD5]/10 focus:bg-[#EFBCD5]/20 text-[#403F4C] font-medium">
            All Subjects
          </SelectItem>
          {subjects.map((subject) => (
            <SelectItem
              key={subject}
              value={subject}
              className="capitalize hover:bg-[#EFBCD5]/10 focus:bg-[#EFBCD5]/20 text-[#403F4C]"
            >
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SubjectFilter
