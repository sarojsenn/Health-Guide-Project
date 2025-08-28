console.log("Authentication script loaded");
const API_URL = "http://localhost:5000/api/auth";
let token = "";
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded, initializing authentication...");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const showLogin = document.getElementById("showLogin");
  const showSignup = document.getElementById("showSignup");
  console.log("Login form:", loginForm);
  console.log("Signup form:", signupForm);
  console.log("Show login button:", showLogin);
  console.log("Show signup button:", showSignup);
  if (!loginForm || !signupForm || !showLogin || !showSignup) {
    console.error("Missing required form elements!");
    return;
  }
  showLogin.onclick = function() {
    console.log("Switching to login form");
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    const tabIndicator = document.getElementById("tabIndicator");
    if (tabIndicator) {
      tabIndicator.style.transform = "translateX(0%)";
    }
    showLogin.classList.add("text-white");
    showLogin.classList.remove("text-muted-light", "dark:text-muted-dark");
    showSignup.classList.remove("text-white");
    showSignup.classList.add("text-muted-light", "dark:text-muted-dark");
  };
  showSignup.onclick = function() {
    console.log("Switching to signup form");
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    const tabIndicator = document.getElementById("tabIndicator");
    if (tabIndicator) {
      tabIndicator.style.transform = "translateX(100%)";
    }
    showSignup.classList.add("text-white");
    showSignup.classList.remove("text-muted-light", "dark:text-muted-dark");
    showLogin.classList.remove("text-white");
    showLogin.classList.add("text-muted-light", "dark:text-muted-dark");
  };
  const getLoginOtpBtn = document.getElementById("getLoginOtpBtn");
  if (getLoginOtpBtn) {
    getLoginOtpBtn.onclick = sendLoginOtp;
  }
  const resendLoginOtpBtn = document.getElementById("resendLoginOtpBtn");
  if (resendLoginOtpBtn) {
    resendLoginOtpBtn.onclick = sendLoginOtp;
  }
  const getSignupOtpBtn = document.getElementById("getSignupOtpBtn");
  if (getSignupOtpBtn) {
    getSignupOtpBtn.onclick = sendSignupOtp;
  }
  const resendSignupOtpBtn = document.getElementById("resendSignupOtpBtn");
  if (resendSignupOtpBtn) {
    resendSignupOtpBtn.onclick = sendSignupOtp;
  }
  const verifySignupOtpBtn = document.getElementById("verifySignupOtpBtn");
  if (verifySignupOtpBtn) {
    verifySignupOtpBtn.onclick = verifySignupOtp;
  }
  if (loginForm) {
    loginForm.onsubmit = handleLogin;
  }
  if (signupForm) {
    signupForm.onsubmit = handleSignup;
  }
});
async function sendLoginOtp() {
  console.log("sendLoginOtp called");
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  console.log("Email:", email, "Password:", password ? "[HIDDEN]" : "empty");
  if (!email || !password) {
    showMsg("Email and password required", true);
    return;
  }
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
    if (data.message) {
      showMsg(data.message);
      if (data.message.toLowerCase().includes("otp sent")) {
        document.getElementById("loginOtpSection").classList.remove("hidden");
      }
    } else if (data.error) {
      showMsg(data.error, true);
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    showMsg("Network error. Please try again.", true);
  }
}
async function handleLogin(e) {
  e.preventDefault();
  console.log("Login form submitted");
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const otp = document.getElementById("loginOtp").value;
  console.log("Login data:", { email, password: password ? "[HIDDEN]" : "empty", otp });
  if (!otp) {
    showMsg("OTP is required", true);
    return;
  }
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
      document.getElementById("loginForm").reset();
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
}
async function sendSignupOtp() {
  console.log("sendSignupOtp called");
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  console.log("Signup Email:", email, "Password:", password ? "[HIDDEN]" : "empty");
  if (!email || !password) {
    showMsg("Email and password required", true);
    return;
  }
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
async function verifySignupOtp() {
  console.log("verifySignupOtp called");
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const otp = document.getElementById("signupOtp").value;
  if (!otp) {
    showMsg("OTP is required", true);
    return;
  }
  try {
    const res = await fetch(`${API_URL}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, otp }),
    });
    const data = await res.json();
    console.log("Verify OTP response:", data);
    if (data.success) {
      showMsg("OTP verified! Please enter your details.");
      document.getElementById("signupOtpSection").classList.add("hidden");
      document.getElementById("signupDetailsSection").classList.remove("hidden");
      document.getElementById("getSignupOtpBtn").classList.add("hidden");
    } else {
      showMsg(data.error || "OTP verification failed", true);
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    showMsg("Network error. Please try again.", true);
  }
}
async function handleSignup(e) {
  e.preventDefault();
  console.log("Signup form submitted");
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const name = document.getElementById("signupName").value;
  const age = document.getElementById("signupAge").value;
  const gender = document.getElementById("signupGender").value;
  const contact = document.getElementById("signupContact").value;
  if (!name || !age || !gender || !contact) {
    showMsg("Please fill all required fields", true);
    return;
  }
  console.log(`📝 Completing signup for: ${name} (${email})`);
  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, age, gender, contact }),
    });
    const data = await res.json();
    console.log("Signup response:", data);
    if (data.success && data.token) {
      console.log(`🎉 Signup successful for ${data.user.name}!`);
      console.log(`🔑 Token received, storing in localStorage...`);
      localStorage.setItem("token", data.token);
      console.log(`✅ Token stored successfully`);
      showMsg(`Welcome ${data.user.name}! Redirecting to dashboard...`);
      setTimeout(() => {
        console.log(`🔄 Redirecting to main.html...`);
        window.location.href = "main.html";
      }, 1500);
    } else {
      console.error("Signup failed:", data.error);
      showMsg(data.error || "Signup failed", true);
    }
  } catch (error) {
    console.error("Signup error:", error);
    showMsg("Network error during signup. Please try again.", true);
  }
}
function showMsg(msg, isError = false) {
  console.log("Showing message:", msg, "Error:", isError);
  const el = document.getElementById("message");
  if (el) {
    el.textContent = msg;
    el.className = `text-center mt-6 text-sm font-medium ${isError ? "text-red-500" : "text-green-600"}`;
  } else {
    console.error("Message element not found!");
    alert(msg);
  }
}
