import { useState } from "react";
import { createTournament } from "../../services/tournamentService";

export default function CreateTournamentModal({ onClose, onCreateSuccess }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    mode: "",
    startDate: "",
    startTime: "",
    players: "",
    prize: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await createTournament(form);
      alert(`Torneo creado: ${response.name}`);
      onCreateSuccess(response);
    } catch (error) {
      alert(error.detail || "No se pudo crear el torneo.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#F3DC9B] w-full max-w-4xl p-6 border-[3px] border-black text-black">
        <h2 className="text-2xl font-bold text-center mb-6">CREAR TORNEO</h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="NOMBRE TORNEO"
              className="w-full bg-[#1E1E1E] text-white px-4 py-2"
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <textarea
              placeholder="DESCRIPCIÓN"
              rows="5"
              className="w-full bg-[#1E1E1E] text-white px-4 py-2 resize-none"
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Columna derecha */}
          <div className="space-y-4">
            <select
              className="w-full bg-[#1E1E1E] text-white px-4 py-2"
              onChange={(e) => handleChange("mode", e.target.value)}
            >
              <option value="">MODO</option>
              <option value="classic">Clásico</option>
              <option value="rapid">Rápido</option>
              <option value="blitz">Blitz</option>
            </select>

            <div className="flex">
              <label className="bg-[#F3DC9B] font-bold w-1/2 px-4 py-2 border border-black">
                FECHA INICIO
              </label>
              <input
                type="date"
                className="w-1/2 bg-[#1E1E1E] text-white px-4 py-2 border border-black"
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>

            <div className="flex">
              <label className="bg-[#F3DC9B] font-bold w-1/2 px-4 py-2 border border-black">
                HORA INICIO
              </label>
              <input
                type="time"
                className="w-1/2 bg-[#1E1E1E] text-white px-4 py-2 border border-black"
                onChange={(e) => handleChange("startTime", e.target.value)}
              />
            </div>

            <div className="flex">
              <label className="bg-[#F3DC9B] font-bold w-1/2 px-4 py-2 border border-black">
                JUGADORES
              </label>
              <input
                type="number"
                className="w-1/2 bg-[#1E1E1E] text-white px-4 py-2 border border-black"
                onChange={(e) => handleChange("players", e.target.value)}
              />
            </div>

            <div className="flex">
              <label className="bg-[#F3DC9B] font-bold w-1/2 px-4 py-2 border border-black">
                PREMIO
              </label>
              <input
                type="text"
                placeholder="5.000 PTS"
                className="w-1/2 bg-[#1E1E1E] text-white px-4 py-2 border border-black"
                onChange={(e) => handleChange("prize", e.target.value)}
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={onClose} className="font-bold">CANCELAR</button>
              <button onClick={handleSubmit} className="bg-[#E74C3C] text-white px-6 py-2 font-bold">
                CREAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}