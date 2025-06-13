import React from "react";
import WebcamCapture from "./Webcam";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = 'http://localhost:8080';
const FaceLogin = ({ user, onSuccess, onFailure }) => {
  const navigate = useNavigate();

  const sendToRecognitionServer = async (base64Image) => {
    try {
      const recognitionResponse = await fetch("http://localhost:5005/recognize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });

      const recognitionResult = await recognitionResponse.json();

      if (recognitionResult.status !== "recognized") {
        alert("❌ Face not recognized. Please try again.");
        onFailure();
        return;
      }

      const loginResponse = await fetch("http://localhost:8080/api/auth/login-by-face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: recognitionResult.name,
          time: new Date().toISOString(),
        }),
      });

      if (!loginResponse.ok) {
        throw new Error("Login failed after face recognition");
      }

      // success
      alert(`🎉 Welcome, ${recognitionResult.name}!`);
      onSuccess();
    } catch (err) {
      console.error("FaceLogin Error:", err.message);
      alert("🚨 Error: " + err.message);
      onFailure();
    }
  };

  return (
    <div>
      <h2 className="font-bold text-4xl text-white mb-4">Face Recognition</h2>
      <WebcamCapture onCapture={sendToRecognitionServer} />
    </div>
  );
};


export default FaceLogin;
