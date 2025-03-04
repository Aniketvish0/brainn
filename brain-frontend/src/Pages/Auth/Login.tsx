import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/Button";
import { Brain } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SparklesCore } from '@/components/magicui/sparkles';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/api/user/post';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [usernameoremail, setusernameoremail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [islogging, setislogging] = useState<boolean>(false)

  const handlesubmit = async() => {
      try {
        setislogging(true);
        const response = await loginUser(usernameoremail,password);
        console.log(response);
        setislogging(false);
      } catch (error) {
        console.error(error);
      }
  }
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#0f1117] ">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={10}
          className="w-full h-full"
          particleColor="#4f46e5"
          speed={0.5}
        />
      </div>
     <div className="relative z-10 w-full h-screen px-4 flex items-center justify-center flex-col">
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-sm"
    >
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden relative">
        <BorderBeam duration={8} size={150} />
        
        <div className="p-8">
          <motion.div 
            variants={itemVariants} 
            className="flex items-center justify-center mb-4"
          >
            <Brain className="text-blue-500 mr-2" size={28}/>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              Brainn
            </h1>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-bold mb-10 text-center aurora-gradient"
          >
            Welcome Back
          </motion.h2>  
          <motion.form 
            variants={itemVariants}
            className="space-y-3"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Username or Email</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                           bg-white dark:bg-gray-900 
                           text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com" 
                value={usernameoremail}
                onChange={(e) => setusernameoremail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                           bg-white dark:bg-gray-900 
                           text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password" 
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
              />
            </div>
            
            <div className="text-right">
              <a 
                href="#" 
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            
            <Button 
              className="w-full mt-4 group"
              size="lg"
              variant="secondary"
              onSubmit={handlesubmit}
            >
              {islogging ? `Logging In...` : `Log In`}
            </Button>
          </motion.form>
          
          <motion.div 
            variants={itemVariants}
            className="text-center mt-6"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/signup')}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Sign Up
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
      <div className="text-center absolute bottom-3 mt-6 text-sm text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Brainn. All rights reserved.
      </div>
    </div>
  </div>
  );
};

export default Login;