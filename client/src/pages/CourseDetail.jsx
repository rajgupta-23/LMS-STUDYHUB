import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { generateCertificate } from "../services/certificateApi";
const SERVER_URL = "http://localhost:5000";
export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [lessonLoading, setLessonLoading] = useState(null);
  const [certificateLoading, setCertificateLoading] = useState(false);
  const course = data?.course || {};
  const lessons = data?.lessons || [];
  const isPaid = enrollment !== null;
  const getFileUrl = (file) => {
    if (!file) return "";
    if (file.startsWith("http"))
      return file;
    return `${SERVER_URL}${file.startsWith("/")
      ? file
      : "/" + file
      }`;

  };
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  const loadCourse = useCallback(async () => {
    try {
      const res = await api.get(
        `/courses/${id}`
      );
      setData(res.data);
      setError("");

    }
    catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
        "Course not found"
      );
    }
  }, [id]);
  const loadEnrollment = useCallback(async () => {
    if (
      !user ||
      user.role !== "student"
    ) {
      setEnrollment(null);
      return;
    }
    try {
      const res =
        await api.get(
          "/enrollments/mine"
        );
      const list =
        Array.isArray(res.data)
          ?
          res.data
          :
          res.data.enrollments || [];
      const current =
        list.find(item =>
          String(item.course?._id)
          ===
          String(id)
        );
      setEnrollment(
        current || null
      );


    }
    catch (err) {

      console.log(err);

      setEnrollment(null);

    }



  }, [id, user]);





  const refreshData =
    useCallback(async () => {

      setLoading(true);

      await loadCourse();

      await loadEnrollment();

      setLoading(false);


    }, [
      loadCourse,
      loadEnrollment
    ]);
  useEffect(() => {
    refreshData();
  }, [refreshData]);
  const progress =
    Math.min(
      Number(enrollment?.progress || 0),
      100
    );
  const completeLesson = async (lessonId) => {
    try {
      setLessonLoading(lessonId);
      await api.post(
        "/enrollments/complete-lesson",
        {
          courseId: id,
          lessonId
        }
      );
      await loadEnrollment();
      showMessage(
        "Lesson completed successfully"
      );
    }
    catch (err) {
      console.log(err);
      showMessage(
        "Lesson completion failed"
      );
    }
    finally {
      setLessonLoading(null);
    }
  };
  const handlePayment = async () => {
    try {
      const { data } =
        await api.post(
          "/payment/create-order",
          {
            courseId: id
          }
        );
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "StudyHub LMS",
        order_id: data.order.id,
        handler: async function (response) {
          await api.post(
            "/payment/verify",
            {
              razorpay_order_id:
                response.razorpay_order_id,
              razorpay_payment_id:
                response.razorpay_payment_id,
              razorpay_signature:
                response.razorpay_signature,
              paymentMongoId:
                data.paymentId
            }
          );
          showMessage(
            "Payment Successful"
          );
          await loadEnrollment();
        }
      };
      const razorpay =
        new window.Razorpay(options);
      razorpay.open();
    }
    catch (err) {
      console.log(err);
      showMessage(
        "Payment Failed"
      );
    }
  };
  const canGenerateCertificate = () => {
    return (
      enrollment &&
      Number(enrollment.progress) >= 100
    );
  };
  const handleCertificate = async () => {
    try {
      setCertificateLoading(true);
      const res =
        await generateCertificate(
          course._id
        );
      showMessage(
        "Certificate Generated"
      );
      if (
        res.certificate?.pdfUrl
      ) {

        window.open(
          getFileUrl(
            res.certificate.pdfUrl
          ),
          "_blank"
        );

      }
    }
    catch (err) {
      console.log(err);
      showMessage(
        "Certificate Failed"
      );
    }
    finally {
      setCertificateLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Course...
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-10 text-center text-red-600">
        {error}
      </div>
    );
  }
  return (

    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {
          message &&
          <div className="mb-5 bg-green-100 text-green-700 p-4 rounded-xl">
            {message}
          </div>
        }
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 overflow-hidden">
          <span className="inline-flex items-center bg-indigo-50 text-indigo-700 px-5 py-2 rounded-full font-semibold shadow-sm">
            {course.category || "Course"}
          </span>
          <h1 className="text-5xl font-extrabold mt-5 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {course.title}
          </h1>
          <p className="mt-3 text-gray-600">
            By {course.instructor?.name || "Instructor"}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-5xl">
            {course.description}
          </p>
          {
            course.thumbnail &&
            <img
              src={getFileUrl(course.thumbnail)}
              className="w-full h-[450px] object-cover rounded-3xl mt-10 shadow-2xl hover:scale-[1.02] transition duration-500"
            />
          }
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <h3 className="font-bold text-xl">
                12+
              </h3>
              <p className="text-gray-500">
                Lessons
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <h3 className="font-bold text-xl">
                10 hrs
              </h3>
              <p className="text-gray-500">
                Duration
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <h3 className="font-bold text-xl">
                ⭐ 4.8
              </h3>
              <p className="text-gray-500">
                Rating
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <h3 className="font-bold text-xl">
                Certificate
              </h3>
              <p className="text-gray-500">
                Included
              </p>
            </div>
          </div>
          {
            user?.role === "student" &&
            !enrollment &&
            <button
              onClick={() => navigate(`/checkout/${course._id}`)}
              className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl"
            >
              Enroll Now ₹{course.price}
            </button>
          }
          {
            enrollment &&
            <button
              disabled
              className="mt-8 bg-green-600 text-white px-8 py-3 rounded-xl"
            >
              Enrolled
            </button>
          }
          {
            enrollment &&
            <div className="mt-8">
              <div className="flex justify-between">
                <span>
                  Progress
                </span>
                <b>
                  {progress}%
                </b>
              </div>
              <div className="h-3 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-3 bg-green-600 rounded-full"
                  style={{
                    width: `${progress}%`
                  }}
                />
              </div>
            </div>
          }
          {
            canGenerateCertificate() &&
            <button
              onClick={handleCertificate}
              disabled={certificateLoading}
              className="mt-8 bg-purple-600 text-white px-8 py-3 rounded-xl"
            >
              {
                certificateLoading
                  ?
                  "Generating..."
                  :
                  "🎓 Generate Certificate"
              }
            </button>
          }
        </div>
        <div className="bg-white mt-10 rounded-3xl shadow p-8">
          <h2 className="text-3xl font-bold mb-8">
            Course Lessons
          </h2>
          {
            lessons.map((lesson, index) => {
              const canWatch =
                index === 0 || isPaid;
              return (
                <div key={lesson._id}
                  className="bg-gray-50 border border-gray-200 rounded-3xl p-7 mb-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-bold">
                    Lesson {index + 1}: {lesson.title}
                  </h3>
                  <p className="mt-3 text-gray-600">
                    {lesson.content}
                  </p>
                  {
                    canWatch ?
                      <video
                        controls
                        className="w-full rounded-3xl shadow-xl bg-black">
                        <source
                          src={getFileUrl(lesson.videoUrl)}
                          type="video/mp4"
                        />
                      </video>

                      :

                      <div className="mt-5 bg-gray-100 p-8 rounded-xl text-center">
                        <h3 className="text-xl font-bold">
                          Locked Lesson
                        </h3>
                        <p>
                          Purchase this course to watch
                        </p>


                        <button

                          onClick={() => navigate(`/checkout/${course._id}`)}

                          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-xl"

                        >

                          Unlock Course

                        </button>



                      </div>


                  }






                  {

                    enrollment &&
                    canWatch &&


                    <button

                      onClick={() => completeLesson(lesson._id)}

                      disabled={
                        lessonLoading === lesson._id
                      }


                      className="mt-5 bg-green-600 text-white px-5 py-2 rounded-xl"

                    >


                      {
                        lessonLoading === lesson._id
                          ?
                          "Saving..."
                          :
                          "Mark Complete"
                      }


                    </button>


                  }



                </div>


              )


            })

          }



        </div>



      </div>


    </div>


  );


}