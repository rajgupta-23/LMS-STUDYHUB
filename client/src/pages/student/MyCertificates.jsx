import { useEffect, useState } from "react";
import CertificateCard from "../../components/CertificateCard";
import { getMyCertificates } from "../../services/certificateApi";
import { FaCertificate } from "react-icons/fa";


export default function MyCertificates() {


    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        loadCertificates();

    }, []);




    const loadCertificates = async () => {

        try {

            const res = await getMyCertificates();

            setCertificates(res.certificates || []);

        }
        catch (err) {

            console.log(err);

        }
        finally {

            setLoading(false);

        }

    };





    if (loading) {

        return (

            <div className="
            min-h-screen
            flex
            items-center
            justify-center
            text-xl
            font-semibold
            ">

                Loading Certificates...

            </div>

        );

    }





    return (

        <div className="
min-h-screen
bg-gray-100
py-10
">



            <div className="
max-w-6xl
mx-auto
px-6
">





                {/* Header */}


                <div className="
bg-gradient-to-r
from-indigo-700
to-purple-600
rounded-3xl
p-8
text-white
mb-10
flex
justify-between
items-center
">


                    <div>


                        <div className="
flex
items-center
gap-3
text-3xl
font-bold
">

                            <FaCertificate />

                            My Certificates

                        </div>



                        <p className="
mt-3
text-indigo-100
">

                            Your achievements and completed courses.

                        </p>



                    </div>




                    <div className="
bg-white/20
px-6
py-4
rounded-2xl
text-center
">


                        <h2 className="
text-3xl
font-bold
">

                            {certificates.length}

                        </h2>


                        <p>
                            Certificates
                        </p>


                    </div>



                </div>







                {/* Certificate List */}



                {

                    certificates.length === 0 ?



                        <div className="
bg-white
rounded-3xl
shadow
p-10
text-center
">


                            <h2 className="
text-2xl
font-bold
text-gray-700
">

                                No Certificates Yet 🎓

                            </h2>


                            <p className="
text-gray-500
mt-3
">

                                Complete courses to earn certificates.

                            </p>


                        </div>



                        :



                        <div className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-6
">


                            {

                                certificates.map((certificate) => (


                                    <CertificateCard

                                        key={certificate._id}

                                        certificate={certificate}

                                    />


                                ))


                            }



                        </div>



                }





            </div>



        </div>

    );

}