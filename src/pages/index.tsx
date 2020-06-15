import { request } from 'graphql-request';
import useSWR from 'swr';
import { FindManyUserDocument } from 'generated';
import { print } from 'graphql/language/printer';

export default function Index() {
  const { data, error } = useSWR(print(FindManyUserDocument), (query) =>
    request('http://localhost:3000/api/graphql', query, {
      where: { email: { equals: 'ichen' } },
    })
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { findManyUser } = data;

  return (
    <div>
      {findManyUser.map((user, i) => (
        <div key={i}>{user.name}</div>
      ))}
    </div>
  );
}
