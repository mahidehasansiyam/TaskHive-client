import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";


export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user || null;
};

export const requireRole = async role => {
  const user = await getUserSession();
  console.log("You enter a dashbouard of :",user?.role);
  if (!user) {
    redirect('/auth/login');
  }
  if (user?.role !== role) {
    return redirect('/unauthorized');
  }
  return user;
};














