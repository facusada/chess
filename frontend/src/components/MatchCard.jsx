const MatchCard = ({ matchId, player1, player2, status }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-md font-semibold text-gray-800 mb-2">
          Partida #{matchId}
        </h3>
        <p className="text-gray-600">{player1} vs {player2}</p>
        <span className={`mt-2 inline-block text-xs px-2 py-1 rounded-full ${status === 'En curso' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
          {status}
        </span>
      </div>
    );
  };
  
  export default MatchCard;