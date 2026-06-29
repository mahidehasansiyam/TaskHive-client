import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user || null;
};


// Use in only server component. for client component -->
// const { data: session, isPending } = authClient.useSession();






