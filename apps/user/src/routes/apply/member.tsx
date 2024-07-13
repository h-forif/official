import { useEffect } from 'react';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/apply/member')({
  component: ApplyMember,
});

const CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_OAUTH_CLIENT_SECRET;

function ApplyMember() {
  function handleCallback(res: any) {
    console.log(res.credential);
  }
  useEffect(() => {}, []);
  return (
    <div>
      <div id='signInDiv'></div>
    </div>
  );
}
