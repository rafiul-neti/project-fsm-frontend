import { useMutation, useQuery } from "@tanstack/react-query";
import { getLoggedInUser, googleOAuth, userLogin, userLogout } from "@/api";

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
