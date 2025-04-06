// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Ocultar el preloader cuando la página está cargada
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('hide');
    });

    // Inicializar la fecha de la boda y el contador
    const weddingDate = new Date('April 11, 2026 12:00:00').getTime();
    
    // Actualizar el contador cada segundo
    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        // Cálculos de tiempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Mostrar el contador
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Si la cuenta atrás ha terminado
        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }, 1000);
    
    // Efecto de header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Navegación móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace (en móvil)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Desplazamiento suave para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mostrar/ocultar número de invitados según la respuesta de asistencia
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const guestsGroup = document.getElementById('guests-group');
    const guestContainer = document.getElementById("guest-details-container");
    const guestsSelect = document.getElementById("guests");

    // Función para crear campos por invitado
    function createGuestFields(count) {
        guestContainer.innerHTML = ""; // Limpiar campos anteriores

        for (let i = 1; i <= count; i++) {
            const group = document.createElement("div");
            group.classList.add("guest-block");

            group.innerHTML = `
            <h4>Invitado ${i}</h4>
            <div class="guest-flex">
                <div class="form-group name-group">
                    <input type="text" name="guest_name_${i}" placeholder="Nombre del invitado ${i}" required>
                </div>
                <div class="guest-options">
                    <div class="guest-question-pair">
                        <div class="form-group">
                            <label>¿Tienes alergias alimentarias?</label>
                            <div class="radio-options">
                                <label><input type="radio" name="guest_allergy_${i}" value="sí" required> Sí</label>
                                <label><input type="radio" name="guest_allergy_${i}" value="no" required> No</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>¿Necesitas autobús?</label>
                            <div class="radio-options">
                                <label><input type="radio" name="guest_bus_${i}" value="sí" required> Sí</label>
                                <label><input type="radio" name="guest_bus_${i}" value="no" required> No</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

            guestContainer.appendChild(group);
        }
    }

    // Detectar cambios en el número de invitados
    guestsSelect.addEventListener("change", function () {
        const count = parseInt(this.value);
        createGuestFields(count);
    });

    // Mostrar/ocultar secciones según asistencia
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'yes') {
                guestsGroup.style.display = 'block';
                guestContainer.style.display = 'block';
                createGuestFields(parseInt(guestsSelect.value)); // Generar campos al mostrar
            } else {
                guestsGroup.style.display = 'none';
                guestContainer.innerHTML = '';
                guestContainer.style.display = 'none';
            }
        });
    });

    // Inicializar al cargar
    if (document.querySelector('input[name="attendance"]:checked').value === 'yes') {
        guestsGroup.style.display = 'block';
        guestContainer.style.display = 'block';
        createGuestFields(parseInt(guestsSelect.value));
    } else {
        guestsGroup.style.display = 'none';
        guestContainer.style.display = 'none';
    }
    
    // Modal de datos bancarios
    const showAccountBtn = document.getElementById('show-account');
    const accountModal = document.getElementById('account-modal');
    const closeModal = document.querySelector('.close-modal');
    
    showAccountBtn.addEventListener('click', function() {
        accountModal.classList.add('show');
    });
    
    closeModal.addEventListener('click', function() {
        accountModal.classList.remove('show');
    });
    
    // Cerrar modal haciendo clic fuera
    window.addEventListener('click', function(e) {
        if (e.target === accountModal) {
            accountModal.classList.remove('show');
        }
    });
    
    // Manejo del formulario RSVP
    const rsvpForm = document.getElementById('rsvp-form');
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(rsvpForm);

        fetch(rsvpForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('¡Gracias por confirmar tu asistencia! Te esperamos con mucha ilusión');
                rsvpForm.reset();
                // Limpiar campos dinámicos
                document.getElementById("guest-details-container").innerHTML = '';
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || 'Hubo un error al enviar el formulario.');
                });
            }
        })
        .catch(error => {
            alert('Error al enviar el formulario: ' + error.message);
        });
});
    
    // Efecto de animación al hacer scroll para los elementos
    function revealOnScroll() {
        const revealElements = document.querySelectorAll('.event-card, .gift-option, .contact-method, .gallery-item');
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar los elementos con opacidad 0
    const animatedElements = document.querySelectorAll('.event-card, .gift-option, .contact-method, .gallery-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Llamar a la función al cargar y al hacer scroll
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
});