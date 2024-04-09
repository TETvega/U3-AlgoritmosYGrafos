document.getElementById("defaultOpen").click();

function abrirTab(evt, nombreTab) {
    let i, tabcontent, tablinks;
  
    // obtener todos los elementos con class="tabcontent" y ocultarlos
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // obtener todos los elementos con class="tablinks" y remover la class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // mostrar la pestaña actual y agregar una clase "active" al botón que abrió la pestaña
    document.getElementById(nombreTab).style.display = "block";
    evt.currentTarget.className += " active";
  }

// codigo proviniente de: https://www.w3schools.com/howto/howto_js_tabs.asp