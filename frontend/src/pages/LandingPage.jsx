import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px] transform rotate-45 bg-[#F3DC9B] flex items-center justify-center shadow-lg border-[4px] border-black">
        <div className="absolute -top-12 w-24 h-24 bg-black rounded-[30%] z-10" />

        <div className="transform -rotate-45 text-center px-6 w-[90%]">
          <h1 className="text-3xl font-extrabold mb-4">LOGO EMPRESA</h1>
          <p className="text-sm mb-6 leading-tight">
            A new way to play the connected game of chess. A decentralized platform
            for everyone who wants to earn money playing the most beloved game in the
            history of mankind. Scholarships, tournaments, the system, ratings,
            integrated rapid or blitz chess modes and much more in the future.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-black text-[#F3DC9B] py-2 font-bold"
            >
              LOGIN
            </button>
            <button
              onClick={() => navigate("/register")}
              className="w-full bg-black text-[#F3DC9B] py-2 font-bold"
            >
              REGISTER
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 text-xs font-bold">
            <span className="border border-black p-1">TÉRMINOS Y CONDIC</span>
            <span className="border border-black p-1">MANUAL DE USUARIO</span>
            <span className="border border-black p-1">F.A.Qs</span>
          </div>
        </div>
      </div>
    </div>
  );
}