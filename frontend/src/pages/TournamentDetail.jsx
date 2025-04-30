import { useParams, useNavigate } from "react-router-dom";

export default function TournamentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1)
  }

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
      <div className="flex flex-col items-center justify-start flex-1 w-full px-8"></div>
      <div className="min-h-screen bg-black text-[#F3DC9B] p-6">
        <h2 className="text-center text-xl font-bold mb-4">COMIENZA EN 03:27</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-2">PARTICIPANTES</h3>
            <div className="grid grid-cols-3 text-left bg-[#1e1e1e] p-2 font-bold">
              <div>Nombre</div>
              <div>ELO??</div>
              <div>Puntos</div>
            </div>
            {/* hardcoded sample */}
            <div className="grid grid-cols-3 bg-[#2a2a2a] p-2">
              <div>Jugador 1</div><div>13</div><div>1500</div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">ENCUENTROS EN PROGRESO</h3>
            <div className="bg-[#2a2a2a] p-2 flex items-center justify-between">
              <div>Jugador 1</div>
              <div className="mx-2">VS</div>
              <div>Jugador 2</div>
              <button className="ml-4">👁️</button>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="bg-[#E74C3C] text-[#F3DC9B] p-4 flex items-center gap-4">
          <TrophyIcon />
          <span className="text-3xl font-bold">TORNEOS</span>
        </div>
      </div>
    </div>
  );
}

function TrophyIcon() {
  return (
    <div className="w-10 h-10 bg-black flex items-center justify-center rounded-sm">
      🏆
    </div>
  );
}

function SquareIcon() {
  return <div className="w-6 h-6 border-2 border-[#F3DC9B]" />;
}