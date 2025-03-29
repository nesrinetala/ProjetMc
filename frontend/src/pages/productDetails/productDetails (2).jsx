import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      {/* Affichez les autres détails du produit */}
    </div>
  );
};

ProductDetails.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductDetails;