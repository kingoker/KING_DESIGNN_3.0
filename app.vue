<template>
  <div>
    <Header />

    <main class="pt-16">
      <NuxtPage />
    </main>
    
    <Footer />
  </div>
</template>


<script>
export default {
  head() {
    return {
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-L6XV805N79',
          async: true,
        },
      ],
    };
  },
};
</script>