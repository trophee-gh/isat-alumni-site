// copy button, map quick views, promo filter. No network.
(function(){
  document.querySelectorAll("[data-copy]").forEach(function(b){
    b.addEventListener("click",function(){
      var t=b.getAttribute("data-copy"),o=document.getElementById(b.getAttribute("aria-controls"));
      function ok(){if(o)o.textContent=o.getAttribute("data-ok");}
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,fb);}else fb();
      function fb(){var a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();try{document.execCommand("copy");ok();}catch(e){}a.remove();}
    });
  });
  var views={monde:"0 0 720 280",europe:"330 40 120 66",ameriques:"20 10 300 165",asie:"470 40 230 160"};
  var m=document.getElementById("map-full");
  document.querySelectorAll("[data-view]").forEach(function(b){
    b.addEventListener("click",function(){
      var v=b.getAttribute("data-view");if(m)m.setAttribute("viewBox",views[v]);
      document.querySelectorAll("[data-view]").forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});
      if(m)m.querySelectorAll(".mk").forEach(function(k){k.classList.toggle("dim",v!=="monde"&&k.getAttribute("data-zone")!==v);});
    });
  });
  var s=document.getElementById("promo"),out=document.getElementById("promo-out");
  if(s&&out)s.addEventListener("change",function(){
    out.textContent=s.value==="toutes"?out.getAttribute("data-all"):"Promo "+s.value+" : 0 fiche opt-in publiée pour l'instant. Effectif par pays : TBD.";
  });
  var f=document.getElementById("offre");
  if(f)f.addEventListener("submit",function(e){e.preventDefault();document.getElementById("form-out").textContent="Maquette : rien n'est envoyé tant que l'hébergement (Netlify Forms) n'est pas décidé. Utilisez l'adresse ci-dessus.";});
})();
