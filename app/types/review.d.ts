export interface SectionFeedback {
  positives: string[]
  critiques: string[]
  improvements: string[]
  score: number
}

export interface ReviewData {
  overallScore?: number
  strengths?: string[]
  areasForImprovement?: string[]
  specificRecommendations?: string[]
  detailedFeedback?: {
    clarityAndReadability?: SectionFeedback
    contentQuality?: SectionFeedback
    technicalSkills?: SectionFeedback
    experienceRelevance?: SectionFeedback
    educationAndCerts?: SectionFeedback
    keywordOptimization?: SectionFeedback
    customizationForTargetRoles?: SectionFeedback
    errorChecking?: SectionFeedback
  }
}

