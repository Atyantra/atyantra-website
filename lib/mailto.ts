export interface ContactInput { name: string; email: string; org: string; message: string }

export function buildMailto(to: string, input: ContactInput): string {
  const subject = `Talk to Us — ${input.org || input.name}`
  const body = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Organization: ${input.org}`,
    '',
    input.message,
  ].join('\n')
  const params = new URLSearchParams({ subject, body })
  // URLSearchParams encodes spaces as '+'; email clients want %20 in mailto bodies.
  return `mailto:${to}?${params.toString().replace(/\+/g, '%20')}`
}
