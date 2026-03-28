export const lightColors = {
  background: '#ffffff',
  foreground: '#0f172a',
  primary: '#6366f1',
  'primary-foreground': '#ffffff',
  secondary: '#f1f5f9',
  'secondary-foreground': '#0f172a',
  accent: '#e2e8f0',
  'accent-foreground': '#0f172a',
  muted: '#f8fafc',
  'muted-foreground': '#64748b',
  border: '#e2e8f0',
  ring: '#6366f1',
  destructive: '#ef4444',
  'destructive-foreground': '#ffffff',
} as const satisfies Record<string, string>

export const darkColors = {
  background: '#0f172a',
  foreground: '#f8fafc',
  primary: '#818cf8',
  'primary-foreground': '#0f172a',
  secondary: '#1e293b',
  'secondary-foreground': '#f8fafc',
  accent: '#334155',
  'accent-foreground': '#f8fafc',
  muted: '#1e293b',
  'muted-foreground': '#94a3b8',
  border: '#334155',
  ring: '#818cf8',
  destructive: '#f87171',
  'destructive-foreground': '#0f172a',
} as const satisfies Record<string, string>

export const colors = {
  light: lightColors,
  dark: darkColors,
} as const
