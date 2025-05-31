export interface McqResult {
  questionIndex: number
  question: string
  options: string[]
  userAnswer: string | null
  correctAnswer: string
  isCorrect: boolean
}

export interface WrittenResult {
  question: string
  answer: string
  score: number
  feedback: string
}

export interface TestResults {
  mcq: {
    results: McqResult[]
    score: number
  }
  written: {
    results: WrittenResult[]
    score: number
  }
}
