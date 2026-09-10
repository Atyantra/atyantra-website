import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/ContactForm'

describe('ContactForm', () => {
  it('disables submit until name, valid email, and message are present', async () => {
    const user = userEvent.setup()
    render(<ContactForm to="contact@atyantra.io" />)
    const submit = screen.getByRole('button', { name: /send/i })
    expect(submit).toBeDisabled()
    await user.type(screen.getByLabelText(/name/i), 'Dana')
    await user.type(screen.getByLabelText(/email/i), 'dana@acme.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello')
    expect(submit).toBeEnabled()
  })

  it('shows an error for a malformed email', async () => {
    const user = userEvent.setup()
    render(<ContactForm to="contact@atyantra.io" />)
    await user.type(screen.getByLabelText(/email/i), 'not-an-email')
    await user.tab()
    expect(screen.getByText(/valid email/i)).toBeInTheDocument()
  })
})
