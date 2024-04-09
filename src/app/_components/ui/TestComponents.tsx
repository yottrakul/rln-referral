export default async function TestComponents() {
  const users = await getProcessListAR("ACCEPT", 1, 1);
  // console.log(users);
  return <div>
    {users?.map((user) => {
      return <div key={user.id}>{user.id}</div>;
    })}
  </div>;
}
