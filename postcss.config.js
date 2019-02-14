module.exports = {
  plugins: {
    autoprefixer: {}
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/sass/globals.sass"`
      }
    }
  }
}
