import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
// import { useDispatch } from "react-redux";
// import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

// import React icon
import { FaGoogle } from "react-icons/fa";

export default function OAuth() {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log("🚀 ~ handleGoogleClick ~ data:", data);
      dispatch(signInSuccess(data));
      navigate(`/?name=${data.name}`);
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="flex items-center bg-slate-50 text-black p-4 rounded-xl hover:bg-black hover:text-slate-50"
    >
      <FaGoogle className="mr-3" />
      Sign in with Google
    </button>
  );
}
