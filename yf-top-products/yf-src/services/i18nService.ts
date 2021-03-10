import { dictionary, init, _ } from "svelte-i18n";

dictionary.set({
    en: {
      products: {
        title: "Product Listing",
        addToCart: "Add to Cart"
      }
    },
    de: {
      products: {
        title: "Product Listing",
        addToCart: "Add to Cart"
      }
    }
});

function setupI18n(lang) {
    init({
        fallbackLocale: 'de',
        initialLocale: lang,
        formats: {
            number: {
              CHF: { style: 'currency', currency: 'CHF' },
            },
        }
    })
}

export { _, setupI18n };
