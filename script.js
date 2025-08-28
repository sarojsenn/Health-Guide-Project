
document.addEventListener("DOMContentLoaded", function() {
  const pdfBtn = document.getElementById("generatePdfBtn");
  if (pdfBtn) {
    pdfBtn.addEventListener("click", async function() {
      
      const name = document.getElementById("profileName")?.textContent || "";
      const id = document.getElementById("profileId")?.textContent || "";
      const history = prompt("Enter your medical history (allergies, conditions, medications, etc.):");
      if (!history) return;
      
      const doc = new window.jspdf.jsPDF();
      doc.setFontSize(18);
      doc.text("Medical History", 10, 20);
      doc.setFontSize(12);
  doc.text(`Name: ${name}`, 10, 35);
  doc.text(id, 10, 45);
  doc.text("History:", 10, 60);
  doc.text(history, 10, 70, { maxWidth: 180 });
      doc.save("medical_history.pdf");
    });
  }
});
const API_URL = "http://localhost:3000"; 
let token = "";


console.log("Script loaded, API URL:", API_URL);


document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded, checking for form elements...");
  
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const showLogin = document.getElementById("showLogin");
  const showSignup = document.getElementById("showSignup");
  
  console.log("Login form:", loginForm);
  console.log("Signup form:", signupForm);
  console.log("Show login button:", showLogin);
  console.log("Show signup button:", showSignup);
});


const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
document.getElementById("showLogin").onclick = () => {
  console.log("Switching to login form");
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
};
document.getElementById("showSignup").onclick = () => {
  console.log("Switching to signup form");
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
};




async function sendLoginOtp() {
  console.log("sendLoginOtp called");
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  console.log("Email:", email, "Password:", password ? "[HIDDEN]" : "empty");
  
  if (!email || !password) return showMsg("Email and password required", true);
  
  try {
    console.log("Sending request to:", `${API_URL}/send-otp`);
    const res = await fetch(`${API_URL}/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Response data:", data);
    showMsg(data.message || data.error);
    if (data.message && data.message.toLowerCase().includes("otp sent")) {
      document.getElementById("loginOtpSection").classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    showMsg("Network error. Please try again.", true);
  }
}
document.getElementById("getLoginOtpBtn").onclick = sendLoginOtp;
document.getElementById("resendLoginOtpBtn").onclick = sendLoginOtp;

loginForm.onsubmit = async function (e) {
  e.preventDefault();
  console.log("Login form submitted");
  
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const otp = document.getElementById("loginOtp").value;
  
  console.log("Login data:", { email, password: password ? "[HIDDEN]" : "empty", otp });
  
  if (!otp) return showMsg("OTP is required", true);
  
  try {
    console.log("Sending login request to:", `${API_URL}/login`);
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, otp }),
    });
    console.log("Login response status:", res.status);
    const data = await res.json();
    console.log("Login response data:", data);
    
    if (data.token) {
      token = data.token;
      localStorage.setItem("token", token); 
      showMsg("Login successful! Redirecting to dashboard...");
      loginForm.reset();
      document.getElementById("loginOtpSection").classList.add("hidden");
      setTimeout(() => {
        window.location.href = "main.html";
      }, 1000);
    } else {
      showMsg(data.error || "Login failed", true);
    }
  } catch (error) {
    console.error("Login error:", error);
    showMsg("Network error during login. Please try again.", true);
  }
};



async function sendSignupOtp() {
  console.log("sendSignupOtp called");
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  console.log("Signup Email:", email, "Password:", password ? "[HIDDEN]" : "empty");
  
  if (!email || !password) return showMsg("Email and password required", true);
  
  try {
    console.log("Sending signup OTP request to:", `${API_URL}/send-otp`);
    const res = await fetch(`${API_URL}/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, signup: true }),
    });
    console.log("Signup OTP response status:", res.status);
    const data = await res.json();
    console.log("Signup OTP response data:", data);
    
    if (data.message) {
      showMsg(data.message);
      if (data.message.toLowerCase().includes("otp sent")) {
        document.getElementById("signupOtpSection").classList.remove("hidden");
      }
    } else if (data.error) {
      showMsg(data.error, true);
    }
  } catch (error) {
    console.error("Error sending signup OTP:", error);
    showMsg("Network error. Please try again.", true);
  }
}
document.getElementById("getSignupOtpBtn").onclick = sendSignupOtp;
document.getElementById("resendSignupOtpBtn").onclick = sendSignupOtp;

document.getElementById("verifySignupOtpBtn").onclick = async function () {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const otp = document.getElementById("signupOtp").value;
  if (!otp) return showMsg("OTP is required", true);
  
  const res = await fetch(`${API_URL}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, otp }),
  });
  const data = await res.json();
  if (data.success) {
    showMsg("OTP verified! Please enter your details.");
    document.getElementById("signupOtpSection").classList.add("hidden");
    document.getElementById("signupDetailsSection").classList.remove("hidden");
    document.getElementById("getSignupOtpBtn").classList.add("hidden");
    document.getElementById("createAccountBtn").classList.remove("hidden");
  } else {
    showMsg(data.error, true);
  }
};


signupForm.onsubmit = async function (e) {
  e.preventDefault();
  
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  
  const name = document.getElementById("signupName").value;
  const age = document.getElementById("signupAge").value;
  const gender = document.getElementById("signupGender").value;
  const contact = document.getElementById("signupContact").value;
  
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, age, gender, contact }),
  });
  const data = await res.json();
  if (data.success) {
    showMsg("Signup successful! Redirecting to dashboard...");
    setTimeout(() => {
      window.location.href = "main.html";
    }, 1000);
  } else {
    showMsg(data.error, true);
  }
};

function showMsg(msg, isError = false) {
  const el = document.getElementById("message");
  el.textContent = msg;
  el.className = `text-center mt-2 text-sm ${isError ? "text-red-500" : "text-green-600"}`;
}


async function getProfile() {
  const res = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` },
  });
  const data = await res.json();
  console.log("Profile:", data);
  alert(JSON.stringify(data));
}


async function updateProfileUI() {
  let token = localStorage.getItem("token");
  if (!token) return;
  try {
    const res = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    });
    const data = await res.json();
    if (data && data.name) {
      document.getElementById("profileName").textContent = data.name;
      document.getElementById("profileId").textContent = `Patient ID: #${data._id || ''}`;
    }
  } catch (e) {
    console.error("Failed to fetch profile", e);
  }
}
if (window.location.pathname.endsWith("main.html")) {
  updateProfileUI();
}
