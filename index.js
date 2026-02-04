import {
    fetchProductCatalog,
    fetchProductReviews,
    fetchSalesReport,
    NetworkError,
    DataError,
    retryPromise
} from './apiSimulator.js';

async function loadDashboard() {
    console.log("Loading e-commerce dashboard...");

    try {
        // Fetch product catalog with retry
        const products = await retryPromise(fetchProductCatalog);
        console.log("Products:", products);

        // Fetch reviews for each product in parallel with retry
        const productsWithReviews = await Promise.all(
            products.map(async product => {
                try {
                    const reviews = await retryPromise(() => fetchProductReviews(product.id));
                    return { ...product, reviews };
                } catch (err) {
                    console.error(`Error fetching reviews for ${product.name}:`, err.message);
                    return { ...product, reviews: [] }; // fallback
                }
            })
        );

        //console.log("Products with reviews:", productsWithReviews);
        console.log(
       "Products with reviews:",
      JSON.stringify(productsWithReviews, null, 2)
      );
        // Fetch sales report with retry
        try {
            const salesReport = await retryPromise(fetchSalesReport);
         console.log("Sales report:", JSON.stringify(salesReport, null, 2));

            //console.log("Sales report:", salesReport);
        } catch (err) {
            console.error("Error fetching sales report:", err.message);
        }

    } catch (err) {
        if (err instanceof NetworkError) {
            console.error("Network error:", err.message);
        } else if (err instanceof DataError) {
            console.error("Data error:", err.message);
        } else {
            console.error("Unknown error:", err.message);
        }
    } finally {
        console.log("All API calls attempted.");
    }
}

// Run the dashboard
loadDashboard();
