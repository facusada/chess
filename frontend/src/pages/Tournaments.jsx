import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getTournaments } from "../services/tournamentService.js";

import CreateTournamentModal from "../components/Modals/CreateTournamentModal";

export default function Tournaments() {
  const [showModal, setShowModal] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return navigate("/login");
    }

    fetchTournaments();
  }, []);

  const goBack = () => {
    navigate(-1)
  }

  const fetchTournaments = async () => {
    try {
      const data = await getTournaments();
      setTournaments(data);
    } catch (err) {
      console.error("Error loading tournaments:", err);
    }
  };

  const handleCreateSuccess = (newTournament) => {
    setTournaments((prev) => [...prev, newTournament]);
    setShowModal(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };
  
  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":");
    return `${hour}:${minute} hs`;
  };
  
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  
  const getModeIcon = (mode) => {
    if (mode === "blitz") return <span>⚔️</span>;
    if (mode === "classic") return <span>♟️</span>;
    if (mode === "rapid") return <span>⏱️</span>;
    return <span>🎯</span>;
  };

  return (
    <div className="min-h-screen bg-black text-[#F3DC9B] flex flex-col justify-between">
      {/* Top */}
      <div className="flex justify-between items-center p-4">
        <button onClick={goBack} className="text-[#F3DC9B] text-2xl">←</button>
        <div className="flex items-center gap-2">
          <span className="font-bold">LOGO EMPRESA</span>
          <div className="flex gap-2">
            <SquareIcon /><SquareIcon /><SquareIcon /><SquareIcon />
          </div>
        </div>
      </div>

      {/* Middle */}
      <div className="flex flex-col items-center justify-start flex-1 w-full px-8">
        {tournaments.length === 0 ? (
          <p className="mt-10 mb-4 bg-[#1e1e1e] px-6 py-2 rounded text-center">
            No hay torneos disponibles
          </p>
        ) : (
          <div className="w-full mt-6">
            {/* Encabezado de tabla */}
            <div className="grid grid-cols-5 text-left text-[#F3DC9B] font-bold py-3 border-b border-[#F3DC9B]">
              <div>TORNEO</div>
              <div>FECHA DE INICIO</div>
              <div>MODO</div>
              <div>PREMIO</div>
              <div>ACCIONES</div>
            </div>

            {/* Filas de torneos */}
            {tournaments.map((t, idx) => (
              <div
                key={t.id}
                className={`grid grid-cols-5 py-2 px-1 text-white ${
                  idx % 2 === 0 ? "bg-[#2a2a2a]" : "bg-[#1a1a1a]"
                }`}
              >
                <div className="text-[#F3DC9B]">{t.name}</div>
                <div className="text-[#F3DC9B]">
                  {formatDate(t.start_date)} - {formatTime(t.start_time)}
                </div>
                <div className="flex items-center gap-2 text-[#F3DC9B]">
                  {getModeIcon(t.mode)}
                  {capitalize(t.mode)}
                </div>
                <div className="text-[#F3DC9B]">{t.prize || "Sin puntos"}</div>
                <div>
                  <button
                    onClick={() => navigate(`/tournaments/${t.id}`)}
                    className="bg-[#E74C3C] text-white px-2 py-1 rounded text-sm"
                  >
                    👁️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botón CREAR (siempre visible) */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-6 bg-[#F3DC9B] text-[#E74C3C] px-8 py-2 font-bold"
        >
          CREAR
        </button>
      </div>

      {/* Bottom */}
      <div className="bg-[#E74C3C] text-[#F3DC9B] p-4 flex items-center gap-4">
        <TrophyIcon />
        <span className="text-3xl font-bold">TORNEOS</span>
      </div>

      {showModal && (
        <CreateTournamentModal onClose={() => setShowModal(false)} onCreateSuccess={handleCreateSuccess} />
      )}
    </div>
  );
}

function SquareIcon() {
  return <div className="w-6 h-6 border-2 border-[#F3DC9B]" />;
}

function TrophyIcon() {
  return (
    <div className="w-10 h-10 bg-black flex items-center justify-center rounded-sm">
      🏆
    </div>
  );
}