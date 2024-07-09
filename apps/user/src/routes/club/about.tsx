import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/club/about')({
  component: () => <div>Hello /club/about!</div>
})