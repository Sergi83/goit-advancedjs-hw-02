import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f as m,i as h}from"./assets/vendor-651d7991.js";const e={dateInput:document.querySelector("#datetime-picker"),startBtn:document.querySelector("button[data-start]"),days:document.querySelector("span[data-days]"),hours:document.querySelector("span[data-hours]"),minutes:document.querySelector("span[data-minutes]"),seconds:document.querySelector("span[data-seconds]")};let d=null,n=0;const f={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){n=t[0]-Date.now(),n<0?(e.startBtn.disabled=!0,h.show({position:"topRight",backgroundColor:"red",messageColor:"white",message:"Please choose a date in the future"})):e.startBtn.disabled=!1}};m(e.dateInput,f);e.startBtn.addEventListener("click",p);function p(){e.startBtn.disabled=!0,e.dateInput.disabled=!0,d=setInterval(()=>{n<1e3&&(clearInterval(d),e.startBtn.disabled=!1,e.dateInput.disabled=!1);const{days:t,hours:o,minutes:a,seconds:s}=C(n);n-=1e3,y(t,o,a,s)},1e3)}function y(t,o,a,s){e.days.textContent=r(t),e.hours.textContent=r(o),e.minutes.textContent=r(a),e.seconds.textContent=r(s)}function r(t){return t.toString().padStart(2,"0")}function C(t){const u=Math.floor(t/864e5),c=Math.floor(t%864e5/36e5),i=Math.floor(t%864e5%36e5/6e4),l=Math.floor(t%864e5%36e5%6e4/1e3);return{days:u,hours:c,minutes:i,seconds:l}}
//# sourceMappingURL=commonHelpers2.js.map
