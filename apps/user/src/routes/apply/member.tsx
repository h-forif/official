import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/apply/member')({
  component: () => <div>Hello /apply/member!</div>
})