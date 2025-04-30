import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Register/Input";
import PasswordInput from "../components/Register/PasswordInput";
import { registerUser } from "../services/registerService";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (placeholder, value) => {
    setFormData((prev) => ({ ...prev, [placeholder]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) return alert("Debes aceptar los términos.");
    if (formData.password !== formData.repeatPassword)
      return alert("Las contraseñas no coinciden.");

    try {
      const response = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert(`Usuario creado: ${response.username}`);
      navigate("/login");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-[#F3DC9B] p-8 rounded-md shadow-lg border-[4px] border-black w-full max-w-md text-black">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold flex items-center gap-2">
            <div className="w-4 h-4 bg-black rounded-sm" /> LOGO EMPRESA
          </span>
          <button className="bg-red-600 text-white w-6 h-6 flex items-center justify-center font-bold text-sm rounded-sm">X</button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="username" placeholder="NOMBRE DE USUARIO" onChange={handleChange} />
          <Input label="email" type="email" placeholder="EMAIL" onChange={handleChange} />
          <PasswordInput
            label="password"
            placeholder="CONTRASEÑA"
            visible={showPassword}
            toggle={() => setShowPassword(!showPassword)}
            onChange={handleChange}
          />
          <PasswordInput
            label="repeatPassword"
            placeholder="REPETIR CONTRASEÑA"
            visible={showRepeatPassword}
            toggle={() => setShowRepeatPassword(!showRepeatPassword)}
            onChange={handleChange}
          />

          <div className="flex items-center justify-between text-sm font-bold">
            <p className="max-w-[70%] leading-tight">
              LEÍ Y ACEPTO LOS TÉRMINOS Y CONDICIONES
            </p>
            <button
              type="button"
              className={`w-6 h-6 font-bold text-sm flex items-center justify-center ${
                acceptedTerms ? "bg-black text-[#F3DC9B]" : "bg-red-600 text-white"
              }`}
              onClick={() => setAcceptedTerms(!acceptedTerms)}
            >
              {acceptedTerms ? "✔" : "X"}
            </button>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-[#403C2F] text-[#F3DC9B] px-6 py-2 font-bold w-full"
            >
              SUBMIT
            </button>
            <button
              type="button"
              className="bg-[#E74C3C] text-white px-4 py-2 font-bold text-sm"
            >
              TÉRMINOS Y CONDIC
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}