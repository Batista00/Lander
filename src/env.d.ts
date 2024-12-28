/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_AI_API_KEY: string
  // más variables de entorno...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
