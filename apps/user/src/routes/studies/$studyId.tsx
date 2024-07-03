import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/studies/$studyId')({
  loader: ({ params }) => fetchSomething(params.studyId),
  component: StudyComponent,
});

function StudyComponent() {
  const params = Route.useParams();

  return (
    <CenteredBox sx={{ height: '100vh', fontSize: '50pt' }}>
      {params.studyId}
    </CenteredBox>
  );
}

function fetchSomething(studyId: string) {
  console.log(studyId);

  fetch('https://jsonplaceholder.typicode.com/posts/1').then((res) => res.body);
}
