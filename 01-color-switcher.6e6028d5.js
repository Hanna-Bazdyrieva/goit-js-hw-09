const t={body:document.querySelector("body"),startBtn:document.querySelector("button[data-start"),stopBtn:document.querySelector("button[data-stop"),output:document.querySelector(".color-output")};let o=null;t.startBtn.addEventListener("click",(function(){t.output.textContent="",o=setInterval((()=>{const o=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;t.body.style.backgroundColor=o,t.startBtn.disabled=!0,t.stopBtn.disabled=!1,t.startBtn.dataset.color=o}),1e3)})),t.stopBtn.addEventListener("click",(function(){clearInterval(o),t.startBtn.disabled=!1,t.stopBtn.disabled=!0,t.output.textContent=`HEX Color Code : ${String(t.startBtn.dataset.color).toUpperCase()}`}));
//# sourceMappingURL=01-color-switcher.6e6028d5.js.map
