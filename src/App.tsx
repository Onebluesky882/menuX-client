import "@/App.css";
import { Link } from "react-router-dom";
import { QrCode, Utensils, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <header className="relative py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Welcome to</span>
          <span className="block text-orange-600">MenuX</span>
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500 sm:max-w-3xl">
          Modernize your restaurant with our innovative dining solution. QR code
          ordering, real-time updates, and seamless management.
        </p>
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Button
            asChild
            size="lg"
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Link to="/dashboard">Restaurant Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="login">Try now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

const FeatureSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Revolutionize Your Restaurant Experience
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Everything you need to provide a modern dining experience for your
            customers.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<QrCode className="h-10 w-10 text-orange-500" />}
            title="Scan to Order"
            description="Customers scan QR codes at tables to view menu and place orders digitally"
          />
          <FeatureCard
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
            title="Menu Management"
            description="Easily update your menu items, prices, and daily promotions"
          />
          <FeatureCard
            icon={<LayoutDashboard className="h-10 w-10 text-orange-500" />}
            title="Real-time Dashboard"
            description="Monitor orders, table status, and restaurant performance in real-time"
          />
        </div>

        {/* Call-to-action buttons */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <ActionCard
            title="Scan to Order"
            description="Let customers order directly from their table"
            buttonText="Setup QR Codes"
            buttonLink="/tables"
            color="bg-gradient-to-r from-orange-400 to-orange-500"
          />
          <ActionCard
            title="Manage Tables"
            description="Customize and organize your restaurant layout"
            buttonText="Configure Tables"
            buttonLink="/tables"
            color="bg-gradient-to-r from-blue-400 to-blue-500"
          />
          <ActionCard
            title="View Dashboard"
            description="Check analytics and monitor restaurant performance"
            buttonText="Open Dashboard"
            buttonLink="/dashboard"
            color="bg-gradient-to-r from-teal-400 to-teal-500"
          />
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-2xl">
      <HeroSection />

      <FeatureSection />

      {/* Testimonial section */}
      <section className="py-16 bg-orange-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Trusted by Restaurant Owners
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              See how menuX is transforming the dining experience.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic">
                MenuX is a fullstack, real-time restaurant platform that helps
                restaurant owners manage daily operations, orders, income, and
                tables — all in one place. Customers can scan a QR code at their
                table to order food and track its status live.
              </p>
              <div className="mt-4 flex items-center">
                <span className="font-medium text-gray-900">Somchai P.</span>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-gray-500">
                  Owner, Thai Delight Restaurant
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-gray-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-white text-2xl font-bold">MenuX</h2>
              <p className="mt-2 text-gray-400">
                💡 What It Does For Restaurant Owners: Monitor orders, table
                usage, and income in real time Manage employees, menus, and
                table layouts View detailed order and customer analytics For
                Customers: Scan a QR code at the table to access the menu Place
                orders directly from their smartphone Receive live updates on
                food preparation and delivery status
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-medium mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 MenuX. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="relative p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
};

const ActionCard = ({
  title,
  description,
  buttonText,
  buttonLink,
  color,
}: {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  color: string;
}) => {
  return (
    <Card className={`overflow-hidden ${color} text-white`}>
      <CardContent className="p-6">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="mb-4 opacity-90">{description}</p>
        <Button
          asChild
          variant="secondary"
          className="w-full bg-white/20 hover:bg-white/30 text-white"
        >
          <Link to={buttonLink}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default App;
