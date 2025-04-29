const Header = () => {
    return (
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">DELSUD Torneos</h1>
          <nav className="space-x-4">
            <a href="#" className="text-gray-600 hover:text-indigo-600">Inicio</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">Torneos</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">Iniciar sesión</a>
          </nav>
        </div>
      </header>
    );
  };
  
  export default Header;