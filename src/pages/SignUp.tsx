import { useEffect, useState } from "react";
import LoginAuthGoogle from "../components/LoginAuthGoogle";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import BeatLoader from "react-spinners/BeatLoader";
import useUsers from "@/hooks/useUsers";
import { schema } from "@/schema/signUpField";
import { userApi } from "@/Api/user.api";

type CreateUserDto = {
  email: string;
  username: string;
  password: string;
  emailVerified: boolean;
};

const SignUp = () => {
  const navigator = useNavigate();
  const [user, setUser] = useState<CreateUserDto>();
  const [loading, setLoading] = useState(false);

  const { fetchProfile } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true);
    const { confirmPassword, ...userWithoutConfirm } = data;

    const userWithEmailVerified: CreateUserDto = {
      ...userWithoutConfirm,
      emailVerified: false,
    };

    setUser(userWithEmailVerified);
  };

  useEffect(() => {
    const insertNewUser = async () => {
      if (!user) return;
      try {
        const newUser = await userApi.create(user);
        await fetchProfile();
        return { success: true, data: newUser };
      } catch (error) {
        console.error("Registration failed:", error);
      } finally {
        setLoading(false);
        await navigator("/dashboard");
      }
    };
    insertNewUser();
  }, [user]);

  return (
    <div className="py-10 flex items-center justify-center bg-gradient-to-b from-white to-gray-100 rounded-sm">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-8 animate-fade-in">
        <LoginAuthGoogle title="Register With" />

        <h2 className="text-2xl font-bold my-6 text-gray-900 text-center tracking-tight">
          Register Account
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition"
              placeholder="you@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm"></p>}
          </div>
          <div>
            <label
              htmlFor="Name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              id="name"
              autoComplete="username"
              className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition"
              placeholder="name"
            />
            {errors.username && <p className="text-red-500 text-sm">{}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-sm">{}</p>}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm"></p>}
          </div>
          <button
            disabled={loading}
            type="submit"
            className={`w-full flex justify-center items-center gap-2 px-4 py-2 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95 ${
              loading ? "bg-blue-500/50" : "bg-blue-600"
            }`}
          >
            {loading && <BeatLoader size={8} color="white" />}
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <ForgetPassword />
      </div>
    </div>
  );
};

const ForgetPassword = () => {
  return (
    <div className="mt-4 flex items-center gap-2">
      <Link
        to="/login"
        className="text-md text-gray-500 hover:text-blue-500 transition-colors underline underline-offset-2"
      >
        Login
      </Link>
      <Link
        to="#"
        className="text-sm text-gray-400 hover:text-blue-500 transition-colors underline underline-offset-2"
      >
        Forgot Password?
      </Link>
    </div>
  );
};

export default SignUp;
