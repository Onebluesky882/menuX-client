import Loader from "@/components/spinner/loader";
import useUsers from "@/hooks/useUsers";
import { schema, type LoginField } from "@/schema/loginField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LoginAuthGoogle from "../components/LoginAuthGoogle";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login, fetchProfile } = useUsers();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<LoginField>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginField) => {
    setLoading(true);

    try {
      if (!data.email || !data.password) {
        toast.error("Please fill in all required fields");
        return;
      }

      const result = await login(data);
      if (result?.success === true || result?.status === "success") {
        toast.success(result.message || "Login successful!");
        reset();
        await fetchProfile();
        navigate("/dashboard");
      } else if (result === false || result?.status === "error") {
        const errorMessage = result?.message || "Invalid email or password";
        toast.error(errorMessage);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 flex items-center justify-center bg-gray-100/50   from-white to-gray-100 rounded-sm">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-8 animate-fade-in">
        <LoginAuthGoogle title="LogIn With" />

        <h2 className="text-2xl font-bold my-6 text-gray-900 text-center tracking-tight">
          Sign in to your account
        </h2>
        <form className="relative space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-gray-50 text-gray-900 transition"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center px-4 py-2 bg-blue-600 ${
              loading && "bg-blue-600/50 hover:bg-blue-600/50 "
            } hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95`}
          >
            {loading ? (
              <>
                {" "}
                <Loader />
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>

        <FooterForm />
      </div>
    </div>
  );
};

const FooterForm = () => {
  return (
    <div className="mt-4 flex items-center gap-2">
      <Link
        to="/signup"
        className="text-md text-gray-500 hover:text-blue-500 transition-colors underline underline-offset-2 float-left"
      >
        Signup
      </Link>{" "}
      <Link
        to="#"
        className="text-sm text-gray-400 hover:text-blue-500 transition-colors underline underline-offset-2 float-left"
      >
        Forgot Password?
      </Link>
    </div>
  );
};
export default Login;
