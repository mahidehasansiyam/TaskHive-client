import HeroSection from '@/Components/HomePage/Hero';
import Categories from '../../Components/HomePage/Categories';
import Features from '../../Components/HomePage/Feature';
import GetStart from '../../Components/HomePage/GetStart';
import HowItWorks from '../../Components/HomePage/HowItWorks';
import Stats from '../../Components/HomePage/Stats';

export default function Home() {
  return (
    <div className=" ">
      <HeroSection />
      <Stats />
      <HowItWorks />
      <Categories />
      <Features />
      <GetStart />
     
    </div>
  );
}
