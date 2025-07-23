import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../../ui/button";
import { BarChart3, Plus, Store, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUser";

const QuickOpenShop = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const handleSubmitNewShop = () => {
    if (user) {
      navigate("/shops/create");
    } else {
      navigate("/login", { state: location.pathname });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-12 mt-1">
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800">
            Quick Actions
          </CardTitle>
          <CardDescription>
            Get started by adding your first store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleSubmitNewShop}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2 animate-bounce" />
            Add New Store
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export const FeatureGrid = () => {
  return (
    <div className="mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Store className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl text-slate-800">
              Multi-Store Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-center">
              Manage retail shops, restaurants, and bars from a single dashboard
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl text-slate-800">
              Analytics & Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-center">
              Track performance and get insights across all your business
              locations
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl text-slate-800">
              Team Collaboration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-center">
              Collaborate with your team and manage staff across all locations
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default QuickOpenShop;
