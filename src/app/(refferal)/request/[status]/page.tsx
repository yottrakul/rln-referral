interface RequestParams {
  params: {
    status: string;
  };
}

// URL: http://localhost:3000/request/accept
// URL: http://localhost:3000/request/reject
// URL: http://localhost:3000/request/pending

export default function RquestPage({ params }: RequestParams) {
  return <div>{params.status}</div>;
}
