<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-bs-theme="light">
    <head>
        <meta charset="UTF-8">
        <title>{{ __('messages.title') }}</title>
        <!-- Bootstrap CSS -->
        <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet"
        >
        <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        >
        <style>
            #game-container {
                /* Change from fixed dimensions to max dimensions */
                max-width: 1048px;
                width: 100%; /* Allow it to shrink */
                height: auto; /* Let height adjust automatically based on content/aspect ratio */
                margin: 0 auto; /* Center the container */
                position: relative; /* Needed for proper positioning */
                animation: glow 2500ms ease-out infinite alternate;
            }

            @keyframes glow {
                0% {
                    box-shadow: 0.25rem 0.25rem 1rem #d87b04;
                }	
                100% {
                    box-shadow: 0.25rem 0.25rem 7rem #7b2cbf;
                }
            }

            /* Make sure the canvas inside game container is responsive too */
            #game-container canvas {
                display: block;
                margin: 0 auto;
                width: 100%;
                height: 100%;
            }

            /* Add media query for smaller screens */
            @media (max-width: 768px) {
                #game-container {
                    max-width: 100%;
                    box-shadow: none; /* Optional: simplify on mobile */
                }
                
                @keyframes glow {
                    0% {
                        box-shadow: 0.125rem 0.125rem 0.5rem #d87b04;
                    }	
                    100% {
                        box-shadow: 0.125rem 0.125rem 3.5rem #7b2cbf;
                    }
                }
            }

            .btn-primary {
                background-color: #9d4edd !important;
                border-color: #9d4edd !important;
            }
            .btn-primary:hover {
                background-color: #7b2cbf !important;
                border-color: #7b2cbf !important;
            }
            .bg-secondary {
                background-color: #f39c12 !important;
                border-color: #f39c12 !important;
            }
            .bg-secondary:hover {
                background-color: #d87b04 !important;
                border-color: #d87b04 !important;
            }
            .btn-secondary {
                background-color: #00b894 !important;
                border-color: #00b894 !important;
            }
            .btn-secondary:hover {
                background-color: #009973 !important;
                border-color: #009973 !important;
            }
            .hero {
                background: linear-gradient(to right, #9d4edd, #9d4edd, #9d4edd, white, #7b2cbf,  #7b2cbf,  #7b2cbf);
                color: white;
                padding: 5rem 1rem;
            }
            [data-bs-theme="dark"] .navbar {
                background-color: #222 !important;
            }
            [data-bs-theme="dark"] body {
                background-color: #121212;
                color: #fff;
            }
            /* Force anything marked as .bg-light to become darker in dark mode */
            [data-bs-theme="dark"] .bg-light {
            background-color: #222 !important; /* or whatever dark color you want */
            color: #fff !important;               /* ensures text is readable */
            }
        </style>
    </head>
    <body>
        <!-- NAVBAR -->
        <nav class="navbar navbar-expand-lg navbar-light shadow-sm">
            <div class="container">
                <!-- Logo -->
                <a class="navbar-brand fw-bold" href="#">
                    <img 
                    src="{{ asset('assets/images/m4lore_logo_v2.png') }}" 
                    id="siteLogo" 
                    alt="Logo" 
                    width="150" 
                    class="d-inline-block align-top me-2"
                    >
                </a>
                <button 
                class="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarContent" 
                aria-controls="navbarContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul class="navbar-nav ms-auto">
                        <!-- Example menu items -->
                        <li class="nav-item">
                            <a class="nav-link" href="#about">{{ __('messages.about_me') }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#contact">{{ __('messages.contact_me') }}</a>
                        </li>

                        <!-- THEME TOGGLE BUTTON -->
                        <li class="nav-item d-flex align-items-center ms-3">
                            <button 
                            id="themeToggleBtn" 
                            class="btn btn-outline-secondary"
                            >
                                <i class="bi bi-brightness-high"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- HERO SECTION -->
        <section class="py-5 bg-light text-center">
            <div class="container">
                <h1 class="display-4 fw-bold mb-3">{{ __('messages.greeting') }}</h1>
                <h5 class="mb-3">({{ __('messages.subtitle') }})</h5>
                <p class="lead text-secondary">
                    {{ __('messages.intro') }}
                </p>
                <a href="#contact" class="btn btn-primary mt-3">
                    {{ __('messages.contact_me') }}
                </a>
            </div>
        </section>

        <!-- ABOUT SECTION -->
        <section id="about" class="py-5">
            <div class="container">
                <h2 class="text-center mb-4">{{ __('messages.about_me') }}</h2>
                <p class="text-center text-muted mx-auto" style="max-width: 700px;">
                    {{ __('messages.about_text') }}
                </p>
                <!-- Skills -->
                <div class="row mt-4 justify-content-center">
                    <div class="col-auto">
                        <span class="badge bg-secondary me-1">Laravel</span>
                        <span class="badge bg-secondary me-1">PHP</span>
                        <span class="badge bg-secondary me-1">JavaScript</span>
                        <span class="badge bg-secondary me-1">Python</span>
                        <span class="badge bg-secondary">C++</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- GAME SECTION -->
        <section id="game-section" class="py-5">
            <div class="container">
                <h2 class="text-center mb-4">???</h2>
                <p class="text-center text-muted mx-auto" style="max-width: 700px;">
                    A short playable narrative about chasing your dreams!
                </p>
                <!-- The container for the Phaser (or Canvas) game -->
                
                <div id="game-container" class="m-auto mt-5 mb-4 text-center"></div>
            </div>
        </section>

        <!-- SOCIAL SECTION -->
        <section class="py-5">
            <div class="container text-center">
                <h2 class="mb-4">{{ __('messages.social_media') }}</h2>
                <p class="text-muted">{{ __('messages.social_text') }}</p>
                <div class="d-flex justify-content-center gap-4 fs-5">
                    <a 
                    href="https://instagram.com/m4loree" 
                    target="_blank" 
                    class="text-decoration-none text-danger"
                    >
                        <i class="bi bi-instagram"></i>
                    </a>
                    <a 
                    href="https://twitter.com/wakemomo" 
                    target="_blank" 
                    id="twitterBtn" 
                    class="text-decoration-none text-dark"
                    >
                        <i class="bi bi-twitter-x"></i>
                    </a>
                    <a 
                    href="https://www.linkedin.com/in/lorenzo-mantovani-47a611253" 
                    target="_blank" 
                    class="text-decoration-none text-primary"
                    >
                        <i class="bi bi-linkedin"></i>
                    </a>
                </div>
            </div>
        </section>

        <!-- CONTACT SECTION -->
        <section id="contact" class="py-5 bg-light">
            <div class="container text-center">
                <h2 class="mb-4">{{ __('messages.contact_section') }}</h2>
                <p class="text-muted mb-4">
                    {{ __('messages.contact_text') }}
                </p>
                <a 
                href="mailto:m4lore.business@gmail.com" 
                class="btn btn-secondary"
                >
                    m4lore.business@gmail.com
                </a>
            </div>
        </section>

        <!-- FOOTER -->
        <footer class="text-center py-3 border-top">
            <div class="container text-muted">
                &copy; {{ date('Y') }} Lorenzo — {{ __('messages.rights_reserved') }}.
            </div>
        </footer>

        <!-- Bootstrap JS -->
        <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js">
        </script>
        
        <!-- Phaser CDN or local file -->
        <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>
        <!-- game code -->
        <script type="module" src="assets/js/game.js"></script>

        <!-- THEME TOGGLE SCRIPT -->
        <script>
        // 1) On page load, check if a theme was saved in localStorage
        //    and apply it. If not found, default to “light”.
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-bs-theme', savedTheme);

        // Reference elements
        const themeToggleBtn = document.getElementById('themeToggleBtn');
        const logo = document.getElementById('siteLogo');
        const twitterBtn = document.getElementById('twitterBtn');

        // Function to update theme and logo
        function updateTheme(theme) {
            document.documentElement.setAttribute('data-bs-theme', theme);
            localStorage.setItem('theme', theme);

            // Update icon
            themeToggleBtn.innerHTML = theme === 'dark'
                ? '<i class="bi bi-moon"></i>'
                : '<i class="bi bi-brightness-high"></i>';

            // Update logo source
            logo.src = theme === 'dark' 
                ? "{{ asset('assets/images/m4lore_logo_v2_white.png') }}" 
                : "{{ asset('assets/images/m4lore_logo_v2.png') }}";

            // Update Twitter button color
            if (theme === 'dark') {
                twitterBtn.classList.remove("text-dark");
                twitterBtn.classList.add("text-white");
            } else {
                twitterBtn.classList.remove("text-white");
                twitterBtn.classList.add("text-dark");
            }
        }

        // Apply theme and logo on page load
        updateTheme(savedTheme);

        // 2) Listen for theme toggle button clicks
        themeToggleBtn.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
            updateTheme(nextTheme);
        });
        </script>
        
    </body>
</html>