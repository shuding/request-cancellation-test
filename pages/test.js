import { useEffect } from 'react'

export default function Test() {
  useEffect(() => {
    fetch('/api/ping').catch((error) => {
      console.error(error)
      if (!window.parent) return
      window.parent.postMessage({
        from: 'request-cancellation-test',
        toString: error.toString(),
        name: error.name,
        message: error.message,
        constructor: error.constructor.name,
        stack: error.stack,
      })
    })
    setTimeout(() => (location.href = 'https://example.com'), 10)
  }, [])

  return <div>Test</div>
}
