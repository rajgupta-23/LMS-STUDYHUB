import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FaVideo, FaArrowLeft, FaUpload } from "react-icons/fa";



export default function AddLesson() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [order, setOrder] = useState(1);
    const [video, setVideo] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleVideo = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 100 * 1024 * 1024) {
                alert(
                    "Video size should be less than 100MB"
                );
                return;
            }
            setVideo(file);
            setPreview(
                URL.createObjectURL(file)
            );
        }
    };
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        }
    }, [preview]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert(
                "Please enter lesson title"
            );
            return;
        }
        if (!video) {

            alert(
                "Please select video"
            );
            return;
        }
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append(
                "title",
                title
            );


            formData.append(
                "content",
                content
            );


            formData.append(
                "order",
                order
            );


            formData.append(
                "video",
                video
            );
            await api.post(
                `/lessons/course/${id}`,
                formData
            );
            alert(
                "Lesson Added Successfully"
            );
            navigate(
                `/courses/${id}`
            );
        }
        catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Failed to add lesson"
            );
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">
            <div className="
max-w-2xl mx-auto
bg-white rounded-3xl
shadow-xl p-8
">
                <button
                    onClick={() => navigate(-1)}
                    className="
flex items-center gap-2
text-indigo-600 mb-5
"
                >
                    <FaArrowLeft />
                    Back
                </button>
                <h1 className="
text-3xl font-bold mb-2
">
                    Add New Lesson
                </h1>
                <p className="
text-gray-500 mb-8
">
                    Upload a video lesson for your course
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="font-semibold">
                            Lesson Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="React Introduction"
                            className="
w-full mt-2
border rounded-xl
p-3
focus:ring-2
focus:ring-indigo-500
"
                        />
                    </div>
                    <div>
                        <label className="font-semibold">
                            Lesson Description
                        </label>
                        <textarea
                            rows="5"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Explain this lesson..."
                            className="
w-full mt-2
border rounded-xl
p-3
focus:ring-2
focus:ring-indigo-500
"
                        />
                    </div>
                    <div>
                        <label className="font-semibold">
                            Lesson Order
                        </label>
                        <input
                            type="number"
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                            className="
w-full mt-2
border rounded-xl p-3
"
                        />
                    </div>
                    <div>
                        <label className="
font-semibold flex items-center gap-2
">
                            <FaVideo />
                            Upload Video
                        </label>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideo}
                            className="
w-full mt-3
border p-3 rounded-xl
"
                        />
                    </div>
                    {
                        preview &&
                        <div>
                            <p className="font-semibold mb-2">
                                Video Preview
                            </p>
                            <video
                                src={preview}
                                controls
                                className="
w-full rounded-xl
"
                            />
                        </div>

                    }
                    <button
                        disabled={loading}
                        className={`w-full py-3 rounded-xl text-white font-semibold flex justify-center items-center gap-2

${loading? "bg-gray-400" :"bg-indigo-600 hover:bg-indigo-700"}`}
                    >
                      <FaUpload />
                        {
                            loading
                                ?
                                "Uploading..."
                                :
                                "Add Lesson"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}
