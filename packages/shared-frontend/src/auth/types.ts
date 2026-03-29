import type { ReactNode } from 'react'

export interface SignInFormProps {
  /** Called on email sign-in submit. Return null on success (wrapper navigates first), error string on failure. */
  onEmailSignIn: (email: string, password: string) => Promise<string | null>
  /** Called on Google sign-in tap. Same null/error-string contract. */
  onGoogleSignIn: () => Promise<string | null>
  /** Called when user taps "Create account" footer link. */
  onNavigateToSignUp: () => void
  /**
   * Google logo node. Pass the <svg> element on web. Omit on mobile (text-only button rendered).
   * @example <svg width="18" height="18" viewBox="0 0 18 18">…</svg>
   */
  googleIcon?: ReactNode
}

export interface SignUpFormProps {
  /** Called on email sign-up submit. Includes name field. Return null on success, error string on failure. */
  onEmailSignUp: (name: string, email: string, password: string) => Promise<string | null>
  /** Called on Google sign-up tap. Same contract. */
  onGoogleSignUp: () => Promise<string | null>
  /** Called when user taps "Already have an account? Sign in" footer link. */
  onNavigateToSignIn: () => void
  /** Google logo node (optional — same as SignInFormProps.googleIcon). */
  googleIcon?: ReactNode
}
