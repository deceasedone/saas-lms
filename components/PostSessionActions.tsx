"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, BookOpen, HelpCircle, Loader2, CheckCircle } from "lucide-react"
import { generateNotesFromTranscript, generateQuizFromTranscript } from "@/lib/actions/ai.actions"
import NotesModal from "@/components/NotesModal"
import QuizModal from "@/components/QuizModal"

interface PostSessionActionsProps {
  messages: { role: string; content: string }[]
  subject: string
  topic: string
}

const PostSessionActions = ({ messages, subject, topic }: PostSessionActionsProps) => {
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false)
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false)
  const [notes, setNotes] = useState<string | null>(null)
  const [quiz, setQuiz] = useState<any[] | null>(null)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [showQuizModal, setShowQuizModal] = useState(false)

  const handleGenerateNotes = async () => {
    setIsGeneratingNotes(true)
    try {
      const transcript = messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n")
      const generatedNotes = await generateNotesFromTranscript(transcript, subject, topic)
      setNotes(generatedNotes)
      setShowNotesModal(true)
    } catch (error) {
      console.error("Error generating notes:", error)
    } finally {
      setIsGeneratingNotes(false)
    }
  }

  const handleGenerateQuiz = async () => {
    setIsGeneratingQuiz(true)
    try {
      const transcript = messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n")
      const generatedQuiz = await generateQuizFromTranscript(transcript, subject, topic)
      setQuiz(generatedQuiz)
      setShowQuizModal(true)
    } catch (error) {
      console.error("Error generating quiz:", error)
    } finally {
      setIsGeneratingQuiz(false)
    }
  }

  return (
    <>
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#403F4C]">Session Complete</h3>
              <p className="text-[#403F4C]/70">Enhance your learning with these tools</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Notes Card */}
            <Card className="border border-[#EFBCD5]/30 bg-gradient-to-br from-[#EFBCD5]/10 to-[#F9DC5C]/10 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#3185FC] to-[#EFBCD5] rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#403F4C]">Session Notes</h4>
                  </div>
                  <Badge className="bg-[#3185FC] text-white border-0">AI-Generated</Badge>
                </div>

                <p className="text-[#403F4C]/70">
                  Transform your conversation into structured notes for easy review and reference.
                </p>

                <Button
                  onClick={handleGenerateNotes}
                  disabled={isGeneratingNotes || messages.length === 0}
                  className="w-full bg-gradient-to-r from-[#3185FC] to-[#EFBCD5] hover:from-[#3185FC]/90 hover:to-[#EFBCD5]/90 text-white font-semibold"
                >
                  {isGeneratingNotes ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Notes...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Generate Notes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quiz Card */}
            <Card className="border border-[#EFBCD5]/30 bg-gradient-to-br from-[#F9DC5C]/10 to-[#E84855]/10 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-lg flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#403F4C]">Practice Quiz</h4>
                  </div>
                  <Badge className="bg-[#E84855] text-white border-0">10 Questions</Badge>
                </div>

                <p className="text-[#403F4C]/70">
                  Test your understanding with a personalized quiz based on your learning session.
                </p>

                <Button
                  onClick={handleGenerateQuiz}
                  disabled={isGeneratingQuiz || messages.length === 0}
                  className="w-full bg-gradient-to-r from-[#E84855] to-[#F9DC5C] hover:from-[#E84855]/90 hover:to-[#F9DC5C]/90 text-white font-semibold"
                >
                  {isGeneratingQuiz ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Quiz...
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Generate Quiz
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showNotesModal && notes && (
        <NotesModal notes={notes} subject={subject} topic={topic} onClose={() => setShowNotesModal(false)} />
      )}

      {showQuizModal && quiz && <QuizModal quiz={quiz} topic={topic} onClose={() => setShowQuizModal(false)} />}
    </>
  )
}

export default PostSessionActions
