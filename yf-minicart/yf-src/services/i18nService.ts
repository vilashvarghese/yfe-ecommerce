import { dictionary, init, _ } from "svelte-i18n";

dictionary.set({
    en: {
        cart: {
            title: "Shopping Cart",
            close: "Close",
            remove: "Remove",
            noProductsFound: "Sorry! you have not added any product to the cart.",
            total: "Total"
        }
    },
    de: {
        cart: {
            title: "Shopping karte",
            close: "Close",
            remove: "Remove",
            noProductsFound: "Sorry! you have not added any product to the cart.",
            total: "Total"
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
