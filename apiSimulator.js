export class NetworkError extends Error {
    constructor(message) {
        super (message);
        this.name = "NetworkError";
    }
}

export class DataError extends Error {
    constructor(message) {
        super (message);
        this.name = "DataError";
    }
}
export function fetchProductCatalog () {
     return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.8) {
        resolve([
            { id: 1, name: "Laptop", price: 1200 },
            { id: 2, name: "Headphones", price: 200 },
        ]);
        } else {
        reject(new NetworkError("Failed to fetch product catalog"));
        }
    }, 1000);
    });
}

   export function fetchProductReviews (productId) {
     return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.8) {
                resolve([{ user:"Bob", rating: 4, comment: "Exdcellent product."},
                         {user:"Joy", rating: 2, comment:"Battery dies quickly"},
                         {user:"Tom", rating: 5, comment:"Good Quality"}
                        ]);
        } else {
        reject(new NetworkError('Failed to fetch reviews for product ID ${productId}')
        );
        }
    }, 1500);
    });
}
export function fetchSalesReport ()  {
     return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.8) {
        resolve(
            { totalSales:5000, unitsSold: 10, averagePrice: 200 }
        );
        } else {
        reject(new DataError("Failed to fetch sales report"));
        }
    }, 1000);
    });
};

// Retry function for network errors
export function retryPromise(fn, retries = 2) {
    return fn().catch(err => {
        if (retries > 0 && err instanceof NetworkError) {
            console.log(`Retrying due to network error. Attempts left: ${retries}`);
            return retryPromise(fn, retries - 1);
        }
        throw err;
    });
}

