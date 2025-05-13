import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "@/lib/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain } from "lucide-react";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signupUser(formData);
      if (response.data.success) {
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error creating account");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg border border-border">
        <div className="text-center">
          <div className="flex justify-center">
            <Brain className="h-12 w-12 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign in
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="bg-background"
                />
              </div>
            </div>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="bg-background"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-background"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-background"
            />
          </div>

          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup; 