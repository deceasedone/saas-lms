"use client"

import { useEffect, useRef, useState } from "react"
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils"
import { vapi } from "@/lib/vapi.sdk"
import Image from "next/image"
import Lottie, { type LottieRefCurrentProps } from "lottie-react"
import soundwaves from "@/constants/soundwaves.json"
import { addToSessionHistory } from "@/lib/actions/companion.actions"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Phone, PhoneOff, Volume2 } from "lucide-react"
import PostSessionActions from "@/components/PostSessionActions"

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface CompanionComponentProps {
  companionId: string
  subject: string
  topic: string
  name: string
  userName: string
  userImage: string
  style: string
  voice: string
}

interface SavedMessage {
  role: string
  content: string
}

interface Message {
  type: string
  transcriptType?: string
  role: string
  transcript: string
}

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [messages, setMessages] = useState<SavedMessage[]>([])

  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play()
      } else {
        lottieRef.current?.stop()
      }
    }
  }, [isSpeaking, lottieRef])

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE)

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED)
      addToSessionHistory(companionId)
    }

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript }
        setMessages((prev) => [newMessage, ...prev])
      }
    }

    const onSpeechStart = () => setIsSpeaking(true)
    const onSpeechEnd = () => setIsSpeaking(false)

    const onError = (error: Error) => console.log("Error", error)

    vapi.on("call-start", onCallStart)
    vapi.on("call-end", onCallEnd)
    vapi.on("message", onMessage)
    vapi.on("error", onError)
    vapi.on("speech-start", onSpeechStart)
    vapi.on("speech-end", onSpeechEnd)

    return () => {
      vapi.off("call-start", onCallStart)
      vapi.off("call-end", onCallEnd)
      vapi.off("message", onMessage)
      vapi.off("error", onError)
      vapi.off("speech-start", onSpeechStart)
      vapi.off("speech-end", onSpeechEnd)
    }
  }, [companionId])

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted()
    vapi.setMuted(!isMuted)
    setIsMuted(!isMuted)
  }

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING)

    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    }

    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides)
  }

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop()
  }

  return (
    <div className="space-y-8">
      {/* Session Interface */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* AI Companion Section */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EFBCD5]/10 to-[#F9DC5C]/10"></div>
          <CardContent className="relative p-8 text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-4 h-4 rounded-full animate-pulse"
                style={{ backgroundColor: getSubjectColor(subject) }}
              ></div>
              <Badge className="text-white border-0" style={{ backgroundColor: getSubjectColor(subject) }}>
                AI Tutor
              </Badge>
            </div>

            {/* Avatar Container */}
            <div className="relative mx-auto w-48 h-48 max-sm:w-36 max-sm:h-36">
              <div
                className="w-full h-full rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden"
                style={{ backgroundColor: getSubjectColor(subject) }}
              >
                {/* Static Icon */}
                <div
                  className={cn(
                    "absolute transition-opacity duration-1000",
                    callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE
                      ? "opacity-100"
                      : "opacity-0",
                    callStatus === CallStatus.CONNECTING && "opacity-100 animate-pulse",
                  )}
                >
                  <Image
                    src={`/icons/${subject}.svg`}
                    alt={subject}
                    width={120}
                    height={120}
                    className="max-sm:w-20 max-sm:h-20"
                  />
                </div>

                {/* Animated Soundwaves */}
                <div
                  className={cn(
                    "absolute transition-opacity duration-1000",
                    callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Lottie
                    lottieRef={lottieRef}
                    animationData={soundwaves}
                    autoplay={false}
                    className="w-32 h-32 max-sm:w-24 max-sm:h-24"
                  />
                </div>

                {/* Speaking Indicator */}
                {isSpeaking && callStatus === CallStatus.ACTIVE && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-full flex items-center justify-center animate-pulse">
                      <Volume2 className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#403F4C]">{name}</h3>
              <p className="text-[#403F4C]/70">Your AI Learning Companion</p>
            </div>
          </CardContent>
        </Card>

        {/* User Controls Section */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 space-y-6">
            {/* User Info */}
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-32 h-32">
                <Image
                  src={userImage || "/placeholder.svg"}
                  alt={userName}
                  width={128}
                  height={128}
                  className="rounded-2xl shadow-lg object-cover w-full h-full"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#3185FC] to-[#EFBCD5] rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#403F4C]">{userName}</h3>
                <p className="text-[#403F4C]/70">Learner</p>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* Microphone Toggle */}
              <Button
                onClick={toggleMicrophone}
                disabled={callStatus !== CallStatus.ACTIVE}
                variant="outline"
                size="lg"
                className={cn(
                  "w-full border-2 transition-all duration-200",
                  isMuted
                    ? "border-[#E84855] text-[#E84855] hover:bg-[#E84855] hover:text-white"
                    : "border-[#3185FC] text-[#3185FC] hover:bg-[#3185FC] hover:text-white",
                  callStatus !== CallStatus.ACTIVE && "opacity-50 cursor-not-allowed",
                )}
              >
                {isMuted ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                <span className="max-sm:hidden">{isMuted ? "Turn on microphone" : "Turn off microphone"}</span>
                <span className="sm:hidden">{isMuted ? "Mic Off" : "Mic On"}</span>
              </Button>

              {/* Call Control */}
              <Button
                onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                disabled={callStatus === CallStatus.CONNECTING}
                size="lg"
                className={cn(
                  "w-full font-semibold py-6 text-lg transition-all duration-200",
                  callStatus === CallStatus.ACTIVE
                    ? "bg-[#E84855] hover:bg-[#E84855]/90 text-white"
                    : "bg-gradient-to-r from-[#E84855] to-[#F9DC5C] hover:from-[#E84855]/90 hover:to-[#F9DC5C]/90 text-white",
                  callStatus === CallStatus.CONNECTING && "animate-pulse",
                )}
              >
                {callStatus === CallStatus.ACTIVE ? (
                  <>
                    <PhoneOff className="w-5 h-5 mr-2" />
                    End Session
                  </>
                ) : callStatus === CallStatus.CONNECTING ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <Phone className="w-5 h-5 mr-2" />
                    Start Session
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversation Transcript */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-[#3185FC] to-[#EFBCD5] rounded-lg flex items-center justify-center">
              <Volume2 className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#403F4C]">Live Conversation</h3>
            {callStatus === CallStatus.ACTIVE && (
              <Badge className="bg-[#E84855] text-white border-0 animate-pulse">Live</Badge>
            )}
          </div>

          <div className="relative">
            <div className="max-h-96 overflow-y-auto space-y-4 p-4 bg-gradient-to-b from-[#EFBCD5]/5 to-[#F9DC5C]/5 rounded-xl">
              {messages.length === 0 ? (
                <div className="text-center py-8 text-[#403F4C]/60">
                  <p>Start a session to see your conversation here...</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-lg max-w-[80%] animate-in slide-in-from-bottom-2 duration-300",
                      message.role === "assistant"
                        ? "bg-white shadow-sm border border-[#EFBCD5]/30 mr-auto"
                        : "bg-gradient-to-r from-[#3185FC]/10 to-[#EFBCD5]/10 border border-[#3185FC]/20 ml-auto",
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold",
                          message.role === "assistant"
                            ? "bg-gradient-to-r from-[#E84855] to-[#F9DC5C] text-white"
                            : "bg-gradient-to-r from-[#3185FC] to-[#EFBCD5] text-white",
                        )}
                      >
                        {message.role === "assistant" ? "AI" : "U"}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#403F4C]/80 mb-1">
                          {message.role === "assistant" ? name.split(" ")[0] : userName}
                        </p>
                        <p className="text-[#403F4C] leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Fade overlay for better visual hierarchy */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          </div>
        </CardContent>
      </Card>

      {/* Post-Session Actions - Only show when session is finished */}
      {callStatus === CallStatus.FINISHED && messages.length > 0 && (
        <PostSessionActions messages={messages} subject={subject} topic={topic} />
      )}
    </div>
  )
}

export default CompanionComponent
