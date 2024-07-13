import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/apply/member')({
  component: ApplyMember,
});

function ApplyMember() {
  return <div></div>;
}
