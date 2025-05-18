import React, { useState, useRef, useEffect } from "react";
import { FiEdit, FiSettings, FiPlus, FiImage, FiX } from "react-icons/fi";
import { FaStore, FaChartLine, FaHeart, FaUser } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profil() {
  const [favorite, setFavorite] = useState(false);
  const [user, setUser] = useState({
    username: "lana_glow",
    fullName: "Lana Glow",
    bio: "You can't control the wind, but you can adjust your sails.",
    avatar: null,
    stats: {
      products: 15,
      clients: 145,
      orders: 42,
    },
    personalInfo: {
      email: "lana@example.com",
      phone: "+33 6 12 34 56 78",
      address: "Paris, France"
    },
    productsList: [
      { id: 1, name: "Crème hydratante", image: "https://via.placeholder.com/150" },
      { id: 2, name: "Masque facial", image: "https://via.placeholder.com/150" },
      { id: 3, name: "Gel douche", image: "https://via.placeholder.com/150" }
    ],
    clientsList: [
      { id: 1, name: "Sophie Martin", image: "https://via.placeholder.com/150" },
      { id: 2, name: "Emma Johnson", image: "https://via.placeholder.com/150" },
      { id: 3, name: "Léa Dubois", image: "https://via.placeholder.com/150" }
    ],
    ordersList: [
      { id: 1, name: "Commande #1254", image: "https://via.placeholder.com/150" },
      { id: 2, name: "Commande #1255", image: "https://via.placeholder.com/150" },
      { id: 3, name: "Commande #1256", image: "https://via.placeholder.com/150" }
    ]
  });

  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(true); // Changé à true par défaut
  const [editForm, setEditForm] = useState({
    fullName: "Lana Glow",
    bio: "You can't control the wind, but you can adjust your sails.",
    email: "lana@example.com",
    phone: "+33 6 12 34 56 78",
    address: "Paris, France"
  });
  const [showList, setShowList] = useState(null);

  const fileInputRef = useRef(null);
  const avatarMenuRef = useRef(null);
  const profileRef = useRef(null);

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    setShowAvatarMenu(!showAvatarMenu);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La taille de l'image ne doit pas dépasser 5MB");
        return;
      }
      
      if (!file.type.match('image.*')) {
        toast.error("Veuillez sélectionner une image valide (JPEG, PNG, etc.)");
        return;
      }

      const reader = new FileReader();
      reader.onloadstart = () => {
        toast.info("Chargement de l'image...");
      };
      reader.onload = (event) => {
        setTimeout(() => {
          setUser({...user, avatar: event.target.result});
          toast.success("Photo de profil mise à jour !");
          setShowAvatarMenu(false);
        }, 1500);
      };
      reader.onerror = () => {
        toast.error("Erreur lors du chargement de l'image");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChooseFromLibrary = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
    setShowAvatarMenu(false);
  };

  const handleRemovePhoto = (e) => {
    e.stopPropagation();
    toast.info("Suppression de la photo de profil...");
    setTimeout(() => {
      setUser({...user, avatar: null});
      toast.success("Photo de profil supprimée !");
      setShowAvatarMenu(false);
    }, 1000);
  };

  const toggleEditProfile = () => {
    setIsEditingProfile(!isEditingProfile);
    if (!isEditingProfile) {
      setEditForm({
        fullName: user.fullName,
        bio: user.bio,
        email: user.personalInfo.email,
        phone: user.personalInfo.phone,
        address: user.personalInfo.address
      });
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveProfileChanges = () => {
    toast.info("Enregistrement des modifications...");
    setTimeout(() => {
      setUser({
        ...user,
        fullName: editForm.fullName,
        bio: editForm.bio,
        personalInfo: {
          email: editForm.email,
          phone: editForm.phone,
          address: editForm.address
        }
      });
      toast.success("Profil mis à jour avec succès !");
      setIsEditingProfile(false);
    }, 1500);
  };

  const toggleList = (listType) => {
    setShowList(showList === listType ? null : listType);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarMenuRef.current && 
          !avatarMenuRef.current.contains(event.target) && 
          (!fileInputRef.current || !fileInputRef.current.contains(event.target))) {
        setShowAvatarMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loadAOS = async () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/aos@next/dist/aos.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/aos@next/dist/aos.js';
      script.onload = () => {
        window.AOS.init({
          duration: 1400,
          once: true,
          offset: 100,
        });
      };
      document.body.appendChild(script);

      return () => {
        document.head.removeChild(link);
        document.body.removeChild(script);
      };
    };

    loadAOS();

    const remixIcons = document.createElement('link');
    remixIcons.href = 'https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css';
    remixIcons.rel = 'stylesheet';
    document.head.appendChild(remixIcons);

    return () => {
      document.head.removeChild(remixIcons);
    };
  }, []);

  return (
    <div className="font-sans">
      <Navbar />
      <div className="bg-[#F5F0E6] text-[#6D5C54] min-h-screen pt-20">
        {/* Hero Section */}
        <section 
          className="py-12 px-4 md:px-14 bg-gradient-to-r from-[#F5F0E6] to-[#E8D9C5]"
          data-aos="fade-in"
        >
          <div className="container mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar with edit button */}
              <div className="relative" data-aos="fade-right" data-aos-delay="200">
                <div className="relative group" onClick={handleAvatarClick}>
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#D7A8A2] shadow-lg cursor-pointer"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-[#E8D5C9] flex items-center justify-center border-4 border-[#D7A8A2] shadow-lg cursor-pointer">
                      <FaUser className="text-5xl text-[#8C6A5D]" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <FiEdit className="text-white text-2xl" />
                  </div>
                </div>
                
                {/* Photo selection menu */}
                {showAvatarMenu && (
                  <div 
                    ref={avatarMenuRef}
                    className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-[#D7A8A2]"
                    style={{ zIndex: 1000 }}
                    data-aos="fade-down"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="py-1">
                      <button
                        onClick={handleChooseFromLibrary}
                        className="flex items-center px-4 py-2 text-sm text-[#6D5C54] hover:bg-[#F5F0E6] w-full text-left"
                      >
                        <FiImage className="mr-2 text-[#B17973]" />
                        Choisir une photo
                      </button>
                      {user.avatar && (
                        <button
                          onClick={handleRemovePhoto}
                          className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-[#F5F0E6] w-full text-left"
                        >
                          <FiX className="mr-2" />
                          Supprimer la photo
                        </button>
                      )}
                    </div>
                  </div>
                )}
                
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left" data-aos="fade-left" data-aos-delay="300">
                {isEditingProfile ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="fullName"
                      value={editForm.fullName}
                      onChange={handleEditChange}
                      className="text-3xl font-bold text-[#B17973] bg-[#F5F0E6] rounded px-3 py-2 w-full border border-[#D7A8A2]"
                    />
                    <textarea
                      name="bio"
                      value={editForm.bio}
                      onChange={handleEditChange}
                      className="text-[#8C6A5D] italic bg-[#F5F0E6] rounded px-3 py-2 w-full border border-[#D7A8A2]"
                      rows="2"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-[#B17973]">{user.fullName}</h2>
                    <p className="text-[#8C6A5D] italic text-lg mt-2">"{user.bio}"</p>
                  </>
                )}

                {/* Stats */}
                <div className="flex justify-center md:justify-start space-x-8 my-6">
                  <button 
                    onClick={() => toggleList('products')}
                    className="text-center hover:opacity-80 transition-opacity group"
                    data-aos="fade-up" 
                    data-aos-delay="400"
                  >
                    <div className="text-2xl font-bold text-[#B17973] group-hover:text-[#8C6A5D] transition-colors">
                      {user.stats.products || 0}
                    </div>
                    <div className="text-sm text-[#8C6A5D]">Produits</div>
                  </button>
                  <button 
                    onClick={() => toggleList('clients')}
                    className="text-center hover:opacity-80 transition-opacity group"
                    data-aos="fade-up" 
                    data-aos-delay="500"
                  >
                    <div className="text-2xl font-bold text-[#B17973] group-hover:text-[#8C6A5D] transition-colors">
                      {user.stats.clients || 0}
                    </div>
                    <div className="text-sm text-[#8C6A5D]">Clients</div>
                  </button>
                  <button 
                    onClick={() => toggleList('orders')}
                    className="text-center hover:opacity-80 transition-opacity group"
                    data-aos="fade-up" 
                    data-aos-delay="600"
                  >
                    <div className="text-2xl font-bold text-[#B17973] group-hover:text-[#8C6A5D] transition-colors">
                      {user.stats.orders || 0}
                    </div>
                    <div className="text-sm text-[#8C6A5D]">Commandes</div>
                  </button>
                </div>
              </div>

              {/* Edit Profile Button */}
              <div data-aos="fade-left" data-aos-delay="700">
                {isEditingProfile ? (
                  <div className="flex space-x-3">
                    <button 
                      className="flex items-center space-x-2 px-6 py-3 bg-[#B17973] text-white rounded-md hover:bg-[#D7A8A2] transition"
                      onClick={saveProfileChanges}
                    >
                      <span>Enregistrer</span>
                    </button>
                    <button 
                      className="flex items-center space-x-2 px-6 py-3 bg-[#8C6A5D] text-white rounded-md hover:bg-[#6D5C54] transition"
                      onClick={toggleEditProfile}
                    >
                      <span>Annuler</span>
                    </button>
                  </div>
                ) : (
                  <button 
                    className="flex items-center space-x-2 px-6 py-3 bg-[#B17973] text-white rounded-md hover:bg-[#D7A8A2] transition"
                    onClick={toggleEditProfile}
                  >
                    <FiEdit />
                    <span>Modifier profil</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Liste des produits/clients/commandes */}
        {showList && (
          <section className="py-12 px-4 md:px-14 bg-[#E8D5C9]" data-aos="fade-up">
            <div className="container mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-[#B17973]">
                  {showList === 'products' && 'Mes produits'}
                  {showList === 'clients' && 'Mes clients'}
                  {showList === 'orders' && 'Mes commandes'}
                </h3>
                <button 
                  onClick={() => setShowList(null)}
                  className="text-[#8C6A5D] hover:text-[#B17973] transition"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(showList === 'products' ? user.productsList : 
                  showList === 'clients' ? user.clientsList : 
                  user.ordersList).map(item => (
                  <div 
                    key={item.id} 
                    className="bg-white p-4 rounded-lg shadow-sm border border-[#D7A8A2] hover:shadow-md transition"
                    data-aos="zoom-in"
                  >
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-full object-cover border border-[#E8D5C9]"
                      />
                      <div>
                        <h4 className="text-lg font-medium text-[#5A4A42]">{item.name}</h4>
                        <p className="text-sm text-[#8C6A5D]">
                          {showList === 'products' && 'Produit cosmétique'}
                          {showList === 'clients' && 'Client fidèle'}
                          {showList === 'orders' && 'Commande récente'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Personal Information Section */}
        <section className="py-12 px-4 md:px-14 bg-[#F5F0E6]" data-aos="fade-up">
          <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 border border-[#E8D5C9]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#B17973]">Informations personnelles</h3>
                <div className="flex items-center space-x-4">
                  <button 
                    className="flex items-center text-[#B17973] hover:text-[#D7A8A2] transition"
                    onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                  >
                    {showPersonalInfo ? (
                      <>
                        <FiX className="mr-2" />
                        <span>Fermer</span>
                      </>
                    ) : (
                      <>
                        <FiPlus className="mr-2" />
                        <span>Voir plus</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={async () => {
                      try {
                        const newFavoriteStatus = !favorite;
                        await axios.post('http://localhost:8000/api/favoris/', {
                          produit_id: 1,
                          action: newFavoriteStatus ? 'ajouter' : 'supprimer'
                        }, {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                          }
                        });
                        setFavorite(newFavoriteStatus);
                        toast.success(
                          newFavoriteStatus 
                            ? 'Ajouté aux favoris!' 
                            : 'Retiré des favoris',
                          {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                          }
                        );
                      } catch (error) {
                        toast.error("Erreur lors de la mise à jour des favoris");
                        console.error(error);
                      }
                    }}
                    className="text-[#B17973] hover:text-[#D7A8A2] transition"
                  >
                    <FaHeart className="text-2xl" fill={favorite ? "#B17973" : "transparent"} stroke="#B17973" />
                  </button>
                </div>
              </div>
              
              {showPersonalInfo && (
                isEditingProfile ? (
                  <div className="space-y-6" data-aos="fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="text-[#8C6A5D] mb-2 font-medium">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={editForm.email}
                          onChange={handleEditChange}
                          className="border border-[#E8D5C9] rounded px-4 py-2 bg-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#D7A8A2]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[#8C6A5D] mb-2 font-medium">Téléphone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={editForm.phone}
                          onChange={handleEditChange}
                          className="border border-[#E8D5C9] rounded px-4 py-2 bg-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#D7A8A2]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[#8C6A5D] mb-2 font-medium">Adresse</label>
                      <input
                        type="text"
                        name="address"
                        value={editForm.address}
                        onChange={handleEditChange}
                        className="border border-[#E8D5C9] rounded px-4 py-2 bg-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#D7A8A2]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4" data-aos="fade-up">
                    <div className="flex justify-between py-3 border-b border-[#E8D5C9]">
                      <span className="text-[#8C6A5D] font-medium">Email</span>
                      <span className="text-[#5A4A42]">{user.personalInfo.email}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#E8D5C9]">
                      <span className="text-[#8C6A5D] font-medium">Téléphone</span>
                      <span className="text-[#5A4A42]">{user.personalInfo.phone}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#E8D5C9]">
                      <span className="text-[#8C6A5D] font-medium">Adresse</span>
                      <span className="text-[#5A4A42]">{user.personalInfo.address}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Social media links */}
        <div className="fixed left-4 md:left-8 top-1/2 transform -translate-y-1/2 hidden md:block">
          <div className="flex flex-col space-y-6">
            <a href="#" className="text-[#B17973] hover:text-[#D7A8A2] transition text-xl" data-aos="fade-in" data-aos-delay="200">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href="#" className="text-[#B17973] hover:text-[#D7A8A2] transition text-xl" data-aos="fade-in" data-aos-delay="300">
              <i className="ri-instagram-line"></i>
            </a>
            <a href="#" className="text-[#B17973] hover:text-[#D7A8A2] transition text-xl" data-aos="fade-in" data-aos-delay="400">
              <i className="ri-pinterest-line"></i>
            </a>
          </div>
        </div>

        <footer className="text-center py-8 bg-[#5A4A42] text-white font-bold">
          <p>&copy; 2025 Mon Site - Tous droits réservés</p>
        </footer>
      </div>
    </div>
  );
}