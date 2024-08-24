import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/subscription/file')({
  component: () => <div>Hello /subscription/file!</div>
})