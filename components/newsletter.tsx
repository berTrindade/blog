"use client"

import { useState, useEffect, type FormEvent } from "react"

function SpinnerIcon() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  // Auto-reset after success
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => setStatus("idle"), 2000)
      return () => clearTimeout(timer)
    }
  }, [status])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Failed to subscribe. Please try again.")
    }
  }

  return (
    <div className="newsletter-container">
      <h2 className="mb-6 text-lg font-medium leading-none dark:text-white">Newsletter</h2>
      <p className="mb-4 text-base leading-relaxed opacity-90">
        Get updates on new posts. No spam, unsubscribe at any time.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading"}
          className="flex-1 rounded-md border border-gray-400 bg-transparent px-4 py-2 text-sm outline-none transition-colors hover:border-gray-600 focus:border-gray-1000 disabled:opacity-50 dark:border-gray-700 dark:hover:border-gray-600 dark:focus:border-gray-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full cursor-pointer items-center justify-center rounded-md bg-black px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[100px] dark:bg-white dark:text-black"
        >
          {status === "loading" ? (
            <SpinnerIcon />
          ) : status === "success" ? (
            <CheckIcon />
          ) : (
            "Subscribe"
          )}
        </button>
      </form>

      {message && status === "error" && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">
          {message}
        </p>
      )}
    </div>
  )
}
