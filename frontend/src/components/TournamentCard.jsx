import { Link } from "react-router-dom";

const getStatusStyle = (status) => {
  switch (status.toLowerCase()) {
    case "inprogress":
      return "bg-green-100 text-green-700";
    case "pendiente":
      return "bg-yellow-100 text-yellow-700";
    case "finalizado":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-indigo-100 text-indigo-600";
  }
};

const TournamentCard = ({ id, title, date, status }) => {
  return (
    <Link to={`/tournaments/${id}`}>
      <div className="bg-white rounded-xl shadow p-4 w-full max-w-sm hover:scale-105 transform transition duration-300">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">{date}</p>
        <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${getStatusStyle(status)}`}>
          {status}
        </span>
      </div>
    </Link>
  );
};

export default TournamentCard;