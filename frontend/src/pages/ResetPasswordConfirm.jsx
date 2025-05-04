import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ResetPasswordConfirm() {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 8) {
      return Swal.fire({
        title: "Error",
        text: "La contraseña debe tener al menos 8 caracteres.",
        icon: "error",
        background: "#1E1E1E",
        color: "#F3DC9B",
        confirmButtonColor: "#E74C3C",
      });
    }

    if (newPassword !== repeatPassword) {
      return Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden.",
        icon: "error",
        background: "#1E1E1E",
        color: "#F3DC9B",
        confirmButtonColor: "#E74C3C",
      });
    }

    try {
      const response = await fetch("http://localhost:8000/auth/users/reset_password_confirm/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid,
          token,
          new_password: newPassword,
        }),
      });

      if (response.status === 204) {
        Swal.fire({
          title: "¡Contraseña actualizada!",
          text: "Ya podés iniciar sesión con tu nueva contraseña.",
          icon: "success",
          background: "#1E1E1E",
          color: "#F3DC9B",
          confirmButtonColor: "#E74C3C",
        });
        navigate("/login");
      } else {
        const data = await response.json();
        Swal.fire({
          title: "Error",
          text: data?.new_password?.[0] || data?.detail || "No se pudo actualizar la contraseña.",
          icon: "error",
          background: "#1E1E1E",
          color: "#F3DC9B",
          confirmButtonColor: "#E74C3C",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado.",
        icon: "error",
        background: "#1E1E1E",
        color: "#F3DC9B",
        confirmButtonColor: "#E74C3C",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-[#F3DC9B] p-8 rounded-md border-[4px] border-black w-full max-w-md text-black">
        <h2 className="text-2xl font-bold text-center mb-6">Restablecer contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">Nueva contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-black text-white px-3 py-2 border-2 border-[#333] rounded-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">Repetir contraseña</label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full bg-black text-white px-3 py-2 border-2 border-[#333] rounded-sm focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#403C2F] text-[#F3DC9B] px-6 py-2 font-bold w-full"
          >
            Confirmar nueva contraseña
          </button>
        </form>
      </div>
    </div>
  );
}