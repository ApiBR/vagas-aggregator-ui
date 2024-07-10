import Switch from "react-switch";
@@ -7,0 +8,1 @@
const hideEmpty = localStorage.getItem('hideEmpty') === 'true';
@@ -9,0 +11,2 @@
  url += hideEmpty ? '&hide-empty=true' : '&hide-empty=false';
