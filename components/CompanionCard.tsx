"use client"

import type React from "react"

import { removeBookmark, addBookmark } from "@/lib/actions/companion.actions"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Bookmark, BookmarkCheck, Play } from "lucide-react"
import { useState } from "react"

interface CompanionCardProps {
  id: string
  name: string
  topic: string
  subject: string
  duration: number
  color: string
  bookmarked: boolean
}

const CompanionCard = ({ id, name, topic, subject, duration, color, bookmarked }: CompanionCardProps) => {
  const pathname = usePathname()
  const [isBookmarked, setIsBookmarked] = useState(bookmarked)
  const [isBookmarking, setIsBookmarking] = useState(false)

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsBookmarking(true)
    try {
      if (isBookmarked) {
        await removeBookmark(id, pathname)
      } else {
        await addBookmark(id, pathname)
      }
      setIsBookmarked(!isBookmarked)
    } catch (error) {
      console.error("Error toggling bookmark:", error)
    } finally {
      setIsBookmarking(false)
    }
  }

  return (
    <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#EFBCD5]/10 to-[#F9DC5C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <CardContent className="relative p-6 space-y-4">
        {/* Header with Subject Badge and Bookmark */}
        <div className="flex justify-between items-start">
          <Badge className="text-white border-0 font-medium" style={{ backgroundColor: color }}>
            {subject}
          </Badge>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            disabled={isBookmarking}
            className="h-8 w-8 p-0 hover:bg-[#EFBCD5]/20 transition-colors duration-200"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-[#E84855]" />
            ) : (
              <Bookmark className="w-4 h-4 text-[#403F4C]/60 hover:text-[#E84855]" />
            )}
          </Button>
        </div>

        {/* Subject Icon */}
        <div className="flex justify-center py-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: color }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={32}
              height={32}
              className="filter brightness-0 invert"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 text-center">
          <h3 className="text-xl font-bold text-[#403F4C] line-clamp-2 group-hover:text-[#E84855] transition-colors duration-200">
            {name}
          </h3>
          <p className="text-[#403F4C]/70 text-sm line-clamp-2 leading-relaxed">{topic}</p>
        </div>

        {/* Duration */}
        <div className="flex items-center justify-center gap-2 text-[#403F4C]/60">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{duration} minutes</span>
        </div>

        {/* Launch Button */}
        <Button
          asChild
          className="w-full bg-gradient-to-r from-[#E84855] to-[#F9DC5C] hover:from-[#E84855]/90 hover:to-[#F9DC5C]/90 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200 group/button"
        >
          <Link href={`/companions/${id}`}>
            <Play className="w-4 h-4 mr-2 group-hover/button:scale-110 transition-transform duration-200" />
            Launch Lesson
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default CompanionCard
