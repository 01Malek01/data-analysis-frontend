import { Button, Card } from "antd";
import GradientButton from "../../components/UI/GradientButton";
import "./Home.css";
import { motion, oceanview } from "framer-motion";
import { useRef } from "react";
import Footer from "../../components/Footer";
import { PiPlugsConnectedLight } from "react-icons/pi";
import { TbAnalyze } from "react-icons/tb";
import { FaChartBar } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const featureCards = [
    {
      title: "Real-Time Data Integration",
      desc: "Seamlessly connect to various data sources in real-time, ensuring that your insights are always based on the most current and accurate information available. With real-time data integration, you can make informed decisions swiftly and confidently, reacting to changes as they happen. No more waiting for outdated reports—stay ahead of the curve with up-to-the-minute data at your fingertips.",
      imgSrc: "/assets/images/_8c21aa4c-5fe3-402d-be0a-cfd2c10e4113.jpg",
    },
    {
      title: "Customizable Dashboards",
      desc: "Tailor your dashboards to meet your unique needs with our highly customizable dashboard options. Choose from a variety of widgets and layouts to display the most relevant data for your business. Whether you need a high-level overview or detailed drill-downs, our customizable dashboards provide the flexibility and clarity you need to visualize your data exactly the way you want.",
      imgSrc: "/assets/images/_1b9d9033-06cd-4a22-8e58-7bb2010c695a.jpg",
    },
    {
      title: "Advanced Analytics",
      desc: "Leverage powerful algorithms and analytical tools to uncover trends, patterns, and correlations within your data. Our advanced analytics capabilities allow you to dive deep into your data, perform complex calculations, and generate predictive models. Turn raw data into actionable insights that drive strategic decision-making and give your business a competitive edge.",
      imgSrc: "/assets/images/_890cdfa7-a639-45b5-ba46-b6e00bd72493.jpg",
    },
    {
      title: "Secure Data Handling",
      desc: "Protect your data with our top-tier security measures. Our platform ensures that your sensitive information is handled with the utmost care and stored securely. With features like data encryption, user authentication, and access controls, you can trust that your data is safe from unauthorized access and breaches. Focus on your analysis with peace of mind, knowing that your data is secure with us.",
      imgSrc: "/assets/images/_4625045a-a401-4253-9d21-b33ea7beaab9.jpg",
    },
  ];

  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: true });
  const howItWorksRef = useRef(null);
  const pricingRef = useRef(null);
  const aboutUsRef = useRef(null);

  const howItWorksInView = useInView(howItWorksRef, { once: true });
  const pricingInView = useInView(pricingRef, { once: true });
  const aboutUsInView = useInView(aboutUsRef, { once: true });
  return (
    <div className="home-wrapper dark:bg-slate-800 dark:text-white">
      <div className="home-container h-full flex flex-col">
        {/* Hero Section */}
        <div className="hero flex items-center justify-center">
          <div className="intro flex flex-col items-center gap-5 rounded">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              exit={{ opacity: 0 }}
              className="md:text-6xl text-4xl text-center text-white dark:text-white"
            >
              Your Ultimate Data Analysis Companion
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              exit={{ opacity: 0 }}
              className="text-slate-300 text-md text-center md:text-2xl tracking-wide dark:text-slate-300"
            >
              Unlock the Power of Your Data with Malek's Data Analysis!
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 47 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.8 }}
              exit={{ opacity: 0 }}
              className="mt-5"
            >
              <GradientButton
                onClick={() =>
                  isAuthenticated ? navigate("/dashboard") : loginWithRedirect()
                }
                title="Get Started"
              />
            </motion.div>
          </div>
        </div>
        {/* Features Section */}
        <motion.div
          whileInView={{ backgroundColor: "#4592FF" }}
          transition={{ duration: 1, delay: 0.2 }}
          ref={featuresRef}
          className="features flex flex-col justify-center items-center gap-6 py-5 pb-8 md:h-screen dark:bg-slate-800"
        >
          {/*ADD A VIDEO ILLUSTRATION AFTER FINISHING THE  app */}
          <h2 className="text-4xl font-bold text-gray-800 m-5 mb-10 text-center dark:text-white">
            Features
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center justify-center">
            {featureCards.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 * (index + 1) }}
                className={`feature w-full md:h-[10rem] md:mb-5 px-3`}
              >
                <Card className="bg-slate-100 dark:bg-slate-800 dark:text-white">
                  <div className="content flex flex-row gap-3">
                    <div className="flex flex-col gap-2">
                      <span className="feature-title font-bold text-blue-700 text-xl dark:text-blue-400">
                        {feature.title}
                      </span>
                      <span className="feature-desc text-[12px] tracking-tight">
                        {feature.desc}
                      </span>
                    </div>
                    <div className="f-image w-full">
                      <img
                        className="size-[120px] rounded-full hidden md:block"
                        src={feature.imgSrc}
                        alt="illustration"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Section */}
        <div
          ref={howItWorksRef}
          className="how-it-works bg-white py-12 dark:bg-slate-800 dark:text-white"
        >
          <div className="container mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: howItWorksInView ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="md:text-4xl text-3xl font-bold mb-8 text-gray-800 dark:text-white"
            >
              How It Works
            </motion.h2>
            <div className="flex justify-center gap-6 flex-col md:flex-row items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: howItWorksInView ? 1 : 0,
                  scale: howItWorksInView ? 1 : 0.8,
                }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="md:w-1/4 w-full px-2 step"
              >
                <Card className="bg-slate-100 dark:bg-slate-700 dark:text-white md:h-[12rem]">
                  <span className="flex items-center justify-center mb-2">
                    <PiPlugsConnectedLight size={40} color="#4592FF" />
                  </span>
                  <h3 className="font-bold mb-2 text-xl">Step 1: Connect</h3>
                  <p className="text-gray-600 dark:text-slate-300">
                    Connect your data sources quickly and easily.
                  </p>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: howItWorksInView ? 1 : 0,
                  scale: howItWorksInView ? 1 : 0.8,
                }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="md:w-1/4 w-full px-2 step"
              >
                <Card className="bg-slate-100 dark:bg-slate-700 dark:text-white md:h-[12rem]">
                  <span className="flex items-center justify-center mb-2">
                    <TbAnalyze size={40} color="#4592FF" />
                  </span>
                  <h3 className="font-bold mb-2 text-xl">Step 2: Analyze</h3>
                  <p className="text-gray-600 dark:text-slate-300">
                    Analyze your data with powerful tools.
                  </p>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: howItWorksInView ? 1 : 0,
                  scale: howItWorksInView ? 1 : 0.8,
                }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="md:w-1/4 w-full px-2 step"
              >
                <Card className="bg-slate-100 dark:bg-slate-700 dark:text-white md:h-[12rem]">
                  <span className="flex items-center justify-center mb-2">
                    <FaChartBar size={40} color="#4592FF" />
                  </span>
                  <h3 className="font-bold mb-2 text-xl">Step 3: Visualize</h3>
                  <p className="text-gray-600 dark:text-slate-300">
                    Visualize your data insights in real-time.
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={pricingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          ref={pricingRef}
          className="pricing-section py-12 dark:bg-slate-800 dark:text-white"
        >
          <h2 className="text-center font-bold text-3xl md:text-4xl mb-8 text-gray-800 dark:text-white">
            Pricing
          </h2>
          <div className="flex justify-center gap-6 flex-col md:flex-row items-center">
            <Card className="bg-slate-100 dark:bg-slate-700 dark:text-white md:w-1/3 w-full">
              <h3 className="font-bold text-2xl mb-2">Basic</h3>
              <p className="text-gray-600 dark:text-slate-300">Free forever.</p>
              <Button type="primary" className="mt-4">
                Get Started
              </Button>
            </Card>
            <Card className="bg-slate-100 dark:bg-slate-700 dark:text-white md:w-1/3 w-full">
              <h3 className="font-bold text-2xl mb-2">Pro</h3>
              <p className="text-gray-600 dark:text-slate-300">$29.99/month.</p>
              <Button type="primary" className="mt-4">
                Get Started
              </Button>
            </Card>
            <Card className="bg-slate-100 dark:bg-slate-700 dark:text-white md:w-1/3 w-full">
              <h3 className="font-bold text-2xl mb-2">Enterprise</h3>
              <p className="text-gray-600 dark:text-slate-300">
                Contact us for pricing.
              </p>
              <Button type="primary" className="mt-4">
                Contact Us
              </Button>
            </Card>
          </div>
        </motion.div>

        {/* About Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={aboutUsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          ref={aboutUsRef}
          className="about-us py-12 dark:bg-slate-800 dark:text-white"
        >
          <h2 className="text-center font-bold text-3xl md:text-4xl mb-8 text-gray-800 dark:text-white">
            About Us
          </h2>
          <div className="flex justify-center gap-6 flex-col md:flex-row items-center">
            <Card className="bg-slate-100 dark:bg-slate-700 dark:text-white md:w-1/3 w-full">
              <h3 className="font-bold text-2xl mb-2">Our Mission</h3>
              <p className="text-gray-600 dark:text-slate-300">
                To empower businesses with data-driven insights.
              </p>
            </Card>
            <Card className="bg-slate-100 dark:bg-slate-700 dark:text-white md:w-1/3 w-full">
              <h3 className="font-bold text-2xl mb-2">Our Vision</h3>
              <p className="text-gray-600 dark:text-slate-300">
                To be the leading platform for data analysis.
              </p>
            </Card>
            <Card className="bg-slate-100 dark:bg-slate-700 dark:text-white md:w-1/3 w-full">
              <h3 className="font-bold text-2xl mb-2">Our Values</h3>
              <p className="text-gray-600 dark:text-slate-300">
                Innovation, Integrity, Customer Focus.
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
