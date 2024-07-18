import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/profile/study')({
  component: () => <div>Hello /profile/study!</div>
})