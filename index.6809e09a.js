const e=document.querySelector("#search-box"),n=document.querySelector(".country-list"),l=document.querySelector(".country-info");console.log(e);let a="",o="";e.addEventListener("input",(e=>{a=e.currentTarget.value,fetch(`https://restcountries.com/v2/name/${a}?fields=name,capital,flag,languages,population`).then((e=>e.json())).then((e=>{if(o="",e.length>10)return n.innerHTML="",l.innerHTML="",console.log("Too many matches found. Please enter a more specific name.");if(e.length>1)n.innerHTML="",l.innerHTML="",e.map((e=>{o+=`<li class="item"><img src="${e.flag}" alt="Flag of ${e.name}" class="flag"><p class="country_name">${e.name}</p></li>`,console.log(o),n.innerHTML=o}));else if(1===e.length){const{name:a,flag:s,capital:i,population:t}=e[0];n.innerHTML="",console.log(e),o=`<ul><li><img src="${s}" alt="Flag of ${a}" class="one-flag"><span class="one-name"> ${a}</span></li><li><p class="one-info"><b>Capital: </b>${i}</p></li><li><p class="one-info"><b>Population: </b>${t}</p></li><li><p class="one-info"><b>Languages:</b> ${e[0].languages[0].name}</p></li></ul>`,l.innerHTML=o}}))}));
//# sourceMappingURL=index.6809e09a.js.map
