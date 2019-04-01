<template>
  <v-footer
    id="core-footer"
    absolute
    height="82"
  >
    <div class="footer-items">
      <span
        v-for="link in links"
        :key="link.name"
      >
        <a
          :href="link.Link"
          class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
    </div>
    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="https://github.com/jmvillavicencio"
        target="_blank">Juan Manuel Villavicencio</a></span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Home', Link: '/dashboard' },
      { name: 'About Me', Link: 'https://www.linkedin.com/in/juan-manuel-villavicencio-32079558/' },
    ]
  })
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
