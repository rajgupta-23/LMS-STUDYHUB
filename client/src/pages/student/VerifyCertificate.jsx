import { useState } from "react";
import { verifyCertificate } from "../../services/certificateApi";


export default function VerifyCertificate() {


    const [certificateId, setCertificateId] = useState("");
    const [certificate, setCertificate] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);



    const handleVerify = async () => {


        if (!certificateId) {

            setError("Enter certificate ID");

            return;

        }


        try {

            setLoading(true);
            setError("");
            setCertificate(null);


            const res = await verifyCertificate(
                certificateId
            );


            setCertificate(res);


        }

        catch (error) {

            setError(
                error.response?.data?.message ||
                "Certificate not found"
            );

        }


        finally {

            setLoading(false);

        }


    };




    return (

        <div className="
min-h-screen
bg-gradient-to-br
from-indigo-100
to-blue-100
flex
items-center
justify-center
p-6
">


            <div className="
bg-white
rounded-3xl
shadow-xl
p-8
w-full
max-w-lg
">



                <h1 className="
text-3xl
font-bold
text-center
">

                    Verify Certificate

                </h1>


                <p className="
text-gray-500
text-center
mt-2
mb-6
">

                    Check authenticity of certificate

                </p>




                <input

                    type="text"

                    placeholder="Enter Certificate ID"

                    value={certificateId}

                    onChange={(e) => setCertificateId(e.target.value)}

                    className="
w-full
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-indigo-500
"

                />




                <button

                    onClick={handleVerify}

                    disabled={loading}

                    className="
mt-5
w-full
bg-indigo-600
hover:bg-indigo-700
text-white
py-3
rounded-xl
font-semibold
"

                >

                    {
                        loading
                            ?
                            "Verifying..."
                            :
                            "Verify Certificate"
                    }


                </button>





                {
                    error &&

                    <p className="
mt-5
bg-red-100
text-red-600
p-3
rounded-xl
">

                        {error}

                    </p>

                }





                {
                    certificate &&


                    <div className="
mt-6
bg-green-50
border
border-green-300
rounded-2xl
p-6
">


                        <h2 className="
text-xl
font-bold
text-green-700
">

                            ✓ Certificate Verified

                        </h2>



                        <div className="mt-4 space-y-2">


                            <p>
                                <b>Student:</b>
                                {certificate.user?.name}
                            </p>


                            <p>
                                <b>Course:</b>
                                {certificate.course?.title}
                            </p>



                            <p>
                                <b>Certificate ID:</b>
                                {certificate._id}
                            </p>



                            <p>
                                <b>Status:</b>
                                <span className="
text-green-600
font-bold
">
                                    Valid
                                </span>
                            </p>



                        </div>



                    </div>


                }



            </div>


        </div>


    )

}