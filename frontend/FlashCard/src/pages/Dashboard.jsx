import { NavBarDash } from "../components/NavbarDash";
import {WelcomePage} from "../components/WelcomePage";
export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBarDash />
      <WelcomePage />
    </div>
  );
};
