import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

function CommentSection() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Sophie L.",
      text: "J'adore ce sérum, ma peau est éclatante !",
      date: "28 mars 2025",
      avatar: "https://i.pravatar.cc/50?img=1",
    },
    {
      id: 2,
      user: "Maxime D.",
      text: "Bonne texture et parfum agréable.",
      date: "27 mars 2025",
      avatar: "https://i.pravatar.cc/50?img=2",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim() === "") return;

    const newEntry = {
      id: comments.length + 1,
      user: "Utilisateur",
      text: newComment,
      date: new Date().toLocaleDateString("fr-FR"),
      avatar: "https://i.pravatar.cc/50?img=" + (comments.length + 1),
    };
    setComments([newEntry, ...comments]);
    setNewComment("");
  };

  return (
    <section id="comments" className="py-16 px-6 md:px-14 bg-[#F5F0E6]">
      <div className="container mx-auto">
        <h2
          className="text-3xl font-bold text-center text-[#B17973] mb-8"
          data-aos="fade-up"
        >
          <MessageCircle className="inline mr-2 text-[#B17973]" />
          Avis des clients
        </h2>

        {/* Liste des commentaires */}
        <div className="space-y-6 max-w-3xl mx-auto">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white p-4 rounded-lg border border-[#D7A8A2] shadow-md flex items-start space-x-4"
                data-aos="fade-up"
              >
                <img
                  src={comment.avatar}
                  alt={comment.user}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-[#B17973]">{comment.user}</p>
                  <p className="text-[#6D5C54]">{comment.text}</p>
                  <small className="text-[#8C6A5D]">{comment.date}</small>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-[#8C6A5D]">Aucun commentaire pour le moment.</p>
          )}
        </div>

        {/* Formulaire d'ajout de commentaire */}
        <div
          className="mt-8 max-w-3xl mx-auto bg-white p-6 rounded-lg border border-[#D7A8A2] shadow-md"
          data-aos="fade-up"
        >
          <textarea
            className="w-full p-3 border border-[#D7A8A2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B17973]"
            rows="4"
            placeholder="Laissez un avis sur ce produit..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={addComment}
            className="mt-4 w-full bg-[#B17973] hover:bg-[#D7A8A2] text-white py-2 rounded-lg flex items-center justify-center transition-transform hover:scale-[1.02]"
          >
            <Send className="mr-2" /> Publier
          </button>
        </div>
      </div>
    </section>
  );
}

export default CommentSection;

