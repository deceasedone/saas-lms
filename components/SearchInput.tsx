"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"
import { Button } from "@/components/ui/button"

const SearchInput = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("topic") || ""

  const [searchQuery, setSearchQuery] = useState(query)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        })

        router.push(newUrl, { scroll: false })
      } else {
        if (pathname === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          })

          router.push(newUrl, { scroll: false })
        }
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery, router, searchParams, pathname])

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#403F4C]/60" />
        <Input
          placeholder="Search companions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 border-[#EFBCD5]/50 focus:border-[#3185FC] focus:ring-[#3185FC]/20 bg-white/90 text-[#403F4C] placeholder:text-[#403F4C]/50 h-12"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-[#EFBCD5]/20"
          >
            <X className="w-4 h-4 text-[#403F4C]/60" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default SearchInput
