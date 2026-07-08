import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



const MainLayout = async ({ children }) => {
   const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div>
      <Navbar initialSession={session}></Navbar>
      <main className="flex-1 bg-[#fafafa] text-black">{children}</main>
      <Footer></Footer>
     
    </div>
  );
};

export default MainLayout;