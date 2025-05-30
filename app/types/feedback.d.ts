export interface DetailedFeedbackProps {
  feedback: any
  expandedSections: { [key: string]: boolean }
  toggleSection: (section: string) => void
}