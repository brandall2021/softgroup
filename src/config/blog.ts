export interface Article {
  slug: string;
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  readingTime: string;
  gradient: string;
}

export const articles: Article[] = [
  {
    slug: "agentes-ia-atencion-cliente",
    title: "Cómo los Agentes IA están revolucionando la atención al cliente",
    category: "Inteligencia Artificial",
    categoryColor: "bg-violet/10 text-violet",
    date: "15 Jul 2026",
    excerpt:
      "Descubre cómo los agentes inteligentes están transformando la forma en que las empresas interactúan con sus clientes.",
    content: `
## El cambio en la atención al cliente

Los agentes de Inteligencia Artificial han transformado fundamentalmente la atención al cliente. Ya no se trata de simples chatbots con respuestas predefinidas, sino de sistemas inteligentes capaces de entender contexto, mantener conversaciones naturales y resolver problemas complejos.

## Beneficios clave

- **Disponibilidad 24/7:** Los agentes IA nunca duermen. Tus clientes pueden obtener ayuda a cualquier hora del día, todos los días del año.
- **Escalabilidad ilimitada:** Mientras un agente humano puede manejar 3-5 conversaciones simultáneas, un agente IA puede manejar miles.
- **Consistencia:** Cada cliente recibe la misma calidad de atención, sin importar cuándo contacte.
- **Reducción de costos:** Las empresas reportan reducciones de hasta el 60% en costos de atención al cliente.

## Caso de éxito

Una empresa de e-commerce implementó un agente IA para gestionar consultas post-venta. En 3 meses:
- Tiempo de respuesta promedio: de 4 horas a 30 segundos
- Satisfacción del cliente: +35%
- Tickets escalados a humanos: -70%

## El futuro

Los agentes IA seguirán evolucionando. Con tecnologías como RAG (Retrieval-Augmented Generation), podrán acceder a bases de conocimiento completas de la empresa para dar respuestas precisas y contextualizadas.
    `,
    author: "SoftGroup",
    readingTime: "5 min",
    gradient: "from-brand via-brand-light to-cyan",
  },
  {
    slug: "ciberseguridad-empresarial-2026",
    title: "Guía completa de ciberseguridad empresarial en 2026",
    category: "Ciberseguridad",
    categoryColor: "bg-cyan/10 text-cyan",
    date: "10 Jul 2026",
    excerpt:
      "Las amenazas evolucionan constantemente. Conoce las mejores prácticas para proteger tu empresa.",
    content: `
## El panorama de amenazas en 2026

La ciberseguridad empresarial enfrenta nuevos desafíos cada año. Los ataques de ransomware, phishing avanzado y vulnerabilidades en la nube son solo algunas de las amenazas que las empresas deben enfrentar.

## Pilares de la ciberseguridad empresarial

### 1. Zero Trust Architecture
No confíes, siempre verifica. La arquitectura Zero Trust asume que cualquier usuario o dispositivo podría estar comprometido.

### 2. MFA obligatorio
La autenticación multifactor ya no es opcional. Debe implementarse en todos los sistemas críticos.

### 3. Monitoreo continuo
Las soluciones de SIEM y SOAR permiten detectar y responder a amenazas en tiempo real.

### 4. Capacitación del personal
El 95% de los ciberataques exitosos involucran error humano. La formación continua es esencial.

## Mejores prácticas

- Actualizar sistemas regularmente
- Implementar segmentación de red
- Realizar auditorías de seguridad trimestrales
- Mantener backups actualizados y probados
- Tener un plan de respuesta a incidentes
    `,
    author: "SoftGroup",
    readingTime: "7 min",
    gradient: "from-cyan via-brand to-violet",
  },
  {
    slug: "cloud-computing-migracion",
    title: "Cloud Computing: Migración exitosa paso a paso",
    category: "Cloud",
    categoryColor: "bg-brand/10 text-brand",
    date: "5 Jul 2026",
    excerpt:
      "Planifica y ejecuta la migración de tu infraestructura a la nube con esta guía práctica.",
    content: `
## Por qué migrar a la nube

La migración a la nube no es solo una tendencia, es una necesidad competitiva. Las empresas que migran logran reducir costos de infraestructura, mejorar la escalabilidad y aumentar la agilidad operativa.

## Fases de una migración exitosa

### Fase 1: Evaluación
- Inventariar aplicaciones y dependencias
- Clificar por criticidad
- Identificar quick wins

### Fase 2: Planificación
- Seleccionar proveedor cloud (AWS, Azure, GCP)
- Definir arquitectura target
- Establecer timeline y presupuesto

### Fase 3: Migración
- Migrar aplicaciones no críticas primero
- Implementar monitoring desde el día 1
- Realizar pruebas de carga

### Fase 4: Optimización
- Right-sizing de instancias
- Implementar auto-scaling
- Optimizar costos con Reserved Instances

## Errores comunes

- Migrar sin un plan claro
- Subestimar la complejidad de las dependencias
- Ignorar la seguridad durante la migración
- No capacitar al equipo en nuevas tecnologías
    `,
    author: "SoftGroup",
    readingTime: "6 min",
    gradient: "from-violet via-brand to-cyan",
  },
  {
    slug: "automatizacion-procesos-n8n",
    title: "Automatización de procesos con n8n: Guía práctica",
    category: "Automatización",
    categoryColor: "bg-emerald-500/10 text-emerald-500",
    date: "1 Jul 2026",
    excerpt:
      "Aprende a automatizar flujos de trabajo complejos usando n8n, la plataforma de automatización de código abierto.",
    content: `
## Qué es n8n

n8n es una plataforma de automatización de workflows de código abierto que permite conectar diferentes servicios y APIs sin escribir código extenso.

## Casos de uso populares

- **Sincronización de datos:** Entre CRM, ERP y otras herramientas
- **Notificaciones automatizadas:** Alertas por email, Slack o WhatsApp
- **Procesamiento de documentos:** OCR + extracción de datos + guardado
- **Lead management:** Captura → Calificación → Asignación

## Ejemplo: Workflow de lead management

1. Webhook recibe lead del formulario web
2. IA califica el lead ( scored 1-100 )
3. Si score > 70, asignar a vendedor automáticamente
4. Enviar email de bienvenida personalizado
5. Crear contacto en CRM
6. Notificar al equipo por Slack

## Beneficios medibles

- Reducción de tiempo manual: 80%
- Eliminación de errores humanos: 95%
- ROI en primeros 3 meses
    `,
    author: "SoftGroup",
    readingTime: "5 min",
    gradient: "from-emerald-500 via-brand to-cyan",
  },
  {
    slug: "desarrollo-web-moderno-2026",
    title: "Tendencias de desarrollo web en 2026",
    category: "Desarrollo",
    categoryColor: "bg-brand/10 text-brand",
    date: "25 Jun 2026",
    excerpt:
      "Las tecnologías y frameworks que están definiendo el desarrollo web este año.",
    content: `
## El estado del desarrollo web

El desarrollo web en 2026 se define por la velocidad, la experiencia del usuario y la integración con IA.

## Tendencias principales

### 1. Server Components
React Server Components y equivalentes permiten渲染 en el servidor con interactividad en el cliente.

### 2. Edge Computing
Ejecutar código cerca del usuario reduce latencia drásticamente.

### 3. IA en desarrollo
Copilots y herramientas de IA están acelerando el desarrollo de código.

### 4. WebAssembly
Wasm permite ejecutar código de alto rendimiento en el navegador.

### 5. PWAs avanzadas
Las Progressive Web Apps siguen ganando terreno sobre las apps nativas.

## Stack recomendado

- **Frontend:** Next.js / Astro / SvelteKit
- **Backend:** Node.js / Go / Rust
- **Base de datos:** PostgreSQL / PlanetScale
- **Deploy:** Vercel / Cloudflare Workers
    `,
    author: "SoftGroup",
    readingTime: "4 min",
    gradient: "from-brand via-cyan to-violet",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}
