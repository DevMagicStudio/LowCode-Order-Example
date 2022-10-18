import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  // Easing Mode
  easing: 'ease',
  // Speed
  speed: 500,
  // Is show Loading ico
  showSpinner: true,
  // Auto increment interval
  trickleSpeed: 200,
  // Minimum percentage at initialization
  minimum: 0.3
})

export default NProgress
