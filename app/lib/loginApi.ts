import axios from "axios";
import { useRouter } from "next/navigation";

export const LogIn = async (
  e: React.FormEvent,
  user: { name: string; email: string },
  router: ReturnType<typeof useRouter>
) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
      { name: user.name, email: user.email },
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log("Login successful!", response);
      router.push("/");
    }
  } catch (error) {
    console.error("Login Error", error);
    alert("Login Failed");
  }
};
