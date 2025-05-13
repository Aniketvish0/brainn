
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-brain-DEFAULT to-brain-dark flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-lg font-semibold">BrainWave</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Your second brain powered by AI. Connect your digital life and query it with natural language.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-brain-DEFAULT" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brain-DEFAULT" aria-label="Github">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brain-DEFAULT" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brain-DEFAULT" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-brain-DEFAULT">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brain-DEFAULT">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brain-DEFAULT">Testimonials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brain-DEFAULT">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-brain-DEFAULT">About us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brain-DEFAULT">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brain-DEFAULT">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brain-DEFAULT">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-brain-DEFAULT">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brain-DEFAULT">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brain-DEFAULT">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brain-DEFAULT">Data Processing</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} BrainWave. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <select className="text-sm bg-white border border-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-brain-DEFAULT">
              <option>English (US)</option>
              <option>Español</option>
              <option>Français</option>
              <option>Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
