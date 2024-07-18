import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/profile/account')({
  component: () => <div>Hello /profile/account!</div>
})