import api from "../api/axios";




export const generateCertificate = async (courseId) => {
    const { data } = await api.post(
        `/certificates/generate/${courseId}`
    );

    return data;
};





export const getMyCertificates = async () => {
    const { data } = await api.get(
        "/certificates/my"
    );

    return data;
};





export const verifyCertificate = async (certificateId) => {
    const { data } = await api.get(
        `/certificates/verify/${certificateId}`
    );

    return data;
};