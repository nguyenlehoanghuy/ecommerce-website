import productAPI from 'api/productAPI';
import { useEffect, useState } from 'react';

export default function useProductDetail(productId) {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const result = await productAPI.get(productId);
                setProduct(result.data);
            } catch (error) {
                console.log('Failed to fetch product', error);
            }
            setLoading(false);
        })();
    }, [productId]);

    return { loading, product };
}
