import { apiKey, apiBase } from "../../lib/tmdb"

export default async function handler (req, res) {
  let query = req.query.q;
  const result = await fetch(`${apiBase}/search/movie?api_key=${apiKey}&language=pt-BR&query=${query}`)
  const json = await result.json();
  res.status(200).json({
    list: json.results,
  })
}