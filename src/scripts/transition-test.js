// Transition Test Script
// This script helps to test and debug view transitions in Astro
// Place this script in your Layout.astro to debug transitions

document.addEventListener('astro:page-load', () => {
  console.log('🔄 Page transition completed');
  
  // Log transition elements
  const transitionElements = document.querySelectorAll('[transition\\:name]');
  console.log(`Found ${transitionElements.length} elements with transition:name`);
  
  // Create a map of transition names for debugging
  const transitionMap = {};
  transitionElements.forEach(el => {
    const name = el.getAttribute('transition:name');
    if (!transitionMap[name]) {
      transitionMap[name] = 0;
    }
    transitionMap[name]++;
  });
  
  // Log any duplicate transition names (could cause issues)
  Object.entries(transitionMap).forEach(([name, count]) => {
    if (count > 1) {
      console.warn(`⚠️ Duplicate transition name found: "${name}" appears ${count} times`);
    }
  });
});

document.addEventListener('astro:after-swap', () => {
  console.log('🔄 Content swap completed');
});

// Log any transition errors
document.addEventListener('astro:transition-error', (event) => {
  console.error('❌ Transition error:', event.error);
});

// Debug persisted elements
document.addEventListener('astro:before-preparation', () => {
  const persistedElements = document.querySelectorAll('[transition\\:persist]');
  console.log(`🔒 Found ${persistedElements.length} persisted elements`);
});
