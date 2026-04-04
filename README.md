# Monster GSM — Sitio Web Oficial

Sitio web premium para **Monster GSM**, servicio técnico especializado en eléctrica de dispositivos móviles. Lomas de Zamora, Buenos Aires.

---

## 🚀 Stack tecnológico

- **Next.js 14** (App Router)
- **Tailwind CSS** — estilos con paleta neon personalizada
- **TypeScript**
- **Framer Motion** + **Lucide React**
- Deploy en **Vercel**

---

## 📦 Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/monstergsm.git
cd monstergsm

# 2. Instalar dependencias
npm install

# 3. Iniciar en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## 🔐 Panel Admin

Acceder en: `http://localhost:3000/admin` (o `https://tu-dominio.vercel.app/admin`)

**Contraseña:** `monster.lomas`

### Funcionalidades del admin:
- ✅ Agregar productos al stock
- ✅ Editar nombre, categoría, marca, modelo, precio y stock
- ✅ Eliminar productos
- ✅ Buscador y filtro por categoría
- ✅ Alerta de stock bajo (≤ 2 unidades)
- ✅ Vista de totales y valor del inventario

> **Nota:** Los productos se guardan en `localStorage` del navegador. Los datos persisten en el mismo dispositivo/navegador.

---

## 🌐 Deploy en Vercel

### Paso 1 — Subir a GitHub

```bash
git init
git add .
git commit -m "feat: Monster GSM website inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/monstergsm.git
git push -u origin main
```

### Paso 2 — Conectar con Vercel

1. Ir a [vercel.com](https://vercel.com) e iniciar sesión
2. Click en **"Add New Project"**
3. Importar el repositorio de GitHub
4. Vercel detecta Next.js automáticamente
5. Click en **"Deploy"** ✅

### Paso 3 — Dominio personalizado (opcional)

En Vercel → Settings → Domains → agregar `monstergsm.com.ar`

---

## 📁 Estructura del proyecto

```
monstergsm/
├── app/
│   ├── layout.tsx          # Layout global + fuentes
│   ├── globals.css         # Estilos globales + efectos neon
│   ├── page.tsx            # Landing page
│   └── admin/
│       └── page.tsx        # Panel de administración
├── components/
│   ├── Navbar.tsx          # Barra de navegación
│   ├── Hero.tsx            # Sección hero con partículas
│   ├── Services.tsx        # Tarjetas de servicios
│   ├── Contact.tsx         # Sección de contacto
│   └── Footer.tsx          # Pie de página
├── public/
│   └── logo.svg            # Logo Monster GSM
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

---

## 🎨 Paleta de colores

| Color | Hex | Uso |
|-------|-----|-----|
| Verde Neón | `#3DFF14` | Color principal, CTA, highlights |
| Azul Eléctrico | `#1A5CFF` | Acento secundario |
| Negro puro | `#050505` | Fondo |
| Card dark | `#0d0d0d` | Tarjetas |

---

## 📞 Datos del negocio

- **WhatsApp:** +54 11 6151-4612
- **Dirección:** Colombres 1614, Lomas de Zamora
- **Servicios:** Reparación de pantallas · Reparación eléctrica / plaqueta

---

## ⚠️ Logo

Reemplazar `public/logo.svg` con el logo original en PNG/SVG para máxima calidad.

---

Desarrollado para **Monster GSM** — Lomas de Zamora 🔧⚡
