document.addEventListener("DOMContentLoaded", () => {

  window.addEventListener("load", () => {
    const loader  = document.getElementById("page-loader");
    const overlay = document.getElementById("page-overlay");
  
    // 1) Oculta el loader
    if (loader) loader.classList.add("loader-hidden");
  
    // 2) Tras 0.6s, dispara la animación del overlay
    setTimeout(() => {
      if (overlay) {
        overlay.classList.add("overlay-hidden");
        // 3) Elimina el overlay al terminar la transición
        overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });
      }
    }, 600);

    initHeroADNSlider();
    initCulturaSlider();
    initRegionalidad();
    initHeroPrintSlider();
    initTipoServicios();
    initPopUp();
    initTimeline();
  });

    const header = document.getElementById("main-header")!;
    const cursor = document.getElementById("custom-cursor")!;

    // 1) Crear y anexar el contenedor
    const universe = document.createElement('div');
    universe.id = 'universe';
    document.body.appendChild(universe);

    // 2) Ajustar tamaño del contenedor para cubrir todo el contenido del body
    const setUniverseSize = () => {
      const docWidth  = document.documentElement.scrollWidth;
      const docHeight = document.documentElement.scrollHeight;
      universe.style.width  = `${docWidth}px`;
      universe.style.height = `${docHeight}px`;
    };
    setUniverseSize();
    window.addEventListener('resize', setUniverseSize);

    // 3) Configuración de las esferas (tamaño y escalonamiento)
    const sphereConfigs = [
      { size: 100, delay: 0 },
      { size: 150, delay: 0 },
      { size:  80, delay: 0 },
      { size: 130, delay: 0 },
      { size: 180, delay: 0 },
      { size: 200, delay: 0 },
      { size: 300, delay: 0 },
      { size: 150, delay: 0 },
      { size: 500, delay: 0 },
      { size: 210, delay: 0 },
      { size: 80, delay: 0 },
      { size: 190, delay: 0 }
    ];

    sphereConfigs.forEach(({ size, delay }) => {
      const sphere = document.createElement('div');
      sphere.classList.add('sphere');
      sphere.style.setProperty('--size', `${size}px`);
      sphere.style.transform = 'translate(0px, 0px)';
      universe.appendChild(sphere);

      setTimeout(() => animateSphere(sphere, universe), delay);
    });

    // 4) Función recursiva: mueve cada esfera a una posición aleatoria dentro de #universe
    function animateSphere(sphere: HTMLElement, container: HTMLElement) {
      const { width, height } = container.getBoundingClientRect();
      const maxX = width  - sphere.offsetWidth;
      const maxY = height - sphere.offsetHeight;
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      const duration = 10000 + Math.random() * 10000; // 10–20s aleatorio

      sphere.animate(
        [
          { transform: getComputedStyle(sphere).transform },
          { transform: `translate(${x}px, ${y}px)` }
        ],
        {
          duration,
          easing: 'ease-in-out',
          fill: 'forwards'
        }
      ).onfinish = () => animateSphere(sphere, container);
    }
  
    
    // Efecto scroll en header
    window.addEventListener("scroll", () => {
      header.classList.toggle("navbar-scrolled", window.scrollY > 50);
    });
  
    // Cursor personalizado
    document.addEventListener("mousemove", e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top  = `${e.clientY}px`;
    });
    
    // Animación de aparición de enlaces
    const navItems = Array.from(
        document.querySelectorAll<HTMLLIElement>(".navbar-nav .nav-item")
    );
    
    navItems.forEach((item: HTMLLIElement, idx: number) => {
        setTimeout(() => item.classList.add("visible"), idx * 100 + 200);
    });
  
    // Hover en elementos interactivos
    const interactive = document.querySelectorAll<HTMLElement>("a, button, .social-btn");
    interactive.forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.style.width       = "40px";
        cursor.style.height      = "40px";
        cursor.style.borderColor = "#81df3d";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.width       = "20px";
        cursor.style.height      = "20px";
        cursor.style.borderColor = "#81df3d";
      });
    });

    function initTimeline(): void {
      const timeline = document.querySelector<HTMLUListElement>('.timeline');
      if (!timeline) return;

      let timelineLine = timeline.querySelector<HTMLDivElement>('.timeline-line');
      if (!timelineLine) {
        timelineLine = document.createElement('div');
        timelineLine.classList.add('timeline-line');
        timeline.appendChild(timelineLine);
      }

      const actualizarLinea = () => {
        const timelineRect = timeline.getBoundingClientRect();
        const puntos = Array.from(timeline.querySelectorAll<HTMLDivElement>('.flag-wrapper'));

        const visibles = puntos.filter(punto => {
          const puntoRect = punto.getBoundingClientRect();
          return (
            puntoRect.top < timelineRect.bottom &&
            puntoRect.bottom > timelineRect.top
          );
        });

        if (visibles.length === 0) {
          timelineLine!.style.height = '0px';
          return;
        }

        const primero = visibles[0];
        const ultimo = visibles[visibles.length - 1];

        const primeroOffset = primero.offsetTop + primero.offsetHeight / 2;
        const ultimoOffset = ultimo.offsetTop + ultimo.offsetHeight / 2;

        const topLinea = primeroOffset;
        const alturaLinea = Math.max(ultimoOffset - primeroOffset, 10);

        timelineLine!.style.top = `${topLinea}px`;
        timelineLine!.style.height = `${alturaLinea}px`;
      };

      // Llama la primera vez al cargar DOM
      actualizarLinea();

      // Opcional: Llamada con retraso para asegurar layout
      setTimeout(() => {
        actualizarLinea();
      }, 100);

      // Actualiza con scroll y resize
      timeline.addEventListener('scroll', actualizarLinea);
      window.addEventListener('resize', actualizarLinea);
    }

    function initTipoServicios(): void {
      const buttons = document.querySelectorAll<HTMLButtonElement>('.tab-btn');
      const panels = document.querySelectorAll<HTMLDivElement>('.content-panel');
    
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const targetId = `content${button.id.slice(-1)}`;
          const targetPanel = document.getElementById(targetId);
    
          if (targetPanel) {
            // Ocultamos todos los paneles con la animación de slide up
            panels.forEach(panel => {
              // Configura la animación de deslizamiento hacia arriba
              panel.classList.remove('show');
              panel.classList.add('hide');
              
              // Establecemos la altura máxima del panel a 0 para que no ocupe espacio
              panel.style.maxHeight = '0';
            });
    
            // Mostramos el panel correspondiente con la animación de slide down
            targetPanel.classList.remove('hide');
            targetPanel.classList.add('show');
    
            // Establecer el max-height dinámicamente según el contenido del panel
            // Establecemos un valor lo suficientemente alto para que el contenido se ajuste
            const panelHeight = targetPanel.scrollHeight; // Obtén la altura del contenido
            targetPanel.style.maxHeight = `${panelHeight}px`; // Ajustamos max-height dinámicamente
          }
        });
      });
    }



    // Función que inicializa los eventos de apertura y cierre del popup
    function initPopUp(): void {
      // Seleccionamos todos los botones de "Ver más"
      const buttons = document.querySelectorAll('.ver-mas-btn');

      // Añadimos el evento click a cada botón para abrir el diálogo
      buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
          openDialog(`dialog${index + 1}`);
        });
      });

      // Añadir event listeners para los botones de cierre dentro de los diálogos
      const closeButtons = document.querySelectorAll('.dialog-close-btn');
      closeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          const dialogId = (event.target as HTMLElement).getAttribute('data-dialog-id');
          if (dialogId) {
            closeDialog(dialogId); // Llama a la función closeDialog
          }
        });
      });

      // Función para abrir el popup (diálogo)
      function openDialog(dialogId: string): void {
        const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
        const overlay = document.getElementById("overlay") as HTMLElement;

        if (dialog) {
          dialog.showModal(); // Muestra el dialog
          overlay.style.visibility = "visible"; // Muestra el overlay
          overlay.style.opacity = "1"; // Aumenta la opacidad
        } else {
          console.error(`Dialog con ID ${dialogId} no encontrado.`);
        }
      }

      // Función para cerrar el popup (diálogo)
      function closeDialog(dialogId: string): void {
        const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
        const overlay = document.getElementById("overlay") as HTMLElement;

        if (dialog) {
          dialog.close(); // Cierra el dialog
          overlay.style.visibility = "hidden"; // Oculta el overlay
          overlay.style.opacity = "0"; // Disminuye la opacidad
        } else {
          console.error(`Dialog con ID ${dialogId} no encontrado.`);
        }
      }
    }

    function initRegionalidad(): void {
      const textArray: string[] = [
        "PERÚ",
        "PÁNAMA",
        "COLOMBIA"
      ];
      
      const country = document.querySelector("#countries") as HTMLElement; // Aseguramos que el elemento no sea null
      let iterationCount: number = 0;
      
      if (country) { // Comprobamos si el elemento existe en el DOM
        country.addEventListener('animationiteration', () => {
          country.textContent = textArray[++iterationCount % textArray.length];
        });
      }
    }


    //Carusel Cultura
    function initCulturaSlider(): void {
      let wrapper = document.querySelector<HTMLElement>('#culture .culture-wrapper');
      const track   = document.querySelector<HTMLElement>('#culture .culture-track');
      const slides  = Array.from(document.querySelectorAll<HTMLElement>('#culture .culture-slide'));
      if (!wrapper || !track || slides.length === 0) return;
    
      // Cantidad de slides originalmente visibles
      const trackLn = track;
      const wrapperLn = wrapper;

      let visibleCount = 6;
      let slideWidth = wrapper.clientWidth / visibleCount;
      let index = 0;

      // Función para recalcular el número de imágenes visibles según el tamaño de la pantalla
      function updateVisibleCount() {
        if (window.innerWidth <= 480) {
          visibleCount = 2; // 2 imágenes para móviles
        } else if (window.innerWidth <= 768) {
          visibleCount = 3; // 3 imágenes para tabletas
        } else {
          visibleCount = 6; // 6 imágenes para pantallas grandes
        }
        slideWidth = wrapperLn.clientWidth / visibleCount;
      }
    
      // Clonamos el conjunto para bucle infinito
      track.innerHTML += track.innerHTML;
      const total = slides.length; // antes de clonar
    
      // Recalcular ancho en resize
      window.addEventListener('resize', () => {
        updateVisibleCount(); // Actualiza el número de imágenes visibles en resize
      });
    
      // Función que desplaza el trackLn
      function move() {
        index++;
        trackLn.style.transition = 'transform 1s ease';
        trackLn.style.transform = `translateX(-${index * slideWidth}px)`;
    
        // Cuando llegamos al fin del primer grupo, volvemos instantáneamente al inicio
        if (index >= total) {
          setTimeout(() => {
            trackLn.style.transition = 'none';
            trackLn.style.transform = 'translateX(0)';
            index = 0;
          }, 1000); // coincide con la duración de la animación
        }
      }
    
      // Iniciar el bucle automático
      setInterval(move, 3000); // cada 3s
    
      // Llamar a la función al cargar para establecer el número inicial de imágenes visibles
      updateVisibleCount();
    }

    function initHeroADNSlider(): void {
      const slides = Array.from(document.querySelectorAll<HTMLElement>('#hero_adn .slide'));
      if (slides.length === 0) return;
    
      let current = 0;
      // Asegura que sólo el primero esté activo
      slides.forEach((s, i) => s.classList.toggle('active', i === 0));
    
      setInterval(() => {
        // Fade-out actual
        slides[current].classList.remove('active');
        // Avanza índice
        current = (current + 1) % slides.length;
        // Fade-in siguiente
        slides[current].classList.add('active');
      }, 8000);
    }

    function initHeroPrintSlider(): void {
      const slides = Array.from(document.querySelectorAll<HTMLElement>('#hero_print .slide'));
      if (slides.length === 0) return;
    
      let current = 0;
      // Asegura que sólo el primero esté activo
      slides.forEach((s, i) => s.classList.toggle('active', i === 0));
    
      setInterval(() => {
        // Fade-out actual
        slides[current].classList.remove('active');
        // Avanza índice
        current = (current + 1) % slides.length;
        // Fade-in siguiente
        slides[current].classList.add('active');
      }, 8000);
    }

  });
