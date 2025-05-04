import { useState } from "react";
import { Eye } from "lucide-react";
import { loginUser } from "../services/loginService";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: false, password: false });
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false })); // limpiar error si se empieza a escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      username: credentials.username.trim() === "",
      password: credentials.password.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.username || newErrors.password) return;

    try {
      const { access, refresh } = await loginUser(credentials);
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      await Swal.fire({
        title: '¡Login exitoso!',
        text: 'Bienvenido al sistema de torneos.',
        icon: 'success',
        background: '#1E1E1E',
        color: '#F3DC9B',
        confirmButtonColor: '#E74C3C',
      });

      navigate("/tournaments");
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || 'No se pudo iniciar sesión.',
        icon: 'error',
        background: '#1E1E1E',
        color: '#F3DC9B',
        confirmButtonColor: '#E74C3C',
      });
    }
  };

  const handleClose = () => {
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      <div className="bg-[#F3DC9B] p-8 rounded-md border-[4px] border-black w-full max-w-md text-black">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold flex items-center gap-2">
            <div className="w-4 h-4 bg-black rounded-sm" /> LOGO EMPRESA
          </span>
          <button 
            className="bg-red-600 text-white w-6 h-6 flex items-center justify-center font-bold text-sm rounded-sm"
            onClick={handleClose}
          >
            X
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-semibold">NOMBRE DE USUARIO</label>
            <input
              type="text"
              className={`w-full bg-black text-white px-3 py-2 border-2 ${
                errors.username ? "border-red-500" : "border-transparent"
              }`}
              onChange={(e) => handleChange("username", e.target.value)}
              value={credentials.username}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">CONTRASEÑA</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full bg-black text-white px-3 py-2 pr-10 border-2 ${
                  errors.password ? "border-red-500" : "border-transparent"
                }`}
                onChange={(e) => handleChange("password", e.target.value)}
                value={credentials.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-white"
              >
                <Eye size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-[#403C2F] text-[#F3DC9B] px-6 py-2 font-bold"
            >
              SUBMIT
            </button>
          </div>
        </form>

        <div className="mt-6 text-sm">
          <p>
            OLVIDASTE TU CONTRASEÑA?{" "}
            <span className="text-[#E74C3C] font-bold cursor-pointer">RESETEALA</span>
          </p>
        </div>
      </div>
    </div>
  );
}