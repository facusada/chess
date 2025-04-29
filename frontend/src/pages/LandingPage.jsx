import { useEffect, useState } from "react";
import Header from "../components/Header";
import TournamentCard from "../components/TournamentCard";
import { getTournaments } from "../services/tournamentService";

const LandingPage = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTournaments();
      setTournaments(data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Torneos de Ajedrez</h2>
        <p className="text-gray-600 mb-8">
          Visualizá torneos activos, registrate y participá.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {tournaments.map((t) => (
            <TournamentCard
              key={t.id}
              title={t.name}
              date={t.start_date}
              status={t.status}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;