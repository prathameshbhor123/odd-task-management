// In React (frontend/src/api/faceAuth.js)
const sendToRecognitionServer = async (base64Image) => {
  const response = await fetch("http://localhost:5005/recognize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64Image }),
  });

  const result = await response.json();

  if (result.status === "recognized") {
    await fetch("http://localhost:8080/api/auth/login-by-face", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: result.name,
        email: result.email,
        time: new Date().toISOString(),
      }),
    });
    alert(`Welcome ${result.name}`);
  } else {
    alert("Face not recognized!");
  }
};

