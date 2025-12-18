import DashboardContent from "../landingPage/DashboardContent";
import "../styles/Dashboard.css";
import Sidebar from '../landingPage/Sidebar';
import TopNavbar from '../landingPage/TopNavbar';

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
     <Sidebar />

      <div className="dashboard-main">
        <section className="navbar">
          <TopNavbar />
        </section>

        {/* Background Video Section */}
        <section className="dashboard-content video-section">
          <video
            className="background-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="/dashboardPage/StudentPage.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Content on top of video */}
          <div className="video-overlay-content">
            <DashboardContent />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
