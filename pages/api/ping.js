export default function (_req, res) {
  setTimeout(() => res.end('pong'), 1000)
}
