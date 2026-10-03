export const money = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

// Images live in /public/images; BASE_URL keeps paths correct if the site is hosted in a subfolder.
export const imgSrc = (file) => `${import.meta.env.BASE_URL}images/${file}`;

export const currentPrice = (product) => product.salePrice ?? product.price;

export const percentOff = (product) =>
  product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;

// Largest quantity a shopper may buy of one item: the stock on hand, capped at 10.
export const MAX_PER_ITEM = 10;
export const maxQuantityFor = (product) => Math.min(MAX_PER_ITEM, product.quantityInStock);
