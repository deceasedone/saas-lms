"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mic,
  Brain,
  Users,
  Star,
  ArrowRight,
  Play,
  MessageSquare,
  FileText,
  Award,
  Sparkles,
  Volume2,
  UserPlus,
  Target,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice-Powered Learning",
      description: "Engage in natural conversations with AI tutors that adapt to your learning style",
      color: "from-[#E84855] to-[#F9DC5C]",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Create & Share Sessions",
      description: "Build interactive learning experiences and share them with your community",
      color: "from-[#3185FC] to-[#EFBCD5]",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Notes & Quizzes",
      description: "AI generates personalized notes and assessments based on your sessions",
      color: "from-[#F9DC5C] to-[#3185FC]",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Adaptive Intelligence",
      description: "AI learns your preferences and optimizes content for maximum retention",
      color: "from-[#EFBCD5] to-[#E84855]",
    },
  ]

  const stats = [
    { number: "50K+", label: "Active Learners" },
    { number: "10K+", label: "AI Sessions" },
    { number: "95%", label: "Completion Rate" },
    { number: "4.9★", label: "User Rating" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#EFBCD5]/10 to-[#F9DC5C]/10">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[#EFBCD5]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#403F4C]">LearnAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-[#403F4C] hover:text-[#E84855] transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-[#403F4C] hover:text-[#E84855] transition-colors">
                How it Works
              </a>
              <a href="#community" className="text-[#403F4C] hover:text-[#E84855] transition-colors">
                Community
              </a>
              <Link href="/Home">
                <Button className="bg-gradient-to-r from-[#E84855] to-[#F9DC5C] hover:from-[#E84855]/80 hover:to-[#F9DC5C]/80 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Get Started
                </Button>
              </Link>
            </div>
            {/* Mobile Get Started button */}
            <div className="md:hidden flex items-center">
              <Link href="/Home">
                <Button className="bg-gradient-to-r from-[#E84855] to-[#F9DC5C] text-white px-4 py-2 text-sm font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 sm:px-0">
            <div className={`space-y-8 ${isVisible ? "animate-in slide-in-from-left duration-1000" : "opacity-0"}`}>
              <div className="space-y-4">
                <Badge className="bg-[#F9DC5C] text-[#403F4C] hover:bg-[#F9DC5C]/90 border-0">
                  <Sparkles className="w-4 h-4 mr-1" />
                  AI-Powered Learning Revolution
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-[#403F4C] leading-tight">
                  Learn Through
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E84855] to-[#3185FC]">
                    {" "}
                    Conversation
                  </span>
                </h1>
                <p className="text-xl text-[#403F4C]/80 leading-relaxed">
                  Experience the future of education with AI tutors that speak your language. Create, share, and master
                  any subject through interactive voice sessions.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                <Link href="/Home">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#E84855] to-[#F9DC5C] hover:from-[#E84855]/80 hover:to-[#F9DC5C]/80 text-white text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl transform w-full sm:w-auto"
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    Start Learning Now
                  </Button>
                </Link>
                <Link href="/companions">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#3185FC] text-[#3185FC] hover:bg-gradient-to-r hover:from-[#3185FC] hover:to-[#EFBCD5] hover:text-white hover:border-transparent text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl transform w-full sm:w-auto"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create Sessions
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-[#E84855]">{stat.number}</div>
                    <div className="text-sm text-[#403F4C]/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative ${isVisible ? "animate-in slide-in-from-right duration-1000" : "opacity-0"}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3185FC] to-[#EFBCD5] rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-[#EFBCD5]/20">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-full flex items-center justify-center">
                        <Mic className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#403F4C]">AI Tutor Session</div>
                        <div className="text-sm text-[#403F4C]/70">Advanced Mathematics</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-[#3185FC]/10 rounded-lg p-4 border border-[#3185FC]/20">
                        <div className="text-sm text-[#403F4C]/80 mb-2">You:</div>
                        <div className="text-[#403F4C]">"Can you explain calculus derivatives?"</div>
                      </div>

                      <div className="bg-[#F9DC5C]/20 rounded-lg p-4 border border-[#F9DC5C]/30">
                        <div className="text-sm text-[#403F4C]/80 mb-2">AI Tutor:</div>
                        <div className="text-[#403F4C]">"Let's start with the concept of rate of change..."</div>
                        <div className="flex items-center mt-2 space-x-2">
                          <div className="w-2 h-2 bg-[#E84855] rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-[#E84855] rounded-full animate-pulse delay-100"></div>
                          <div className="w-2 h-2 bg-[#E84855] rounded-full animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-r from-[#EFBCD5]/10 to-[#3185FC]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#403F4C] mb-4">Revolutionizing Education with AI</h2>
            <p className="text-xl text-[#403F4C]/80 max-w-3xl mx-auto">
              Discover how our platform transforms traditional learning into an interactive, personalized experience
              that adapts to your unique learning style.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-500 hover:scale-110 border-0 hover:shadow-2xl transform hover:-translate-y-2 ${
                  activeFeature === index
                    ? `bg-gradient-to-br ${feature.color} text-white shadow-2xl scale-105`
                    : "bg-white hover:bg-gradient-to-br hover:from-[#EFBCD5]/20 hover:to-[#F9DC5C]/20 border border-[#EFBCD5]/30 hover:border-[#3185FC]/50"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div
                    className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                      activeFeature === index
                        ? "bg-white/20"
                        : `bg-gradient-to-r ${feature.color} group-hover:shadow-lg`
                    }`}
                  >
                    <div className={activeFeature === index ? "text-white" : "text-white"}>{feature.icon}</div>
                  </div>
                  <h3 className={`text-xl font-semibold ${activeFeature === index ? "text-white" : "text-[#403F4C]"}`}>
                    {feature.title}
                  </h3>
                  <p className={`${activeFeature === index ? "text-white/90" : "text-[#403F4C]/70"}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#403F4C] mb-4">Your Learning Journey</h2>
            <p className="text-xl text-[#403F4C]/80">Three simple steps to transform your learning experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Topic",
                description: "Select from thousands of subjects or create your own learning path",
                icon: <Target className="w-8 h-8" />,
                gradient: "from-[#E84855] to-[#F9DC5C]",
              },
              {
                step: "02",
                title: "Start Conversation",
                description: "Engage with AI tutors through natural voice interactions",
                icon: <MessageSquare className="w-8 h-8" />,
                gradient: "from-[#3185FC] to-[#EFBCD5]",
              },
              {
                step: "03",
                title: "Track Progress",
                description: "Get personalized notes, quizzes, and performance insights",
                icon: <TrendingUp className="w-8 h-8" />,
                gradient: "from-[#F9DC5C] to-[#3185FC]",
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mx-auto shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl transform group-hover:-translate-y-1`}
                    >
                      <div className="text-white transition-transform duration-300 group-hover:scale-110">
                        {item.icon}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#403F4C] rounded-full flex items-center justify-center text-white text-sm font-bold transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#E84855] group-hover:to-[#F9DC5C] group-hover:scale-110">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-[#403F4C] transition-colors duration-300 group-hover:text-[#E84855]">
                    {item.title}
                  </h3>
                  <p className="text-[#403F4C]/70 transition-colors duration-300 group-hover:text-[#403F4C]/90">
                    {item.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-[#3185FC] mx-auto transition-all duration-300 group-hover:text-[#E84855] group-hover:scale-110 group-hover:translate-x-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-gradient-to-br from-[#403F4C] to-[#3185FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Join the Learning Revolution</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Connect with learners worldwide, share knowledge, and grow together in our vibrant community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Medical Student",
                content:
                  "The voice sessions helped me understand complex anatomy concepts in ways textbooks never could. It's like having a personal tutor available 24/7.",
                avatar: "SC",
                gradient: "from-[#E84855] to-[#F9DC5C]",
              },
              {
                name: "Marcus Rodriguez",
                role: "Software Engineer",
                content:
                  "Creating coding sessions for my team has revolutionized our learning culture. The AI adapts to different skill levels perfectly.",
                avatar: "MR",
                gradient: "from-[#3185FC] to-[#EFBCD5]",
              },
              {
                name: "Dr. Emily Watson",
                role: "Educator",
                content:
                  "I've integrated this platform into my curriculum. Students are more engaged and retain information better than ever before.",
                avatar: "EW",
                gradient: "from-[#F9DC5C] to-[#E84855]",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl transform hover:-translate-y-2 group"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#F9DC5C] text-[#F9DC5C] transition-all duration-300 group-hover:scale-110"
                      />
                    ))}
                  </div>
                  <p className="text-white/90 italic transition-colors duration-300 group-hover:text-white">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold transition-colors duration-300 group-hover:text-[#F9DC5C]">
                        {testimonial.name}
                      </div>
                      <div className="text-white/70 text-sm transition-colors duration-300 group-hover:text-white/90">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#F9DC5C] to-[#EFBCD5]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#403F4C] mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-[#403F4C]/80 mb-8">
            Join thousands of learners who are already experiencing the future of education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/Home">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#E84855] to-[#F9DC5C] hover:from-[#E84855]/80 hover:to-[#F9DC5C]/80 text-white text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl transform hover:-translate-y-1"
              >
                <Play className="w-5 h-5 mr-2 transition-transform duration-300 hover:scale-110" />
                Begin Your Journey
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#403F4C] text-[#403F4C] hover:bg-gradient-to-r hover:from-[#403F4C] hover:to-[#3185FC] hover:text-white hover:border-transparent text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-xl transform hover:-translate-y-1"
            >
              <Award className="w-5 h-5 mr-2 transition-transform duration-300 hover:scale-110" />
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#403F4C] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#E84855] to-[#F9DC5C] rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">LearnAI</span>
              </div>
              <p className="text-white/70">
                Revolutionizing education through AI-powered interactive learning experiences.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#F9DC5C]">Platform</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#EFBCD5] transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Voice Sessions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#EFBCD5] transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Create Content
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#EFBCD5] transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Smart Quizzes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#EFBCD5] transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Progress Tracking
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#F9DC5C]">Community</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#EFBCD5] transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Learner Hub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#EFBCD5] transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Creator Network
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#EFBCD5] transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Success Stories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#EFBCD5] transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#F9DC5C]">Company</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#EFBCD5] transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#EFBCD5] transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#EFBCD5] transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#EFBCD5] transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
            <p>&copy; 2024 LearnAI. All rights reserved. Empowering minds through AI.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
