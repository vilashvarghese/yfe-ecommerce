module.exports = {
    purge: {
      enabled: true,
      content: ['./yf-src/**/*.svelte'],
    },
    theme: {
      extend: {},
      boxShadow: {
       'selected': '0 35px 60px -15px rgba(0, 144, 208, 0.4)',
      }
    },
    variants: {},
    plugins: [],
};
  