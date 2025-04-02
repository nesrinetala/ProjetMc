import { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AddProduct() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null
  });
  
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Produit ajouté:", product);
  };

  return (
    <div className="font-sans">
      <Navbar />
      <div className="bg-[#F5F0E6] text-[#6D5C54] min-h-screen pt-20">
        <div className="container mx-auto py-10 px-6 md:px-14 bg-white shadow-lg rounded-lg" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#B17973]">Ajouter un Produit</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div data-aos="fade-right">
              <label className="block text-[#8C6A5D] mb-2">Nom du Produit</label>
              <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
            </div>
            
            <div data-aos="fade-left">
              <label className="block text-[#8C6A5D] mb-2">Catégorie</label>
              <input type="text" name="category" value={product.category} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
            </div>
            
            <div data-aos="fade-right">
              <label className="block text-[#8C6A5D] mb-2">Prix</label>
              <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
            </div>
            
            <div data-aos="fade-left">
              <label className="block text-[#8C6A5D] mb-2">Description</label>
              <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-3 border rounded-lg" rows="4" required></textarea>
            </div>
            
            <div data-aos="fade-right">
              <label className="block text-[#8C6A5D] mb-2">Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 border rounded-lg" required />
            </div>
            
            {preview && (
              <div className="flex justify-center" data-aos="zoom-in">
                <img src={preview} alt="Prévisualisation" className="w-48 h-48 object-cover rounded-lg shadow-md" />
              </div>
            )}
            
            <button type="submit" className="w-full bg-[#B17973] hover:bg-[#D7A8A2] text-white p-3 rounded-lg transition-transform hover:scale-105">Ajouter le Produit</button>
          </form>
        </div>
      </div>
    </div>
  );
}