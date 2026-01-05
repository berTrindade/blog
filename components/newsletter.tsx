"use client"

import { useState, type FormEvent } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

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
        setMessage("Thanks for subscribing!")
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
        Get updates on new posts and projects. No spam, unsubscribe at any time.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="btrindadedeabreu@gmail.com"
          required
          disabled={status === "loading"}
          className="flex-1 rounded-md border border-gray-400 bg-transparent px-4 py-2 text-sm outline-none transition-colors hover:border-gray-600 focus:border-gray-1000 disabled:opacity-50 dark:border-gray-700 dark:hover:border-gray-600 dark:focus:border-gray-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-md bg-black px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>

      {message && (
        <p className={`mt-3 text-sm ${status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
          {message}
        </p>
      )}
    </div>
  )
}
