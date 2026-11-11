import apiClient from "@/lib/apiClient";
import type { UserRegisterPayload } from "@/types";

export function userRegister(payload: UserRegisterPayload) {
  const formData = new FormData();

  formData.append("profileImage", payload.profileImage);
  formData.append("data", JSON.stringify(payload.data));

  return apiClient("/auth/register", {
    method: "POST",
    body: formData,
  });
}

export function verifyEmail(payload: {
  email: string;
  otp: string;
  verifying?: "technician";
}) {
  return apiClient(
    `${payload.verifying === "technician" ? "/technicians/verify-email" : "/auth/verify-otp"}`,
    {
      method: "POST",
      body: { email: payload.email, otp: payload.otp },
    },
  );
}

export function userLogin(payload: { email: string; password: string }) {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function getLoggedInUser() {
  return apiClient("/auth/get-current-user");
}

export function userLogout() {
  return apiClient("/auth/logout", {
    method: "POST",
  });
}

export function googleOAuth(payload: { idToken: string }) {
  return apiClient("/auth/google", { method: "POST", body: payload });
}
