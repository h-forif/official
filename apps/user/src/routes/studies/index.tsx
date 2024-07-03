import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/studies/')({
  component: StudiesPage,
});

function StudiesPage() {
  return <CenteredBox>HI THERE!</CenteredBox>;
}
