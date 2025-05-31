export function getScoreColor(score: number) {
  if (score >= 80) return "text-emerald-400"
  if (score >= 60) return "text-amber-400"
  return "text-red-400"
}

export function getScoreBg(score: number) {
  if (score >= 80) return "bg-emerald-400/10 border-emerald-400/20"
  if (score >= 60) return "bg-amber-400/10 border-amber-400/20"
  return "bg-red-400/10 border-red-400/20"
}
