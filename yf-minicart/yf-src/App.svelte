
<script lang="ts">
  import { _, setupI18n } from "./services/i18nService";
  export let lang = "en";
  interface Product {
    id: string;
    thumbnail: string;
    name: string;
    qty: number;
    price: number;
    priceFormatted: string;
  }
  let totalAmount:number = 0;
  let products: Product[] = [];
  let isCartOpen:boolean = false;


  window.addEventListener('product:addToCart', (e: any) => {
    let _newProductToAdd:any = e.detail
    addToCart(_newProductToAdd)
  });

  const addToCart = (newProduct:Product) => {
      const checkIfProductExist = products.find(product => product.id === newProduct.id)
      if (checkIfProductExist) {
        checkIfProductExist.qty += 1
        products = [...products]
      } else {
        newProduct.qty = 1
        products = [...products, newProduct]
      }
  }

  const removeProduct = (productId) => {
      const newProductList = products.filter(product => product.id !== productId)
      products = newProductList
  }

  const toggleCartDisplay = () => {
      isCartOpen = !isCartOpen
  }


  $: {
    setupI18n(lang);
  }

  $: {
    totalAmount = products.reduce((total, product) => {
      total += product.qty * product.price
      return total
    }, 0)
  }
</script>
<style lang="scss">
  @import "./style.scss";
</style>

<!--- Configure SPA ---->
<svelte:options tag="cmp-mini-cart" />

<button class="btn py-2 px-4 flex shadow-md no-underline bg-purple-700 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-gray-500 hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
  on:click={() => {toggleCartDisplay()}}>
  <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
  </svg>
  ({products.length})
</button>

<div class="fixed inset-0 overflow-hidden" class:hidden="{!isCartOpen}">
  <div class="absolute inset-0 overflow-hidden ease-in-out duration-500 {isCartOpen ? 'opacity-100' : 'opacity-0'}">
    <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="{!isCartOpen}"></div>
    <section 
      class="absolute inset-y-0 right-0 pl-10 max-w-full flex transform transition ease-in-out duration-500 sm:duration-700 {isCartOpen ? 'translate-x-0' : 'translate-x-full'}" 
      aria-labelledby="slide-over-heading">
      <div class="relative w-screen max-w-md ease-in-out duration-500 {isCartOpen ? 'opacity-100' : 'opacity-0'}">
        <div class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
          <button class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            on:click={() => {toggleCartDisplay()}}>
            <span class="sr-only">{$_('cart.close')}</span>
            <!-- Heroicon name: outline/x -->
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="{!isCartOpen}">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
          <div class="px-4 sm:px-6">
            <h2 id="slide-over-heading" class="text-lg font-medium text-gray-900">
              {$_('cart.title')} ({products.length})
            </h2>
          </div>
          <div class="mt-6 relative flex-1 px-4 sm:px-6">
            <div class="absolute inset-0 px-4 sm:px-6 flex flex-col justify-between">
              <div class="p-4 border-2 border-dashed border-gray-200" aria-hidden="{!isCartOpen}">
                {#if products.length > 0}
                <ul class="flex flex-col p-4">
                  {#each products as product}
                  <li class="border-gray-400 flex flex-row mb-2">
                      <div class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                      <div class="flex flex-col rounded-md w-20 h-20 justify-center items-center mr-4">
                        <img alt="thumbnail" src="{product.thumbnail}" class="w-full" />
                      </div>
                      <div class="flex-1 pl-1 mr-16">
                        <div class="font-medium text-md pb-2">{product.name}</div>
                        <div class="text-gray-600 text-sm pb-2">{product.price} EUR x {product.qty}</div>
                        <button
                          on:click={() => removeProduct(product.id)}
                          class="btn py-2 px-4 shadow-md no-underline rounded-full bg-purple-700 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">
                          {$_('cart.remove')}
                        </button>
                      </div>
                      </div>
                  </li>
                  {/each}
                </ul>
                {/if}
                {#if products.length <= 0}
                  <p class="p-4">{$_('cart.noProductsFound')}</p>
                {/if}
              </div>
              <div class="flex flex-row p-4 justify-between border-t border-gray-600">
                <div class="font-medium text-lg">
                  {$_('cart.total')}
                </div>
                <div class="font-medium text-lg">
                  {totalAmount} EUR
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>