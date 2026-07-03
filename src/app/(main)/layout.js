import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";



const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      <main className="flex-1 bg-[#fafafa] text-black">{children}</main>
      <Footer></Footer>
     
    </div>
  );
};

export default MainLayout;