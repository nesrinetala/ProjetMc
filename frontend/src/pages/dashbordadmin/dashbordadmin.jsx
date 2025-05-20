import { useState } from 'react';
import { 
  FaCrown, FaUsers, FaBoxOpen, FaFileInvoice, 
  FaChartLine, FaCog, FaEdit, FaTrash, 
  FaSearch, FaBell, FaUserCircle,
  FaSort, FaSortUp, FaSortDown
} from 'react-icons/fa';

const AdminDashboard = () => {
  // État pour les produits avec données initiales
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Sérum Éclat Doré",
      price: 49.99,
      stock: 15,
      seller: "Amel Rachedi",
      status: "Disponible",
      category: "Soin Visage",
      dateAdded: "2023-05-15"
    },
    {
      id: 2,
      name: "Crème Nuit Régénérante",
      price: 59.99,
      stock: 8,
      seller: "Tala Ighil",
      status: "Disponible",
      category: "Soin Visage",
      dateAdded: "2023-06-22"
    },
    {
      id: 3,
      name: "Masque Purifiant à l'Argile",
      price: 32.50,
      stock: 22,
      seller: "Nesrine Salhi",
      status: "Disponible",
      category: "Masque",
      dateAdded: "2023-04-10"
    },
    {
      id: 4,
      name: "Huile Nourrissante Cheveux",
      price: 28.75,
      stock: 3,
      seller: "Lydia Rahmani",
      status: "Stock faible",
      category: "Soin Capillaire",
      dateAdded: "2023-07-05"
    },
    {
      id: 5,
      name: "Gommage Corps Doux",
      price: 24.90,
      stock: 12,
      seller: "Nawal Tala",
      status: "Disponible",
      category: "Soin Corps",
      dateAdded: "2023-06-18"
    }
  ]);

  // États pour les fonctionnalités
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [activeTab, setActiveTab] = useState('products');
  const [notifications, setNotifications] = useState(3);
  const [isEditing, setIsEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Fonction de tri
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Fonction pour obtenir l'icône de tri
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="ml-1 opacity-50" />;
    return sortConfig.direction === 'asc' 
      ? <FaSortUp className="ml-1" /> 
      : <FaSortDown className="ml-1" />;
  };

  // Produits triés et filtrés
  const sortedProducts = [...products].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gestion de l'édition
  const handleEdit = (product) => {
    setIsEditing(product.id);
    setEditForm({ ...product });
  };

  const handleSave = (id) => {
    setProducts(products.map(p => p.id === id ? editForm : p));
    setIsEditing(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Statistiques calculées
  const stats = {
    totalProducts: products.length,
    lowStock: products.filter(p => p.stock < 5).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  };

  return (
    <div className="flex min-h-screen bg-[#F5F0E6] text-[#6D5C54] font-sans">
      {/* Sidebar avec la palette de couleurs */}
      <div className="w-64 fixed h-screen bg-gradient-to-b from-[#B17973] to-[#8C6A5D] text-white p-6 shadow-xl">
        <div className="flex items-center justify-center mb-8 pb-4 border-b border-[#D7A8A2]">
          <FaCrown className="mr-2 text-[#F0E2DA] text-xl" />
          <h2 className="text-xl font-bold">BeautyAdmin</h2>
        </div>
        
        <nav className="space-y-1">
          {[
            { icon: <FaUsers className="mr-3" />, name: "Utilisateurs", key: "users" },
            { icon: <FaBoxOpen className="mr-3" />, name: "Produits", key: "products" },
            { icon: <FaFileInvoice className="mr-3" />, name: "Commandes", key: "orders" },
            { icon: <FaChartLine className="mr-3" />, name: "Statistiques", key: "stats" },
            { icon: <FaCog className="mr-3" />, name: "Paramètres", key: "settings" }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 
                ${activeTab === item.key ? 'bg-[#D7A8A2] text-white shadow-md' : 'text-[#F0E2DA] hover:bg-[#B17973] hover:text-white'}`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        {/* Top Bar */}
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center border-b border-[#E8D5C9]">
          <div className="relative w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8C6A5D]" />
            <input
              type="text"
              placeholder="Rechercher produits, vendeurs..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E8D5C9] focus:outline-none focus:ring-2 focus:ring-[#B17973] focus:border-transparent text-[#6D5C54]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-[#8C6A5D] hover:text-[#B17973]">
              <FaBell className="text-xl" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 bg-[#B17973] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <div className="flex items-center space-x-2">
              <FaUserCircle className="text-2xl text-[#B17973]" />
              <span className="font-medium text-[#6D5C54]">Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8D5C9]">
              <h3 className="text-[#8C6A5D] font-medium">Produits</h3>
              <p className="text-3xl font-bold text-[#B17973]">{stats.totalProducts}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8D5C9]">
              <h3 className="text-[#8C6A5D] font-medium">Stock faible</h3>
              <p className="text-3xl font-bold text-[#D7A8A2]">{stats.lowStock}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8D5C9]">
              <h3 className="text-[#8C6A5D] font-medium">Valeur totale</h3>
              <p className="text-3xl font-bold text-[#8C6A5D]">{stats.totalValue.toFixed(2)}€</p>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#E8D5C9]">
            <div className="px-6 py-4 border-b border-[#E8D5C9] flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center text-[#B17973]">
                <FaBoxOpen className="mr-2" />
                Gestion des produits
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#E8D5C9]">
                <thead className="bg-[#F5F0E6]">
                  <tr>
                    {[
                      { key: 'id', label: 'ID' },
                      { key: 'name', label: 'Produit' },
                      { key: 'price', label: 'Prix' },
                      { key: 'stock', label: 'Stock' },
                      { key: 'category', label: 'Catégorie' },
                      { key: 'seller', label: 'Vendeur' },
                      { key: 'status', label: 'Statut' },
                      { key: 'actions', label: 'Actions' }
                    ].map((header) => (
                      <th 
                        key={header.key}
                        className="px-6 py-3 text-left text-xs font-medium text-[#6D5C54] uppercase tracking-wider cursor-pointer hover:bg-[#E8D5C9]"
                        onClick={() => header.key !== 'actions' && requestSort(header.key)}
                      >
                        <div className="flex items-center">
                          {header.label}
                          {header.key !== 'actions' && getSortIcon(header.key)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#E8D5C9]">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-[#F5F0E6]">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#6D5C54]">
                        {product.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6D5C54]">
                        {isEditing === product.id ? (
                          <input
                            type="text"
                            className="border rounded px-2 py-1 w-full border-[#E8D5C9] focus:ring-[#B17973] focus:border-[#B17973]"
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          />
                        ) : (
                          product.name
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6D5C54]">
                        {isEditing === product.id ? (
                          <input
                            type="number"
                            className="border rounded px-2 py-1 w-20 border-[#E8D5C9] focus:ring-[#B17973] focus:border-[#B17973]"
                            value={editForm.price}
                            onChange={(e) => setEditForm({...editForm, price: parseFloat(e.target.value)})}
                          />
                        ) : (
                          `${product.price.toFixed(2)}€`
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6D5C54]">
                        {isEditing === product.id ? (
                          <input
                            type="number"
                            className="border rounded px-2 py-1 w-20 border-[#E8D5C9] focus:ring-[#B17973] focus:border-[#B17973]"
                            value={editForm.stock}
                            onChange={(e) => setEditForm({...editForm, stock: parseInt(e.target.value)})}
                          />
                        ) : (
                          product.stock
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6D5C54]">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6D5C54]">
                        {product.seller}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${product.status === 'Disponible' ? 'bg-[#E8D5C9] text-[#6D5C54]' : 'bg-[#D7A8A2] text-[#5A4A42]'}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {isEditing === product.id ? (
                          <button
                            onClick={() => handleSave(product.id)}
                            className="text-[#B17973] hover:text-[#8C6A5D] mr-3 bg-[#F0E2DA] px-3 py-1 rounded"
                          >
                            Sauvegarder
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-[#B17973] hover:text-[#8C6A5D] mr-3"
                          >
                            <FaEdit className="inline mr-1" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-[#D7A8A2] hover:text-[#B17973]"
                        >
                          <FaTrash className="inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;