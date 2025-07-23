import { Button } from "@/components/ui/button";

const LoginAuthGoogle = ({ title }: { title: string }) => {
  const handleLogin = () => {
    window.location.assign("http://localhost:3000/auth/google");
  };

  return (
    <div className="flex justify-between flex-col border-b-2 py-5">
      <h1 className="text-2xl font-bold text-gray-800 text-center py-2">
        {title}
      </h1>
      <Button onClick={handleLogin}>Google</Button>
    </div>
  );
};
export default LoginAuthGoogle;
