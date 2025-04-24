import { getCurrentSession } from "@/actions/auth";
import Header from "@/components/layout/Header";
import { json } from "stream/consumers";
export default async function Home() {

  const { user } = await getCurrentSession();
  return (
    <div>
      {JSON.stringify(user)}
    </div>
  );
}
