"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle, CheckCircle, XCircle, RefreshCw, ArrowRight, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizModalProps {
  quiz: QuizQuestion[]
  topic: string
  onClose: () => void
}

const QuizModal = ({ quiz, topic, onClose }: QuizModalProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(quiz.length).fill(-1))
  const [showResults, setShowResults] = useState(false)
  const [shuffledQuiz, setShuffledQuiz] = useState<QuizQuestion[]>(quiz)

  const handleSelectAnswer = (optionIndex: number) => {
    if (showResults) return

    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestion] = optionIndex
    setSelectedAnswers(newSelectedAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestartQuiz = () => {
    // Shuffle questions
    const newShuffledQuiz = [...quiz].sort(() => Math.random() - 0.5)
    setShuffledQuiz(newShuffledQuiz)
    setCurrentQuestion(0)
    setSelectedAnswers(Array(quiz.length).fill(-1))
    setShowResults(false)
  }

  const calculateScore = () => {
    let correctCount = 0
    for (let i = 0; i < quiz.length; i++) {
      if (selectedAnswers[i] === quiz[i].correctAnswer) {
        correctCount++
      }
    }
    return correctCount
  }

  const score = calculateScore()
  const scorePercentage = Math.round((score / quiz.length) * 100)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col bg-white p-0 border-0 shadow-2xl">
        <DialogHeader className="p-6 border-b border-[#EFBCD5]/30 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-[#403F4C]">Practice Quiz</DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-[#E84855] text-white border-0">{quiz.length} Questions</Badge>
              {showResults && (
                <Badge
                  className={cn(
                    "border-0",
                    scorePercentage >= 70
                      ? "bg-green-500 text-white"
                      : scorePercentage >= 40
                        ? "bg-yellow-500 text-white"
                        : "bg-red-500 text-white",
                  )}
                >
                  Score: {score}/{quiz.length}
                </Badge>
              )}
            </div>
          </div>
          <div className="text-[#403F4C]/70 mt-1">{topic}</div>

          {/* Progress Bar */}
          {!showResults && (
            <div className="mt-4 w-full bg-[#EFBCD5]/20 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-[#E84855] to-[#F9DC5C] h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
              ></div>
            </div>
          )}
        </DialogHeader>

        {/* Quiz Content */}
        <div className="overflow-y-auto p-6 flex-grow">
          {showResults ? (
            <div className="space-y-6">
              <div className="text-center py-6">
                <div
                  className={cn(
                    "w-24 h-24 rounded-full mx-auto flex items-center justify-center",
                    scorePercentage >= 70 ? "bg-green-100" : scorePercentage >= 40 ? "bg-yellow-100" : "bg-red-100",
                  )}
                >
                  <span
                    className={cn(
                      "text-4xl font-bold",
                      scorePercentage >= 70
                        ? "text-green-600"
                        : scorePercentage >= 40
                          ? "text-yellow-600"
                          : "text-red-600",
                    )}
                  >
                    {scorePercentage}%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#403F4C] mt-4">
                  {scorePercentage >= 70
                    ? "Great job! 🎉"
                    : scorePercentage >= 40
                      ? "Good effort! 👍"
                      : "Keep practicing! 💪"}
                </h3>
                <p className="text-[#403F4C]/70 mt-2">
                  You answered {score} out of {quiz.length} questions correctly.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-[#403F4C]">Review Your Answers</h4>
                {quiz.map((question, index) => (
                  <Card
                    key={index}
                    className={cn(
                      "border",
                      selectedAnswers[index] === question.correctAnswer
                        ? "border-green-300 bg-green-50"
                        : "border-red-300 bg-red-50",
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {selectedAnswers[index] === question.correctAnswer ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium text-[#403F4C]">
                            {index + 1}. {question.question}
                          </p>
                          <div className="space-y-1">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={cn(
                                  "p-2 rounded-md text-sm",
                                  optionIndex === question.correctAnswer
                                    ? "bg-green-200 text-green-800"
                                    : optionIndex === selectedAnswers[index]
                                      ? "bg-red-200 text-red-800"
                                      : "bg-gray-100 text-[#403F4C]/70",
                                )}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge className="bg-[#F9DC5C] text-[#403F4C] border-0">
                  Question {currentQuestion + 1} of {quiz.length}
                </Badge>
              </div>

              <h3 className="text-xl font-semibold text-[#403F4C]">{shuffledQuiz[currentQuestion].question}</h3>

              <div className="space-y-3">
                {shuffledQuiz[currentQuestion].options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={cn(
                      "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                      selectedAnswers[currentQuestion] === optionIndex
                        ? "border-[#3185FC] bg-[#3185FC]/10"
                        : "border-[#EFBCD5]/50 hover:border-[#3185FC]/50 hover:bg-[#EFBCD5]/5",
                    )}
                    onClick={() => handleSelectAnswer(optionIndex)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium",
                          selectedAnswers[currentQuestion] === optionIndex
                            ? "bg-[#3185FC] text-white"
                            : "bg-[#EFBCD5]/30 text-[#403F4C]",
                        )}
                      >
                        {String.fromCharCode(65 + optionIndex)}
                      </div>
                      <span className="text-[#403F4C]">{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="p-6 border-t border-[#EFBCD5]/30 sticky bottom-0 bg-white z-10">
          <div className="flex justify-between items-center">
            {showResults ? (
              <>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button
                  onClick={handleRestartQuiz}
                  className="bg-gradient-to-r from-[#E84855] to-[#F9DC5C] hover:from-[#E84855]/90 hover:to-[#F9DC5C]/90 text-white font-semibold"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="border-[#EFBCD5]/50 text-[#403F4C]"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestion] === -1}
                  className="bg-gradient-to-r from-[#E84855] to-[#F9DC5C] hover:from-[#E84855]/90 hover:to-[#F9DC5C]/90 text-white font-semibold"
                >
                  {currentQuestion === quiz.length - 1 ? "Finish Quiz" : "Next Question"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default QuizModal
