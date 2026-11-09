import { useMutation, useQuery } from "@tanstack/react-query";
import { getLoggedInUser, googleOAuth, userLogin, userLogout, userRegister, verifyEmail } from "@/api";

export function useRegister() {
  return useMutation({
    mutationFn: userRegister,
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: verifyEmail,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useGoogleOAuth() {
  return useMutation({
    mutationFn: googleOAuth,
  });
}

export function useGetLoggedInUser() {
  return useQuery({
    queryKey: ["logged-in-user"],
    queryFn: getLoggedInUser,
    retry: false,
  });
}
