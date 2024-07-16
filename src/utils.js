export const getImageUrl = (path) => {
    return new URL(`/assets/${path}`, import.meta.url).href;
};

// export const API_URL = 'https://portfolio-vvn6.onrender.com';