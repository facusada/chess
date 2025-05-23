import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/registerService";

import Input from "../components/Register/Input";
import PasswordInput from "../components/Register/PasswordInput";

import Swal from 'sweetalert2';

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

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    repeatPassword: false,
  });

  const navigate = useNavigate();

  const handleChange = (placeholder, value) => {
    setFormData((prev) => ({ ...prev, [placeholder]: value }));
    setErrors((prev) => ({ ...prev, [placeholder]: false }));
  };

  const handleClose = () => {
    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      username: formData.username.trim() === "",
      email: formData.email.trim() === "",
      password: formData.password.trim() === "",
      repeatPassword: formData.repeatPassword.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    if (!acceptedTerms) {
      return Swal.fire({
        title: 'Atención',
        text: 'Debes aceptar los términos.',
        icon: 'warning',
        background: '#1E1E1E',
        color: '#F3DC9B',
        confirmButtonColor: '#E74C3C',
      });
    }

    if (formData.password !== formData.repeatPassword) {
      return Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
        icon: 'error',
        background: '#1E1E1E',
        color: '#F3DC9B',
        confirmButtonColor: '#E74C3C',
      });
    }

    try {
      const response = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      await Swal.fire({
        title: '¡Usuario creado!',
        text: `El usuario "${response.username}" fue registrado correctamente.`,
        icon: 'success',
        background: '#1E1E1E',
        color: '#F3DC9B',
        confirmButtonColor: '#E74C3C',
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || 'No se pudo crear el usuario.',
        icon: 'error',
        background: '#1E1E1E',
        color: '#F3DC9B',
        confirmButtonColor: '#E74C3C',
      });
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
          <button 
            className="bg-red-600 text-white w-6 h-6 flex items-center justify-center font-bold text-sm rounded-sm"
            onClick={handleClose}
          >
            X
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="username" placeholder="NOMBRE DE USUARIO" onChange={handleChange} error={errors.username} />
          <Input label="email" type="email" placeholder="EMAIL" onChange={handleChange} error={errors.email} />
          <PasswordInput
            label="password"
            placeholder="CONTRASEÑA"
            visible={showPassword}
            toggle={() => setShowPassword(!showPassword)}
            onChange={handleChange}
            error={errors.password}
          />
          <PasswordInput
            label="repeatPassword"
            placeholder="REPETIR CONTRASEÑA"
            visible={showRepeatPassword}
            toggle={() => setShowRepeatPassword(!showRepeatPassword)}
            onChange={handleChange}
            error={errors.repeatPassword}
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