"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Download, Copy, Check, FileText } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas-pro"

interface NotesModalProps {
  notes: string
  subject: string
  topic: string
  onClose: () => void
}

const NotesModal = ({ notes, subject, topic, onClose }: NotesModalProps) => {
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const notesRef = useRef<HTMLDivElement>(null)

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(notes)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      // Create a completely isolated container with only standard CSS properties
      const tempContainer = document.createElement('div')
      tempContainer.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: 800px;
        padding: 40px;
        background-color: #ffffff;
        font-family: Arial, sans-serif;
        font-size: 14px;
        line-height: 1.6;
        color: #333333;
        box-sizing: border-box;
      `
      
      // Convert oklch/modern colors to standard hex colors
      const colorMap = {
        '#403F4C': '#403F4C',
        'rgb(64, 63, 76)': '#403F4C',
        '#3185FC': '#3185FC', 
        '#EFBCD5': '#EFBCD5',
        '#F9DC5C': '#F9DC5C'
      }
      
      // Format content with only standard CSS properties
      const formattedContent = notes.split("\n").map((line, index) => {
        if (line.startsWith("# ")) {
          return `<h2 style="font-size: 24px; font-weight: bold; color: #333333; margin: 24px 0 12px 0; font-family: Arial, sans-serif;">${line.substring(2)}</h2>`
        } else if (line.startsWith("## ")) {
          return `<h3 style="font-size: 20px; font-weight: 600; color: #333333; margin: 20px 0 8px 0; font-family: Arial, sans-serif;">${line.substring(3)}</h3>`
        } else if (line.startsWith("### ")) {
          return `<h4 style="font-size: 18px; font-weight: 500; color: #333333; margin: 16px 0 8px 0; font-family: Arial, sans-serif;">${line.substring(4)}</h4>`
        } else if (line.startsWith("- ")) {
          return `<div style="margin-left: 24px; color: #444444; margin-bottom: 8px; position: relative; font-family: Arial, sans-serif;"><span style="position: absolute; left: -16px; top: 0;">•</span>${line.substring(2)}</div>`
        } else if (line.match(/^\d+\. /)) {
          const number = line.match(/^(\d+)\. /)?.[1] || '1'
          return `<div style="margin-left: 24px; color: #444444; margin-bottom: 8px; position: relative; font-family: Arial, sans-serif;"><span style="position: absolute; left: -20px; top: 0; font-weight: bold;">${number}.</span>${line.substring(line.indexOf(' ') + 1)}</div>`
        } else if (line.trim() === "") {
          return `<div style="height: 8px;"></div>`
        } else {
          return `<p style="color: #444444; margin-bottom: 12px; font-family: Arial, sans-serif;">${line}</p>`
        }
      }).join('')

      // Add header with standard colors only
      const headerHTML = `
        <div style="border-bottom: 2px solid #e0e0e0; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="font-size: 28px; font-weight: bold; color: #333333; margin: 0 0 8px 0; font-family: Arial, sans-serif;">Session Notes</h1>
          <div style="font-size: 16px; color: #666666; margin-bottom: 12px; font-family: Arial, sans-serif;">${topic}</div>
          <div style="display: inline-block; background-color: #F9DC5C; color: #333333; padding: 6px 12px; border-radius: 12px; font-size: 12px; font-weight: 500; margin-right: 8px; font-family: Arial, sans-serif;">${subject}</div>
          <div style="display: inline-block; background-color: #3185FC; color: #ffffff; padding: 6px 12px; border-radius: 12px; font-size: 12px; font-weight: 500; font-family: Arial, sans-serif;">AI-Generated</div>
        </div>
      `

      tempContainer.innerHTML = headerHTML + formattedContent
      document.body.appendChild(tempContainer)

      // Use html2canvas with specific options to avoid color parsing issues
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 800,
        height: tempContainer.scrollHeight + 80,
        ignoreElements: (element) => {
          // Ignore any elements that might have problematic styles
          if (element instanceof HTMLElement) {
            return element.style.background?.includes('oklch') || 
                   element.style.backgroundColor?.includes('oklch') ||
                   element.style.color?.includes('oklch')
          }
          return false
        }
      })

      // Clean up
      document.body.removeChild(tempContainer)

      const imgData = canvas.toDataURL("image/png", 1.0)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pdfWidth
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Handle multiple pages if content is too long
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pdfHeight
      }

      pdf.save(`${subject.replace(/[^a-z0-9]/gi, '_')}-${topic.replace(/[^a-z0-9]/gi, '_')}-notes.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      // Enhanced fallback with better user guidance
      const fallbackMessage = `PDF generation failed due to a technical issue. 

Alternative options:
1. Click "Copy to Clipboard" below, then paste into Google Docs or Word and save as PDF
2. Use your browser's Print function (Ctrl+P) and select "Save as PDF"
3. Take a screenshot of the notes for quick reference

The notes content is still available to copy!`
      
      alert(fallbackMessage)
    } finally {
      setIsDownloading(false)
    }
  }

  // Format notes with Tailwind classes for display
  const formattedNotes = notes.split("\n").map((line, index) => {
    // Check if line is a heading
    if (line.startsWith("# ")) {
      return (
        <h2 key={index} className="text-2xl font-bold text-[#403F4C] mt-6 mb-3">
          {line.substring(2)}
        </h2>
      )
    } else if (line.startsWith("## ")) {
      return (
        <h3 key={index} className="text-xl font-semibold text-[#403F4C] mt-5 mb-2">
          {line.substring(3)}
        </h3>
      )
    } else if (line.startsWith("### ")) {
      return (
        <h4 key={index} className="text-lg font-medium text-[#403F4C] mt-4 mb-2">
          {line.substring(4)}
        </h4>
      )
    } else if (line.startsWith("- ")) {
      return (
        <li key={index} className="ml-6 text-[#403F4C]/90 mb-2 list-disc">
          {line.substring(2)}
        </li>
      )
    } else if (line.match(/^\d+\. /)) {
      return (
        <li key={index} className="ml-6 text-[#403F4C]/90 mb-2 list-decimal">
          {line.substring(line.indexOf(' ') + 1)}
        </li>
      )
    } else if (line.trim() === "") {
      return <div key={index} className="h-2"></div>
    } else {
      return (
        <p key={index} className="text-[#403F4C]/80 mb-3">
          {line}
        </p>
      )
    }
  })

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-white p-0 border-0 shadow-2xl">
        <DialogHeader className="p-6 border-b border-[#EFBCD5]/30 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#3185FC] to-[#EFBCD5] rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-[#403F4C]">Session Notes</DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-[#F9DC5C] text-[#403F4C] border-0">{subject}</Badge>
              <Badge className="bg-[#3185FC] text-white border-0">AI-Generated</Badge>
            </div>
          </div>
          <div className="text-[#403F4C]/70 mt-1">{topic}</div>
        </DialogHeader>

        {/* Notes Content */}
        <div className="overflow-y-auto p-6 flex-grow">
          <div ref={notesRef} className="bg-white p-4 rounded-lg">
            {formattedNotes}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-6 border-t border-[#EFBCD5]/30 sticky bottom-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleCopyToClipboard}
              className="border-[#3185FC] text-[#3185FC] hover:bg-[#3185FC] hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </>
              )}
            </Button>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="bg-gradient-to-r from-[#3185FC] to-[#EFBCD5] hover:from-[#3185FC]/90 hover:to-[#EFBCD5]/90 text-white font-semibold"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NotesModal