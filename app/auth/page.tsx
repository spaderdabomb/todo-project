"use client";

import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";

export default function AuthPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/"); // Redirect to home after login
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      <button
        className="px-6 py-3 bg-blue-500 hover:bg-blue-700 rounded-md"
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </button>
    </div>
  );
}
