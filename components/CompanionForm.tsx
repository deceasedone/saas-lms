"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { subjects } from "@/constants"
import { Textarea } from "@/components/ui/textarea"
import { createCompanion } from "@/lib/actions/companion.actions"
import { redirect } from "next/navigation"
import { useState } from "react"
import { Loader2, Sparkles, User, Clock, Mic, Palette } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(1, { message: "Companion name is required." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  topic: z.string().min(1, { message: "Topic is required." }),
  voice: z.string().min(1, { message: "Voice is required." }),
  style: z.string().min(1, { message: "Style is required." }),
  duration: z.coerce.number().min(1, { message: "Duration is required." }),
})

const CompanionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const companion = await createCompanion(values)

      if (companion) {
        redirect(`/companions/${companion.id}`)
      } else {
        console.log("Failed to create a companion")
        redirect("/")
      }
    } catch (error) {
      console.error("Error creating companion:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Section */}
          <Card className="border border-[#EFBCD5]/30 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#403F4C]">Basic Information</h3>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#403F4C] font-medium">Companion Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a friendly name for your AI tutor"
                        {...field}
                        className="border-[#EFBCD5]/50 focus:border-[#3185FC] focus:ring-[#3185FC]/20 bg-white/90 text-[#403F4C] placeholder:text-[#403F4C]/50"
                      />
                    </FormControl>
                    <FormDescription className="text-[#403F4C]/60">
                      Choose a memorable name that reflects your companion's personality
                    </FormDescription>
                    <FormMessage className="text-[#E84855]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#403F4C] font-medium">Subject</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <SelectTrigger className="border-[#EFBCD5]/50 focus:border-[#3185FC] focus:ring-[#3185FC]/20 bg-white/90 text-[#403F4C] capitalize">
                          <SelectValue placeholder="Select the subject area" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#EFBCD5]/30">
                          {subjects.map((subject) => (
                            <SelectItem
                              value={subject}
                              key={subject}
                              className="capitalize hover:bg-[#EFBCD5]/10 focus:bg-[#EFBCD5]/20 text-[#403F4C]"
                            >
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription className="text-[#403F4C]/60">
                      Select the primary subject your companion will teach
                    </FormDescription>
                    <FormMessage className="text-[#E84855]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#403F4C] font-medium">Learning Focus</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Derivatives & Integrals, Photosynthesis, World War II..."
                        {...field}
                        className="border-[#EFBCD5]/50 focus:border-[#3185FC] focus:ring-[#3185FC]/20 bg-white/90 text-[#403F4C] placeholder:text-[#403F4C]/50 min-h-[100px]"
                      />
                    </FormControl>
                    <FormDescription className="text-[#403F4C]/60">
                      Describe the specific topics or concepts your companion should help with
                    </FormDescription>
                    <FormMessage className="text-[#E84855]" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Personality & Voice Section */}
          <Card className="border border-[#EFBCD5]/30 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#3185FC] to-[#EFBCD5] rounded-lg flex items-center justify-center">
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#403F4C]">Personality & Voice</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="voice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#403F4C] font-medium flex items-center gap-2">
                        <Mic className="w-4 h-4" />
                        Voice Type
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                          <SelectTrigger className="border-[#EFBCD5]/50 focus:border-[#3185FC] focus:ring-[#3185FC]/20 bg-white/90 text-[#403F4C]">
                            <SelectValue placeholder="Select voice preference" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-[#EFBCD5]/30">
                            <SelectItem
                              value="male"
                              className="hover:bg-[#EFBCD5]/10 focus:bg-[#EFBCD5]/20 text-[#403F4C]"
                            >
                              Male Voice
                            </SelectItem>
                            <SelectItem
                              value="female"
                              className="hover:bg-[#EFBCD5]/10 focus:bg-[#EFBCD5]/20 text-[#403F4C]"
                            >
                              Female Voice
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[#E84855]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#403F4C] font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Teaching Style
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                          <SelectTrigger className="border-[#EFBCD5]/50 focus:border-[#3185FC] focus:ring-[#3185FC]/20 bg-white/90 text-[#403F4C]">
                            <SelectValue placeholder="Select teaching approach" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-[#EFBCD5]/30">
                            <SelectItem
                              value="formal"
                              className="hover:bg-[#EFBCD5]/10 focus:bg-[#EFBCD5]/20 text-[#403F4C]"
                            >
                              Formal & Academic
                            </SelectItem>
                            <SelectItem
                              value="casual"
                              className="hover:bg-[#EFBCD5]/10 focus:bg-[#EFBCD5]/20 text-[#403F4C]"
                            >
                              Casual & Friendly
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[#E84855]" />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Session Settings Section */}
          <Card className="border border-[#EFBCD5]/30 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#F9DC5C] to-[#E84855] rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#403F4C]">Session Settings</h3>
              </div>

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#403F4C] font-medium">Estimated Session Duration</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="15"
                          {...field}
                          className="border-[#EFBCD5]/50 focus:border-[#3185FC] focus:ring-[#3185FC]/20 bg-white/90 text-[#403F4C] pr-16"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#403F4C]/60 text-sm">
                          minutes
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription className="text-[#403F4C]/60">
                      Recommended duration for effective learning sessions (5-60 minutes)
                    </FormDescription>
                    <FormMessage className="text-[#E84855]" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#E84855] to-[#F9DC5C] hover:from-[#E84855]/90 hover:to-[#F9DC5C]/90 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating Your Companion...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Build Your AI Companion
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CompanionForm
