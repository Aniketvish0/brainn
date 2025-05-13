
import { ArrowRight, Check } from 'lucide-react';

const CTASection = () => {
  return (
    <section 
      id="get-started" 
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-brain-light/30 to-white"
    >
      <div className="absolute animate-subtle-rotate opacity-10 w-[150%] h-[150%] -top-1/4 -left-1/4">
        <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-brain-DEFAULT/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-brain-DEFAULT/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-brain-DEFAULT/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Your <span className="text-gradient">Second Brain</span>?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of knowledge workers who have transformed how they organize and retrieve information. Start connecting your digital life today.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Free 14-day trial with full features",
                "No credit card required to start",
                "Connect unlimited content sources",
                "AI-powered knowledge network",
                "Export your data anytime"
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brain-default/20 flex items-center justify-center mr-3">
                    <Check size={12} className="text-brain-default" />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brain-default text-white font-medium hover:bg-brain-dark transition-all transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl"
              >
                Get Started for Free
                <ArrowRight size={18} className="ml-2" />
              </a>
              
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 hover:border-brain-DEFAULT hover:text-brain-DEFAULT font-medium transition-all"
              >
                Book a Demo
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
              <h3 className="text-xl font-semibold mb-6">Sign up for early access</h3>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brain-DEFAULT"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brain-DEFAULT"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What content do you want to connect?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Twitter', 'YouTube', 'Notes', 'Web Links', 'Notion', 'Email'].map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`content-${index}`}
                          className="h-4 w-4 text-brain-DEFAULT focus:ring-brain-DEFAULT border-gray-300 rounded"
                        />
                        <label htmlFor={`content-${index}`} className="ml-2 text-sm text-gray-700">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brain-DEFAULT text-white font-medium hover:bg-brain-dark transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10">Join the Waitlist</span>
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
              
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-brain-DEFAULT/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brain-DEFAULT/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
