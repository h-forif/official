import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/apply/mentor')({
  component: () => <div>Hello /apply/mentor!</div>
})