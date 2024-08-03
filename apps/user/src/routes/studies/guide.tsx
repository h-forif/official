import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/studies/guide')({
  component: () => <div>Hello /studies/guide!</div>,
});
