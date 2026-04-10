router.beforeEach((to, from, next) => { // hacia donde, desde donde, siguiente
  // Your logic here
  if (!LoginCheck()) {
    next('/Login');
  }
if (to.fullPath === '/Login') {
    next();
  }

  next();
});

Sample :
<script setup>
import DOMPurify from 'dompurify';
const cleanHTML =  DOMPurify.sanitize(userInput);
</script>
<div v-html="cleanHTML"></div>

Sample :
<script setup>
 import {sanitizeUrl} from '@braintree/sanitizeUrl';
 const safeURL = sanitizeUrl(userInput);
 </script>
 <a :href="safeURL">Safe Profile Link</a>

