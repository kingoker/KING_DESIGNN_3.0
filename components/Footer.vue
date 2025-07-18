<template>
  <footer class="bg-backgroundSecondary text-white pt-10 pb-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
      <!-- Логотип и название -->
      <div class="flex items-center justify-center md:justify-start space-x-3 md:space-x-4 mx-auto md:mx-0">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <img
            src="https://mir-s3-cdn-cf.behance.net/user/276/31ca23120630055.6569a05a93d8a.png"
            alt="KING DESIGNN"
            class="h-8 w-auto drop-shadow-[0_0_6px_rgba(0,255,209,0.7)]"
          />
          <span class="font-bold text-base leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 drop-shadow-[0_0_6px_rgba(0,255,209,0.8)]">KING<br />DESIGNN</span>
        </NuxtLink>
      </div>

      <!-- Навигация -->
      <nav class="flex flex-wrap justify-center gap-6 text-base font-medium w-full md:w-auto">
        <NuxtLink to="/" class="footer-link" exact>Главная</NuxtLink>
        <NuxtLink to="/portfolio" class="footer-link">Проекты</NuxtLink>
        <NuxtLink to="/about" class="footer-link">О нас</NuxtLink>
      </nav>

      <!-- Соцсети -->
      <div class="flex items-center space-x-4 justify-center md:justify-end w-full md:w-auto">
        <a href="https://t.me/king_designn" target="_blank" aria-label="Telegram" class="footer-social">
          <svg class="footer-icon text-white hover:text-primary transition-colors" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_23_201)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 15C0 23.2843 6.71575 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71575 23.2843 0 15 0C6.71575 0 0 6.71575 0 15ZM12.25 21.875L12.5052 18.0514L19.4606 11.7744C19.7658 11.5034 19.3939 11.3713 18.9887 11.6171L10.4046 17.0327L6.69669 15.8754C5.89594 15.6302 5.89019 15.08 6.87644 14.6844L21.3252 9.11306C21.9851 8.81344 22.6221 9.27156 22.3701 10.2816L19.9095 21.8769C19.7377 22.7009 19.2398 22.898 18.55 22.5174L14.8017 19.7481L13 21.5C12.9943 21.5055 12.9887 21.511 12.9831 21.5165C12.7816 21.7127 12.6148 21.875 12.25 21.875Z" fill="currentColor"/>
            </g>
            <defs>
              <clipPath id="clip0_23_201">
                <rect width="30" height="30" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </a>
        <a href="https://www.instagram.com/king_designn/" target="_blank" aria-label="Instagram" class="footer-social">
          <svg class="footer-icon text-white hover:text-primary transition-colors" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_23_206)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15 0C6.71575 0 0 6.71575 0 15C0 23.2843 6.71575 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71575 23.2843 0 15 0ZM11.7021 7.04831C12.5554 7.0095 12.8281 7 15.0007 7H14.9983C17.1716 7 17.4432 7.0095 18.2966 7.04831C19.1483 7.08731 19.7299 7.22219 20.24 7.42C20.7666 7.62419 21.2116 7.8975 21.6566 8.3425C22.1017 8.78719 22.375 9.2335 22.58 9.75969C22.7767 10.2684 22.9117 10.8497 22.9517 11.7014C22.99 12.5548 23 12.8274 23 15.0001C23 17.1727 22.99 17.4447 22.9517 18.2981C22.9117 19.1494 22.7767 19.7309 22.58 20.2398C22.375 20.7658 22.1017 21.2121 21.6566 21.6568C21.2121 22.1018 20.7665 22.3758 20.2405 22.5802C19.7314 22.778 19.1494 22.9128 18.2978 22.9518C17.4444 22.9907 17.1726 23.0002 14.9998 23.0002C12.8272 23.0002 12.5548 22.9907 11.7014 22.9518C10.8499 22.9128 10.2684 22.778 9.75937 22.5802C9.2335 22.3758 8.78719 22.1018 8.34269 21.6568C7.89781 21.2121 7.6245 20.7658 7.42 20.2396C7.22231 19.7309 7.0875 19.1496 7.04831 18.2979C7.00969 17.4446 7 17.1727 7 15.0001C7 12.8274 7.01 12.5546 7.04819 11.7012C7.0865 10.8499 7.2215 10.2684 7.41981 9.7595C7.62481 9.2335 7.89819 8.78719 8.34319 8.3425C8.78788 7.89769 9.23419 7.62431 9.76038 7.42C10.2691 7.22219 10.8504 7.08731 11.7021 7.04831Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2831 8.4417C14.4224 8.44151 14.5724 8.44157 14.7341 8.44164L15.0008 8.4417C17.1368 8.4417 17.39 8.44938 18.2335 8.4877C19.0135 8.52338 19.4368 8.6537 19.7188 8.7632C20.0922 8.9082 20.3583 9.08157 20.6382 9.36157C20.9182 9.64157 21.0915 9.90826 21.2369 10.2816C21.3464 10.5633 21.4769 10.9866 21.5124 11.7666C21.5507 12.6099 21.559 12.8633 21.559 14.9983C21.559 17.1333 21.5507 17.3866 21.5124 18.23C21.4767 19.01 21.3464 19.4333 21.2369 19.715C21.0919 20.0883 20.9182 20.3542 20.6382 20.634C20.3582 20.914 20.0923 21.0874 19.7188 21.2324C19.4372 21.3424 19.0135 21.4724 18.2335 21.508C17.3901 21.5464 17.1368 21.5547 15.0008 21.5547C12.8646 21.5547 12.6114 21.5464 11.7681 21.508C10.9881 21.472 10.5648 21.3417 10.2826 21.2322C9.90926 21.0872 9.64257 20.9138 9.36257 20.6338C9.08257 20.3538 8.90926 20.0878 8.76388 19.7143C8.65438 19.4327 8.52388 19.0093 8.48838 18.2293C8.45007 17.386 8.44238 17.1326 8.44238 14.9963C8.44238 12.8599 8.45007 12.6079 8.48838 11.7646C8.52407 10.9846 8.65438 10.5613 8.76388 10.2793C8.90888 9.90588 9.08257 9.63926 9.36257 9.35926C9.64257 9.07926 9.90926 8.90588 10.2826 8.76057C10.5646 8.65057 10.9881 8.52057 11.7681 8.4847C12.5061 8.45138 12.7921 8.44138 14.2831 8.4397V8.4417ZM19.2712 9.77007C18.7412 9.77007 18.3111 10.1996 18.3111 10.7298C18.3111 11.2598 18.7412 11.6898 19.2712 11.6898C19.8012 11.6898 20.2312 11.2598 20.2312 10.7298C20.2312 10.1998 19.8012 9.77007 19.2712 9.77007ZM10.8924 15.0001C10.8924 12.7313 12.7318 10.8918 15.0006 10.8918C17.2695 10.8918 19.1085 12.7313 19.1085 15.0001C19.1085 17.269 17.2696 19.1077 15.0008 19.1077C12.7319 19.1077 10.8924 17.269 10.8924 15.0001Z" fill="currentColor"/>
              <path d="M15.0008 12.3335C16.4735 12.3335 17.6675 13.5274 17.6675 15.0002C17.6675 16.4729 16.4735 17.6669 15.0008 17.6669C13.528 17.6669 12.3341 16.4729 12.3341 15.0002C12.3341 13.5274 13.528 12.3335 15.0008 12.3335Z" fill="currentColor"/>
            </g>
            <defs>
              <clipPath id="clip0_23_206">
                <rect width="30" height="30" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </a>
        <a href="https://youtube.com/" target="_blank" aria-label="YouTube" class="footer-social">
          <svg class="footer-icon text-white hover:text-primary transition-colors" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_23_203)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15 0C6.71575 0 0 6.71575 0 15C0 23.2843 6.71575 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71575 23.2843 0 15 0ZM21.251 9.84331C21.9394 10.0323 22.4816 10.5889 22.6656 11.2957C23 12.5769 23 15.25 23 15.25C23 15.25 23 17.923 22.6656 19.2043C22.4816 19.9111 21.9394 20.4678 21.251 20.6567C20.0034 21 15 21 15 21C15 21 9.99662 21 8.74894 20.6567C8.06044 20.4678 7.51825 19.9111 7.33425 19.2043C7 17.923 7 15.25 7 15.25C7 15.25 7 12.5769 7.33425 11.2957C7.51825 10.5889 8.06044 10.0323 8.74894 9.84331C9.99662 9.5 15 9.5 15 9.5C15 9.5 20.0034 9.5 21.251 9.84331Z" fill="currentColor"/>
              <path d="M13.5 18V13L17.5 15.5001L13.5 18Z" fill="currentColor"/>
            </g>
            <defs>
              <clipPath id="clip0_23_203">
                <rect width="30" height="30" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </a>
      </div>
    </div>
    <div class="border-t border-[#232a38] mt-8 pt-4">
      <p class="text-center text-gray-400 text-sm">© 2025 KING DESIGNN</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer-link {
  color: #fff;
  transition: color 0.2s;
  text-decoration: none;
}
.footer-link.router-link-exact-active,
.footer-link.router-link-active {
  color: #24F038;
}
.footer-link:hover {
  color: #24F038;
}
.footer-social .footer-icon {
  transition: color 0.2s;
}
@media (max-width: 768px) {
  footer > div {
    flex-direction: column !important;
    align-items: center !important;
    gap: 2rem !important;
  }
  footer .flex.items-center {
    justify-content: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  footer nav {
    justify-content: center !important;
    width: 100% !important;
  }
}
</style>
