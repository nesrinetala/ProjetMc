import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Importer PropTypes
import "./productDetails.css";

const ProductDetails = ({ product, user }) => {
  const [comments, setComments] = useState([
    { user: "Alice", text: "Très bon produit !", rating: 5 },
    { user: "Bob", text: "J'aime bien, mais un peu cher.", rating: 4 },
    { user: "Emma", text: "Pas mal, mais y'a mieux.", rating: 3 },
  ]);

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);

  const addComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { user: user.name, text: newComment, rating }]);
      setNewComment("");
      setRating(5);
    }
  };

  const averageRating =
    comments.length > 0
      ? comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length
      : 0;

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p>{product.description}</p>

      <div className="average-rating">
        <span>Note moyenne :</span>
        <div className="stars">
          {"★".repeat(Math.round(averageRating))}
          {"☆".repeat(5 - Math.round(averageRating))}
        </div>
      </div>

      <div className="comments">
        <h3>Commentaires</h3>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <strong>{comment.user}</strong> :
              <span className="stars">
                {"★".repeat(comment.rating)}
                {"☆".repeat(5 - comment.rating)}
              </span>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour le moment.</p>
        )}
      </div>

      {user ? (
        <div className="add-comment">
          <h3>Ajouter un commentaire</h3>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Votre commentaire..."
          />
          <div className="rating">
            <span>Votre note :</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={star <= rating ? "selected" : ""}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
          <button onClick={addComment}>Publier</button>
        </div>
      ) : (
        <p className="login-message">
          <a href="/login">Connectez-vous</a> pour laisser un commentaire !
        </p>
      )}
    </div>
  );
};

// ✅ Validation des props avec PropTypes
ProductDetails.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default ProductDetails;
