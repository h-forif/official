import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/profile/certificate')({
  component: () => <div>Hello /profile/certification!</div>
})