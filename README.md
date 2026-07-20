# SoftGroup - Corporate Website

> Plataforma web corporativa premium para SoftGroup. Soluciones digitales inteligentes.

## Stack Tecnologico

| Tecnologia | Version | Uso |
|---|---|---|
| Next.js | 16.x | Framework React |
| React | 19.x | UI Library |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 4.x | Utility-First CSS |
| Framer Motion | 12.x | Animaciones |
| Lucide React | 1.x | Iconografia |
| Outfit | - | Tipografia principal |
| JetBrains Mono | - | Tipografia monoespaciada |

## Caracteristicas

- **14 componentes** animados con Framer Motion
- **Navbar** floating glass pill con hamburger morph
- **Hero** con canvas particle network interactivo
- **Servicios** con Double-Bezel card architecture
- **Seccion IA** con neural network CSS/SVG animado
- **Portfolio** con filtro por categoria y animaciones
- **Calculadora de presupuesto** interactiva 3 pasos
- **Chat flotante** con respuestas predefinidas
- **Testimonios** con carousel automatico
- **Formulario** con validacion inline y estados de error
- **Dark mode** completo via prefers-color-scheme
- **SEO** optimizado: Schema.org, Open Graph, Twitter Cards
- **Accesibilidad**: focus-visible, aria-labels, reduced-motion
- **Responsive** al 100% (mobile-first)
- **Docker** listo para deploy

---

## Desarrollo Local

### Requisitos

- Node.js 20+
- npm 10+

### Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/brandall2021/softgroup.git
cd softgroup

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

### Comandos Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de produccion
npm run start      # Iniciar servidor de produccion
npm run lint       # Verificar codigo con ESLint
```

---

## Deploy con Dokploy

Dokploy es una plataforma de deploy self-hosted que simplifica el despliegue de aplicaciones. Esta configurada para funcionar con Docker.

### 1. Pre-requisitos del Servidor

```bash
# Actualizar sistema (Ubuntu/Debian)
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER

# Instalar Dokploy
curl -sSL https://dokploy.com/install.sh | sh
```

Despues de instalar, accede al panel en:
```
https://tu-servidor:3000
```

### 2. Configurar GitHub en Dokploy

1. Accede al panel de Dokploy
2. Ve a **Settings > Git Providers**
3. Haz clic en **Add Provider** > **GitHub**
4. Autoriza la conexion con tu cuenta de GitHub

### 3. Crear el Proyecto en Dokploy

1. Ve a **Projects** > **Create Project**
2. Nombre: `softgroup`
3. Descripcion: `Pagina web corporativa SoftGroup`

### 4. Crear la Aplicacion

1. Dentro del proyecto, haz clic en **Create Application**
2. Configura:

| Campo | Valor |
|---|---|
| **Name** | `softgroup-web` |
| **Provider** | `Docker` |
| **Branch** | `main` |
| **Build Type** | `Dockerfile` |
| **Dockerfile Path** | `./Dockerfile` |

### 5. Configurar Variables de Entorno

En la pestaña **Environment Variables**, agrega:

```bash
# Produccion
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0

# Desarrollo (opcional, para preview)
# NEXT_PUBLIC_API_URL=https://api.tudominio.com
```

### 6. Configurar Dominio

1. Ve a la pestaña **Domains**
2. Haz clic en **Add Domain**
3. Configura:

| Campo | Valor |
|---|---|
| **Host** | `softgroup.com` |
| **Path** | `/` |
| **Container Port** | `3000` |
| **HTTPS** | Habilitar (Let's Encrypt) |

4. Configura tu DNS:

```
Type: A
Name: @
Value: IP-de-tu-servidor

Type: A
Name: www
Value: IP-de-tu-servidor
```

### 7. Deploy

1. Haz clic en **Deploy**
2. Dokploy clonara el repo, construira la imagen Docker y desplegara
3. El healthcheck verificara que la app responda en el puerto 3000

### 8. Deploy Automatico

Dokploy puede hacer deploy automatico cada vez que hagas push a `main`:

1. En la configuracion de la aplicacion
2. Habilita **Auto Deploy**
3. Selecciona la branch `main`

---

### Arquitectura del Deploy

```
┌─────────────────────────────────────────┐
│              Dokploy Server             │
│                                         │
│  ┌──────────┐    ┌──────────────────┐   │
│  │  Traefik │───▶│  softgroup-web   │   │
│  │  (Proxy) │    │  (Next.js :3000) │   │
│  └────┬─────┘    └──────────────────┘   │
│       │                                  │
│  ┌────▼─────┐                            │
│  │  Let's   │                            │
│  │  Encrypt │                            │
│  │  (SSL)   │                            │
│  └──────────┘                            │
└─────────────────────────────────────────┘
         │
    ┌────▼────┐
    │  DNS    │
    │  A: IP  │
    └─────────┘
```

### Comandos Utiles de Dokploy

```bash
# Ver logs de la aplicacion
dokploy service logs softgroup-web

# Rebuild manual
dokploy service deploy softgroup-web

# Ver estado
dokploy service list
```

---

## Docker (Deploy Manual)

Si prefieres deploy manual sin Dokploy:

### Build

```bash
docker build -t softgroup-web .
```

### Ejecutar

```bash
docker run -d \
  --name softgroup \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  softgroup-web
```

### Docker Compose

```yaml
version: "3.8"

services:
  softgroup:
    build: .
    container_name: softgroup
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s
```

```bash
docker compose up -d
```

---

## Estructura del Proyecto

```
softgroup/
├── public/                    # Assets estaticos
├── src/
│   ├── app/
│   │   ├── globals.css        # Theme custom + utilidades CSS
│   │   ├── layout.tsx         # Root layout + SEO + Schema.org
│   │   └── page.tsx           # Pagina principal
│   └── components/
│       ├── Navbar.tsx          # Floating glass pill navigation
│       ├── Hero.tsx            # Canvas particle network + CTAs
│       ├── Services.tsx        # 6 categorias Double-Bezel cards
│       ├── AIAgent.tsx         # Neural network CSS/SVG + contenido IA
│       ├── Stats.tsx           # 5 contadores animados
│       ├── Portfolio.tsx       # 6 proyectos con filtro
│       ├── Process.tsx         # Timeline de 6 pasos
│       ├── BudgetCalculator.tsx # Calculadora interactiva 3 pasos
│       ├── TechStack.tsx       # Marquee infinito tecnologias
│       ├── Testimonials.tsx    # Carousel automatico
│       ├── Blog.tsx            # 3 articulos de blog
│       ├── Contact.tsx         # Formulario + info contacto
│       ├── Footer.tsx          # Footer 4 columnas
│       └── ChatWidget.tsx      # Chat flotante IA
├── Dockerfile                 # Build multi-etapa optimizado
├── .dockerignore              # Archivos excluidos del build
├── next.config.ts             # Next.js config (standalone output)
├── package.json
├── tsconfig.json
└── postcss.config.mjs
```

---

## Variables de Entorno

| Variable | Requerida | Default | Descripcion |
|---|---|---|---|
| `NODE_ENV` | Si | `development` | Modo de ejecucion |
| `PORT` | No | `3000` | Puerto del servidor |
| `HOSTNAME` | No | `0.0.0.0` | Host del servidor |
| `NEXT_PUBLIC_API_URL` | No | - | URL del backend API |

---

## Performance

- **Lighthouse**: Target > 95 en todas las metricas
- **Build output**: Standalone (Docker optimizado)
- **Imagenes**: AVIF/WebP automatico via Next.js
- **CSS**: Tailwind v4 con tree-shaking
- **Fonts**: Google Fonts con `font-display: swap`
- **Animaciones**: Solo transform/opacity (GPU accelerated)
- **Bundle**: Code splitting por defecto con App Router

---

## SEO

- Meta tags completos (title, description, keywords)
- Open Graph para Facebook/LinkedIn
- Twitter Cards
- Schema.org Organization JSON-LD
- Sitemap automatico (configurar en next.config.ts)
- Robots.txt (agregar en public/)
- Canonical URLs

---

## Accesibilidad

- `prefers-reduced-motion`: Desactiva animaciones
- `:focus-visible`: Anillos de foco visibles
- `aria-labels`: En botones y elementos interactivos
- Touch targets: Minimo 44x44px
- Contraste: Cumple WCAG AA (4.5:1)
- Semantica: Heading hierarchy correcta

---

## Licencia

Propiedad de SoftGroup. Todos los derechos reservados.
