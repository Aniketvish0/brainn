
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import HowItWorks from '../components/HowItWorks';
import DemoSection from '../components/DemoSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
    
    // Add intersection observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Only observe elements if they exist in the DOM
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (elements.length > 0) {
      elements.forEach((el) => observer.observe(el));
      
      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    }
    
    return undefined;
  }, []);
  
  return (
    <div className="overflow-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSection />
        <HowItWorks />
        <DemoSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
