import { getRequest } from "@/app/_actions/request/actions";
import RequestManage from "@/app/_components/ui/request/manage/RequestManage";
import Error from "@/app/_components/ui/error/ErrorHandleUI";
interface RequestParams {
  params: {
    id: string;
  };
}

// URL: http://localhost:3000/request/accept
// URL: http://localhost:3000/request/reject
// URL: http://localhost:3000/request/pending

export default async function RequestPage({ params }: RequestParams) {
  const request = await getRequest(params.id);

  if (request) {
    return (
      <div>
        <RequestManage caseData={request} />
      </div>
    );
  }

  return (
    <div>
      <Error msg="ไม่พบ Case ID" />
    </div>
  );
}
