import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function SignOut() {
  const { signOut } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    signOut();
    toast.success("You have been signed out successfully."); //רץ פעמיים רק בגלל הסביבת פיתוח אם רוצים שירוץ פעם אחת מוחקים פשוט את StrictMode בקובץ MAIN
    navigate("/");
  }, []);

  return;
}
export default SignOut;
