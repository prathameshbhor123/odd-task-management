import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const AttendanceCapture = ({ employeeId }) => {
    const webcamRef = useRef(null);
    const [status, setStatus] = useState("");

    const captureAndSend = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const response = await axios.post("http://localhost:8080/api/attendance/mark", {
            employeeId,
            image: imageSrc
        });
        setStatus(response.data.message);
    };

    return (
        <div>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            <button onClick={captureAndSend} className="mt-2 p-2 bg-blue-500 text-white rounded">Mark Attendance</button>
            <p>{status}</p>
        </div>
    );
};

export default AttendanceCapture;
