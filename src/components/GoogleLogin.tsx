"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useGoogleOAuth } from "@/hooks";
import { toast } from "./ui/toast";

export default function GoogleOAuthLogin() {
  const { mutate: googleLogin } = useGoogleOAuth();
  const router = useRouter();

  const handleGoogleLoginSuccess = (credentialResponse: {
    credential?: string;
  }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google Login Failed",
        description: "Something Went Wrong. Please Try Again.",
        type: "error",
      });

      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Google Login Successfull",
            description: "Welcome to the App.",
            type: "succcess",
          });

          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Google Login Failed",
            description:
              err.message || "Something Went Wrong. Please Try Again.",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleLoginError = () => {
    toast.add({
      title: "Google Login Failed",
      description: "Something Went Wrong. Please Try Again.",
      type: "error",
    });
  };
  return (
    <GoogleLogin
      text="continue_with"
      shape="rectangular"
      onSuccess={handleGoogleLoginSuccess}
      onError={handleGoogleLoginError}
    />
  );
}
