export function getEnvVariable(name: string, defaultValue?: string) {
  const value = process.env[name] || defaultValue
  if (!value) throw new Error(`environment variable: ${name} was not got.`)
  return value
}
