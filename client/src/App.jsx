import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import InstructorDashboard from "./pages/InstructorDashboard";
import CreateCourse from "./pages/CreateCourse";
import ManageLessons from "./pages/ManageLessons";
import AddLesson from "./pages/AddLesson";
import MyCourses from "./pages/MyCourses";
import EditCourse from "./pages/EditCourse";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentHistory from "./pages/PaymentHistory";
import Certificates from "./pages/Certificates";
import MyCertificates from "./pages/student/MyCertificates";
import VerifyCertificate from "./pages/student/VerifyCertificate";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-violet-100 ">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/courses"
            element={<Courses />}
          />
          <Route
            path="/courses/:id"
            element={<CourseDetail />}
          />
          <Route
            path="/my-courses"
            element={
              <PrivateRoute>
                <MyCourses />
              </PrivateRoute>
            }
          />
          <Route
            path="/instructor/courses/:id/edit"
            element={
              <PrivateRoute role="instructor">
                <EditCourse />
              </PrivateRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />
          <Route

            path="/checkout/:id"

            element={<Checkout />}

          />
          <Route

            path="/payment"

            element={

              <PrivateRoute>

                <Payment />

              </PrivateRoute>

            }

          />
          <Route
            path="/payment-success"
            element={
              <PrivateRoute>
                <PaymentSuccess />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment-history"
            element={
              <PrivateRoute>
                <PaymentHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/certificates"

            element={

              <PrivateRoute>

                <Certificates />

              </PrivateRoute>

            }

          />




          <Route

            path="/my-certificates"

            element={

              <PrivateRoute>

                <MyCertificates />

              </PrivateRoute>

            }

          />



          <Route

            path="/verify/:certificateId"

            element={<VerifyCertificate />}

          />


          <Route

            path="/instructor"

            element={

              <PrivateRoute role="instructor">

                <InstructorDashboard />

              </PrivateRoute>

            }

          />





          <Route

            path="/instructor/new"

            element={

              <PrivateRoute role="instructor">

                <CreateCourse />

              </PrivateRoute>

            }

          />





          <Route

            path="/instructor/courses/:id/lessons"

            element={

              <PrivateRoute role="instructor">

                <ManageLessons />

              </PrivateRoute>

            }

          />






          <Route

            path="/instructor/courses/:id/lessons/add"

            element={

              <PrivateRoute role="instructor">

                <AddLesson />

              </PrivateRoute>

            }

          />

          <Route

            path="*"

            element={


              <div className="
min-h-[70vh]
flex
items-center
justify-center
">


                <h1 className="
text-3xl
font-bold
text-red-600
">
                  404 - Page Not Found
                </h1>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}