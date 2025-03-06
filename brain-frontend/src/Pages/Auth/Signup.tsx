import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/Button";
import { Brain } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useNavigate } from 'react-router-dom';
import { SparklesCore } from '@/components/magicui/sparkles';
import { Signupdata, signupUser } from '@/api/user/post';
import toast from 'react-hot-toast';

const containerVariants = {
    hidden: { opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
const itemVariants = {
    hidden: { y: 1, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
};

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [fullname , setfullname] = useState<string>("");
    const [email , setemail] = useState<string>("");
    const [password , setpassword] = useState<string>("");
    const [username , setusername] = useState<string>("");
    const [issigningup,setissigningup] = useState<boolean>(false); 
    const [firstname, lastname] = fullname.trim().split(' ');
    const signupdata : Signupdata  = {
        firstname,
        lastname,
        username,
        email,
        password,
    }
    const handlesubmit = async(e : React.FormEvent) =>{
        e.preventDefault();
        try {
            setissigningup(true)
            const response = await signupUser(signupdata);
            console.log(response);
            toast.success('Account created successfully!');
            navigate('/login');
            setissigningup(false)
        } catch (error) {
            console.log(error);
            throw error
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
          
          <div className="px-8 py-4">
            <motion.div 
              variants={itemVariants} 
              className="flex items-center justify-center"
            >
              <Brain className="text-blue-500 mr-2" size={28}/>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                Brainn
              </h1>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold py-4 text-center aurora-gradient"
            >
              Create Your Account
            </motion.h2>
            <motion.form 
              variants={itemVariants}
              className="space-y-3"
            >
              <motion.div 
                variants={itemVariants}
              >
                <label className="block mb-1 text-sm font-normal text-gray-700 dark:text-gray-300">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                             bg-white dark:bg-gray-900 
                             text-gray-900 dark:text-gray-100
                             focus:outline-none focus:ring-1 focus:ring-blue-900"
                  placeholder="Enter your full name"
                  value={fullname}
                  onChange={(e) => setfullname(e.target.value)} 
                />
              </motion.div>
              <motion.div 
                variants={itemVariants}
              >
                <label className="block mb-1 text-sm font-normal text-gray-700 dark:text-gray-300">Username</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                             bg-white dark:bg-gray-900 
                             text-gray-900 dark:text-gray-100
                             focus:outline-none focus:ring-1 focus:ring-blue-900"
                  placeholder="Enter your full name"
                  value={username}
                  onChange={(e) => setusername(e.target.value)} 
                />
              </motion.div>
              <div>
                <label className="block mb-1 text-sm font-normal text-gray-700 dark:text-gray-300">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                             bg-white dark:bg-gray-900 
                             text-gray-900 dark:text-gray-100
                             focus:outline-none focus:ring-1 focus:ring-blue-900"
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-normal text-gray-700 dark:text-gray-300">Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                             bg-white dark:bg-gray-900 
                             text-gray-900 dark:text-gray-100
                             focus:outline-none focus:ring-1 focus:ring-blue-900"
                  placeholder="Create a strong password" 
                  value={password}
                  onChange={(e)=>setpassword(e.target.value)}
                />
              </div>      
              <Button 
                className="w-full my-6 group hover:bg-gray-700/30"
                size="default"
                variant="secondary"
                onClick={handlesubmit}
              >
                {issigningup ? `Signing up..` : `Sign Up`}
              </Button>
            </motion.form>
            
            <motion.div 
              variants={itemVariants}
              className="text-center"
            >
              <p className="text-sm font-stretch-50% text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <button 
                  onClick={() => navigate('/login')}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Log In
                </button>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <div className="text-center mt-4 absolute bottom-4 text-sm text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Brainn. All rights reserved.
      </div>
    </div>
  </div>
    );
  };

  export default Signup;