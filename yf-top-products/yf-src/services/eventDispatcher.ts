const triggerProductAddToCart = (product) => {

  const event = new CustomEvent("product:addToCart", {
    detail: product,
    bubbles: false,
    cancelable: true,
  });

  window.dispatchEvent(event);
};

export { triggerProductAddToCart }
