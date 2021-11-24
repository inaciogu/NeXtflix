import { apiKey, apiBase } from "../../lib/tmdb"

export default async function handler (req, res) {
  const result = await fetch(`${apiBase}/genre/movie/list?api_key=${apiKey}&language=pt-BR`)
  const json = await result.json();
  res.status(200).json({
    list: json.genres,
  })
}