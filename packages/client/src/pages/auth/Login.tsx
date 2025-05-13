import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/lib/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData.usernameOrEmail, formData.password);
      if (response.data.success) {
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error logging in");
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign up
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type="text"
              name="usernameOrEmail"
              placeholder="Username or Email"
              value={formData.usernameOrEmail}
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-muted-foreground"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-primary hover:text-primary/90"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login; 