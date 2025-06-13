import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn, getSubjectColor } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { Clock, ExternalLink } from "lucide-react"

interface Companion {
  id: string
  subject: string
  name: string
  topic: string
  duration: number
}

interface CompanionsListProps {
  title: string
  companions?: Companion[]
  classNames?: string
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
  return (
    <div className={cn("space-y-6", classNames)}>
      {title && <h2 className="text-3xl font-bold text-[#403F4C]">{title}</h2>}

      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#EFBCD5]/30 hover:bg-transparent">
                <TableHead className="text-lg font-semibold text-[#403F4C] py-4 px-6">Learning Sessions</TableHead>
                <TableHead className="text-lg font-semibold text-[#403F4C] py-4">Subject</TableHead>
                <TableHead className="text-lg font-semibold text-[#403F4C] py-4 text-right pr-6">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companions?.map(({ id, subject, name, topic, duration }, index) => (
                <TableRow
                  key={`${id}-${index}`}
                  className="border-b border-[#EFBCD5]/20 hover:bg-[#EFBCD5]/5 transition-colors duration-200 group"
                >
                  <TableCell className="py-4 px-6">
                    <Link href={`/companions/${id}`} className="block">
                      <div className="flex items-center gap-4 group-hover:translate-x-1 transition-transform duration-200">
                        {/* Subject Icon */}
                        <div
                          className="w-16 h-16 flex items-center justify-center rounded-xl shadow-md max-md:hidden group-hover:scale-105 transition-transform duration-200"
                          style={{ backgroundColor: getSubjectColor(subject) }}
                        >
                          <Image
                            src={`/icons/${subject}.svg`}
                            alt={subject}
                            width={28}
                            height={28}
                            className="filter brightness-0 invert"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-[#403F4C] group-hover:text-[#E84855] transition-colors duration-200">
                              {name}
                            </h3>
                            <ExternalLink className="w-4 h-4 text-[#403F4C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </div>
                          <p className="text-[#403F4C]/70 leading-relaxed">{topic}</p>
                        </div>
                      </div>
                    </Link>
                  </TableCell>

                  <TableCell className="py-4">
                    {/* Desktop Subject Badge */}
                    <Badge
                      className="text-white border-0 font-medium max-md:hidden"
                      style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                      {subject}
                    </Badge>

                    {/* Mobile Subject Icon */}
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-lg shadow-md md:hidden"
                      style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                      <Image
                        src={`/icons/${subject}.svg`}
                        alt={subject}
                        width={20}
                        height={20}
                        className="filter brightness-0 invert"
                      />
                    </div>
                  </TableCell>

                  <TableCell className="py-4 pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <Clock className="w-4 h-4 text-[#403F4C]/60" />
                      <span className="text-xl font-semibold text-[#403F4C]">
                        {duration}
                        <span className="text-sm font-normal text-[#403F4C]/70 ml-1 max-md:hidden">minutes</span>
                        <span className="text-sm font-normal text-[#403F4C]/70 ml-1 md:hidden">min</span>
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Empty State */}
          {(!companions || companions.length === 0) && (
            <div className="text-center py-12 px-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#EFBCD5] to-[#F9DC5C] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#403F4C] mb-2">No sessions yet</h3>
              <p className="text-[#403F4C]/70">Start learning to see your sessions here!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CompanionsList
