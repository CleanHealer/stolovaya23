// Vercel Speed Insights initialization
// This script manually injects the Speed Insights tracking code
// Based on the @vercel/speed-insights package implementation

(function() {
  'use strict';
  
  // Create the Speed Insights interface
  window.si = window.si || function () { 
    (window.siq = window.siq || []).push(arguments); 
  };
  
  // Configuration
  const config = {
    debug: false, // Set to true for debugging in development
    sampleRate: 1, // 100% of events - adjust if needed
  };
  
  // Create and inject the script
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/speed-insights/script.js';
  
  // Append to head
  if (document.head) {
    document.head.appendChild(script);
  } else {
    // Fallback if head is not yet available
    document.addEventListener('DOMContentLoaded', function() {
      document.head.appendChild(script);
    });
  }
  
  // Optional: Add beforeSend middleware if needed
  // window.si('beforeSend', function(event) {
  //   console.log('Speed Insights event:', event);
  //   return event;
  // });
  
})();
