import { FaCrown, FaUsers, FaBoxOpen, FaFileInvoice, FaChartLine, FaCog, FaEdit, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
  const products = [
    {
      id: 1,
      name: "Robe longue en soie",
      price: "120€",
      stock: 15,
      seller: "Amel Rachedi",
      status: "Disponible",
      statusClass: "status-delivered"
    },
    {
      id: 2,
      name: "Sac à main cuir",
      price: "85€",
      stock: 8,
      seller: "Tala Ighil",
      status: "Disponible",
      statusClass: "status-delivered"
    },
    {
      id: 3,
      name: "Parfum floral",
      price: "65€",
      stock: 22,
      seller: "Nesrine Salhi",
      status: "Disponible",
      statusClass: "status-delivered"
    },
    {
      id: 4,
      name: "Bijou en argent",
      price: "45€",
      stock: 3,
      seller: "Lydia Rahmani",
      status: "Stock faible",
      statusClass: "status-pending"
    },
    {
      id: 5,
      name: "Chaussures élégantes",
      price: "95€",
      stock: 12,
      seller: "Nawal Tala",
      status: "Disponible",
      statusClass: "status-delivered"
    }
  ];

  return (
    <div className="flex min-h-screen bg-white text-gray-800 font-sans">
      {/* Sidebar */}
      <div className="w-72 fixed h-screen bg-gradient-to-b from-[#F0E6D2] to-[#FAF6F0] text-gray-800 p-6 shadow-lg border-r border-[#E4D5C3]">
        <h2 className="text-center text-xl font-semibold mb-8 pb-4 border-b border-[#F8E8EE] flex items-center justify-center">
          <FaCrown className="mr-2 text-[#E8B4B8]" />
          Admin Luxe
        </h2>
        <nav>
          <a href="#users" className="flex items-center px-6 py-3 my-2 mx-4 rounded-lg bg-white bg-opacity-30 hover:bg-[#F8E8EE] hover:translate-x-1 hover:shadow-sm transition-all duration-300 font-medium">
            <FaUsers className="mr-3 text-[#E8B4B8] text-lg" />
            Gestion des utilisateurs
          </a>
          <a href="#products" className="flex items-center px-6 py-3 my-2 mx-4 rounded-lg bg-white bg-opacity-30 hover:bg-[#F8E8EE] hover:translate-x-1 hover:shadow-sm transition-all duration-300 font-medium">
            <FaBoxOpen className="mr-3 text-[#E8B4B8] text-lg" />
            Gestion des produits
          </a>
          <a href="#orders" className="flex items-center px-6 py-3 my-2 mx-4 rounded-lg bg-white bg-opacity-30 hover:bg-[#F8E8EE] hover:translate-x-1 hover:shadow-sm transition-all duration-300 font-medium">
            <FaFileInvoice className="mr-3 text-[#E8B4B8] text-lg" />
            Gestion des commandes
          </a>
          <a href="#stats" className="flex items-center px-6 py-3 my-2 mx-4 rounded-lg bg-white bg-opacity-30 hover:bg-[#F8E8EE] hover:translate-x-1 hover:shadow-sm transition-all duration-300 font-medium">
            <FaChartLine className="mr-3 text-[#E8B4B8] text-lg" />
            Statistiques
          </a>
          <a href="#settings" className="flex items-center px-6 py-3 my-2 mx-4 rounded-lg bg-white bg-opacity-30 hover:bg-[#F8E8EE] hover:translate-x-1 hover:shadow-sm transition-all duration-300 font-medium">
            <FaCog className="mr-3 text-[#E8B4B8] text-lg" />
            Paramètres
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-72 p-8 w-full">
        <h2 id="products" className="text-xl font-semibold mt-8 pb-2 border-b-2 border-[#F8E8EE] flex items-center">
          <FaBoxOpen className="mr-2 text-[#E8B4B8]" />
          Gestion des produits
        </h2>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#F0E6D2] mt-6 animate-fadeIn">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8E8EE] text-gray-800 font-semibold text-sm tracking-wide">
                <th className="px-5 py-4 text-left">ID</th>
                <th className="px-5 py-4 text-left">Produit</th>
                <th className="px-5 py-4 text-left">Prix</th>
                <th className="px-5 py-4 text-left">Stock</th>
                <th className="px-5 py-4 text-left">Vendeur</th>
                <th className="px-5 py-4 text-left">Statut</th>
                <th className="px-5 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-[#F8E8EE] even:bg-[#FAF6F0] border-b border-[#F0E6D2]">
                  <td className="px-5 py-4">{product.id}</td>
                  <td className="px-5 py-4">{product.name}</td>
                  <td className="px-5 py-4">{product.price}</td>
                  <td className="px-5 py-4">{product.stock}</td>
                  <td className="px-5 py-4">{product.seller}</td>
                  <td className={`px-5 py-4 font-medium ${product.statusClass === "status-delivered" ? "text-[#A7C4A0]" : "text-[#E8B4B8]"}`}>
                    {product.status}
                  </td>
                  <td className="px-5 py-4">
                    <button className="bg-[#A7C4A0] text-white px-4 py-2 rounded-md mr-2 hover:bg-[#8FB388] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 flex items-center">
                      <FaEdit className="mr-1.5" />
                      Éditer
                    </button>
                    <button className="bg-[#D4A59A] text-white px-4 py-2 rounded-md hover:bg-[#C49388] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 flex items-center">
                      <FaTrash className="mr-1.5" />
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;