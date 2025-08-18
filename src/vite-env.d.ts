/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_ENV: string
  readonly MODE: string
  readonly BASE_URL: string
  readonly PROD: boolean
  readonly DEV: boolean
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
