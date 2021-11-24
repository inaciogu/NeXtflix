import { apiKey, apiBase } from "../../../lib/tmdb"

export default async function handler (req, res) {
  const getId = req.query.id
  const result = await fetch(`${apiBase}/movie/${getId}?api_key=${apiKey}&language=pt-BR`)
  const json = await result.json();
  res.status(200).json({
    info: json,
  })
}