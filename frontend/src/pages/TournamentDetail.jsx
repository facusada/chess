import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getTournamentDetail, registerToTournament, generateMatches } from "../services/tournamentService";

import Swal from 'sweetalert2';


export default function TournamentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const goBack = () => navigate(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTournamentDetail(id);
        setData(res);
      } catch (err) {
        console.error("Error fetching tournament detail:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleJoinTournament = async () => {
    try {
      await registerToTournament(id);
  
      await Swal.fire({
        title: '¡Registrado!',
        text: 'Te registraste correctamente al torneo.',
        icon: 'success',
        background: '#1E1E1E',
        color: '#F3DC9B',
        confirmButtonColor: '#E74C3C',
      });
  
      const res = await getTournamentDetail(id);
      setData(res);
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.detail || 'No se pudo registrar.',
        icon: 'error',
        background: '#1E1E1E',
        color: '#F3DC9B',
        confirmButtonColor: '#E74C3C',
      });
    }
  };

  const handleGenerateMatches = async () => {
    try {
      await generateMatches(id);
  
      await Swal.fire({
        title: '¡Partidas generadas!',
        text: 'Las partidas se generaron con éxito.',
        icon: 'success',
        background: '#1E1E1E',
        color: '#F3DC9B',
        confirmButtonColor: '#E74C3C',
      });
  
      const res = await getTournamentDetail(id);
      setData(res);
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.detail || 'No se pudieron generar las partidas.',
        icon: 'error',
        background: '#1E1E1E',
        color: '#F3DC9B',
        confirmButtonColor: '#E74C3C',
      });
    }
  };

  if (!data) return <div className="text-white text-center mt-10">Cargando...</div>;

  const { tournament, participants, matches } = data;
  const formattedDate = new Date(tournament.start_date).toLocaleDateString("es-AR");
  const formattedTime = tournament.start_time ? tournament.start_time.slice(0, 5) : "00:00";

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
      <div className="p-6 flex-1">
        <h2 className="text-center text-xl font-bold mb-4">
          COMIENZA EN {formattedDate} - {formattedTime} hs
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Participantes */}
          <div>
            <div className="flex items-center mb-2">
              <h3 className="font-bold">PARTICIPANTES</h3>
              <button
                onClick={handleJoinTournament}
                className="bg-[#F3DC9B] text-black font-bold rounded-full w-6 h-6 flex items-center justify-center m-4"
                title="Unirse al torneo"
              >
                +
              </button>
            </div>
            <div className="grid grid-cols-3 text-left bg-[#1e1e1e] p-2 font-bold">
              <div>Nombre</div>
              <div>ELO??</div>
              <div>Puntos</div>
            </div>
            {participants.map((p, index) => (
              <div key={p.id} className={`grid grid-cols-3 p-2 ${index % 2 === 0 ? "bg-[#2a2a2a]" : "bg-[#1e1e1e]"}`}>
                <div>{p.user}</div>
                <div>{Math.floor(Math.random() * 100)}</div>
                <div>{(Math.random() * 2000).toFixed(0)}</div>
              </div>
            ))}
          </div>

          {/* Encuentros */}
          <div>
            <h3 className="font-bold mb-2">ENCUENTROS EN PROGRESO</h3>
            {matches.length === 0 ? (
              <div className="bg-[#2a2a2a] p-2">No hay partidas</div>
            ) : (
              matches.map((m) => (
                <div key={m.id} className="bg-[#2a2a2a] p-2 flex items-center justify-between mb-1">
                  <div>{m.player_one}</div>
                  <div className="mx-2">VS</div>
                  <div>{m.player_two}</div>
                  <button className="ml-4">👁️</button>
                </div>
              ))
            )}
          </div>
          {/* Botón para generar partidas */}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleGenerateMatches}
            className="bg-[#F3DC9B] text-[#E74C3C] px-8 py-2 font-bold"
          >
            GENERAR PARTIDAS
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-[#E74C3C] text-[#F3DC9B] p-4 flex items-center gap-4">
        <TrophyIcon />
        <span className="text-3xl font-bold">TORNEOS</span>
      </div>
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