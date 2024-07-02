import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';

export const Route = createFileRoute('/studies/$studyId')({
  loader: ({ params }) => fetchSomething(params.studyId),
  component: StudyComponent,
});

function StudyComponent() {
  const loaderData = useLoaderData({ from: '/studies/$studyId' });
  console.log(loaderData);

  return <CenteredBox>{JSON.stringify(loaderData)}</CenteredBox>;
}

function fetchSomething(studyId: string) {
  console.log(studyId);

  fetch('https://jsonplaceholder.typicode.com/posts/1').then((res) => res.body);
}
