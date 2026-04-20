<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  Store, Package, ShoppingCart, Users, ShieldCheck, Layers,
  Warehouse, FileSpreadsheet, CheckCircle, ArrowRight,
  MessageCircle, Phone, Mail, Building2, ChevronRight,
  BarChart3, Zap, Globe,
} from 'lucide-vue-next'
import { contactoService } from '@/services/contacto.service'

const appUrl = import.meta.env.VITE_APP_URL || ''

function goToLogin() {
  window.location.href = `${appUrl}/#/login`
}

// ── Form ─────────────────────────────────────────────────────────────────────
const enviando = ref(false)
const enviado = ref(false)
const errorEnvio = ref('')
const errors = reactive({ nombre: '', email: '', mensaje: '' })

const form = reactive({ nombre: '', email: '', telefono: '', empresa: '', mensaje: '' })

function validar() {
  errors.nombre = form.nombre.trim() ? '' : 'Campo requerido'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Email inválido'
  errors.mensaje = form.mensaje.trim() ? '' : 'Campo requerido'
  return !errors.nombre && !errors.email && !errors.mensaje
}

async function enviar() {
  if (!validar()) return
  enviando.value = true
  errorEnvio.value = ''
  try {
    await contactoService.create({
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono || undefined,
      empresa: form.empresa || undefined,
      mensaje: form.mensaje,
    })
    enviado.value = true
    Object.assign(form, { nombre: '', email: '', telefono: '', empresa: '', mensaje: '' })
  } catch {
    errorEnvio.value = 'Error al enviar. Intenta nuevamente o escríbenos por WhatsApp.'
  } finally {
    enviando.value = false
  }
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// ── Data ─────────────────────────────────────────────────────────────────────
const beneficios = [
  { icon: Package,        titulo: 'Control de inventario',   desc: 'Gestiona productos, categorías y stock en tiempo real con alertas de stock bajo.', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { icon: ShoppingCart,   titulo: 'Punto de venta (POS)',     desc: 'Terminal rápida con soporte de código de barras y cálculo automático de IGV.', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
  { icon: Globe,          titulo: 'Multi-sucursal',           desc: 'Administra todas tus tiendas desde un solo sistema con almacenes independientes.', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { icon: Users,          titulo: 'Roles y permisos',         desc: 'Asigna accesos exactos: administradores, cajeros, almaceneros y vendedores.', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  { icon: BarChart3,      titulo: 'Historial de ventas',      desc: 'Consulta transacciones completas con detalle por producto, monto base e IGV.', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-100 dark:bg-teal-900/30' },
  { icon: FileSpreadsheet,titulo: 'Importación masiva',       desc: 'Carga tu catálogo de productos desde Excel en segundos, sin carga manual.', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
]

const modulos = [
  {
    icon: Layers, titulo: 'Inventario', color: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-900/50', headerBg: 'bg-blue-50 dark:bg-blue-900/20',
    items: ['Productos con SKU y código de barras', 'Categorías personalizadas', 'Stock por almacén', 'Alertas de stock bajo', 'Importación desde Excel'],
  },
  {
    icon: ShoppingCart, titulo: 'Ventas', color: 'text-green-600 dark:text-green-400', border: 'border-green-200 dark:border-green-900/50', headerBg: 'bg-green-50 dark:bg-green-900/20',
    items: ['Terminal POS para cajeros', 'Búsqueda por nombre o barras', 'Gestión de clientes', 'Cálculo automático de IGV', 'Historial de transacciones'],
  },
  {
    icon: ShieldCheck, titulo: 'Administración', color: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-900/50', headerBg: 'bg-purple-50 dark:bg-purple-900/20',
    items: ['Gestión de usuarios', 'Roles con permisos granulares', 'Multi-empresa y sucursales', 'Control de acceso por módulo', 'Seguimiento de sesiones'],
  },
]

const pasos = [
  { n: '01', titulo: 'Crea tu empresa',    desc: 'Regístrate, crea tu empresa y configura sucursales y almacenes en minutos.' },
  { n: '02', titulo: 'Carga tu catálogo',  desc: 'Importa productos desde Excel o agrégalos manualmente con precios y stock.' },
  { n: '03', titulo: 'Empieza a vender',   desc: 'Abre el terminal POS, busca por nombre o código de barras y cierra ventas.' },
]
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">

    <!-- ══ NAVBAR ══════════════════════════════════════════════════════════════ -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Store class="w-4 h-4 text-white" />
          </div>
          <span class="text-lg font-bold">Tendero</span>
        </div>

        <!-- Links (desktop) -->
        <div class="hidden md:flex items-center gap-8 text-sm font-medium">
          <button @click="scrollTo('beneficios')" class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Beneficios</button>
          <button @click="scrollTo('modulos')" class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Módulos</button>
          <button @click="scrollTo('como-funciona')" class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">¿Cómo funciona?</button>
          <button @click="scrollTo('contacto')" class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Contacto</button>
        </div>

        <button
          @click="goToLogin"
          class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Iniciar sesión
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </nav>

    <!-- ══ HERO ════════════════════════════════════════════════════════════════ -->
    <section class="pt-32 pb-20 px-6 relative overflow-hidden">
      <!-- fondo decorativo -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/30 dark:via-gray-950 dark:to-purple-950/20 pointer-events-none" />
      <div class="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div class="max-w-4xl mx-auto text-center relative">
        <div class="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full px-4 py-1.5 mb-6">
          <Zap class="w-3.5 h-3.5" />
          Sistema SaaS para negocios retail
        </div>

        <h1 class="text-5xl md:text-6xl font-black leading-tight mb-6 tracking-tight">
          Gestiona tu negocio<br />
          <span class="text-blue-600 dark:text-blue-400">desde un solo lugar</span>
        </h1>

        <p class="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Tendero es el sistema todo-en-uno para controlar tu inventario, gestionar ventas
          y administrar tu equipo en múltiples sucursales.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="goToLogin"
            class="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-base"
          >
            Comenzar ahora
            <ArrowRight class="w-5 h-5" />
          </button>
          <a
            href="https://wa.me/51935216950?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20Tendero."
            target="_blank"
            class="flex items-center justify-center gap-2 px-8 py-3 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-colors text-base bg-white dark:bg-gray-900"
          >
            <MessageCircle class="w-5 h-5 text-green-500" />
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>

    <!-- ══ STATS ═══════════════════════════════════════════════════════════════ -->
    <section class="py-12 border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40">
      <div class="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div><div class="text-3xl font-black text-blue-600 dark:text-blue-400">5</div><div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Roles de usuario</div></div>
        <div><div class="text-3xl font-black text-green-600 dark:text-green-400">∞</div><div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Sucursales</div></div>
        <div><div class="text-3xl font-black text-purple-600 dark:text-purple-400">100%</div><div class="text-sm text-gray-500 dark:text-gray-400 mt-1">En la nube</div></div>
        <div><div class="text-3xl font-black text-orange-600 dark:text-orange-400">IGV</div><div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Cálculo automático</div></div>
      </div>
    </section>

    <!-- ══ BENEFICIOS ══════════════════════════════════════════════════════════ -->
    <section id="beneficios" class="py-24 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-black mb-4">Todo lo que necesita tu negocio</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Funcionalidades pensadas para negocios retail que quieren crecer sin complicaciones.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="b in beneficios"
            :key="b.titulo"
            class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg dark:hover:shadow-gray-900 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4" :class="b.bg">
              <component :is="b.icon" class="w-5 h-5" :class="b.color" />
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white text-lg mb-2">{{ b.titulo }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ b.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ MÓDULOS ═════════════════════════════════════════════════════════════ -->
    <section id="modulos" class="py-24 px-6 bg-gray-50 dark:bg-gray-900/40">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-black mb-4">Módulos del sistema</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400">Cada módulo diseñado para el rol de tu equipo.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="m in modulos"
            :key="m.titulo"
            class="bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden"
            :class="m.border"
          >
            <div class="flex items-center gap-3 px-6 py-4 border-b" :class="[m.headerBg, m.border]">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center" :class="m.headerBg">
                <component :is="m.icon" class="w-5 h-5" :class="m.color" />
              </div>
              <h3 class="font-bold text-lg" :class="m.color">{{ m.titulo }}</h3>
            </div>
            <ul class="p-6 space-y-3">
              <li v-for="item in m.items" :key="item" class="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle class="w-4 h-4 flex-shrink-0" :class="m.color" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ CÓMO FUNCIONA ═══════════════════════════════════════════════════════ -->
    <section id="como-funciona" class="py-24 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-black mb-4">¿Cómo funciona?</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400">Empieza a operar en menos de 30 minutos.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div v-for="p in pasos" :key="p.n" class="text-center">
            <div class="text-7xl font-black text-blue-100 dark:text-blue-950 leading-none mb-4 select-none">{{ p.n }}</div>
            <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">{{ p.titulo }}</h3>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{{ p.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ CONTACTO ════════════════════════════════════════════════════════════ -->
    <section id="contacto" class="py-24 px-6 bg-gray-50 dark:bg-gray-900/40">
      <div class="max-w-xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-black mb-4">¿Listo para empezar?</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400">
            Déjanos tus datos y te contactamos para una demostración gratuita.
          </p>
        </div>

        <!-- Éxito -->
        <div v-if="enviado" class="bg-white dark:bg-gray-900 border border-green-200 dark:border-green-900/50 rounded-2xl p-12 text-center">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle class="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-2xl font-bold mb-2">¡Mensaje enviado!</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6">Te responderemos a la brevedad. También puedes escribirnos por WhatsApp.</p>
          <button @click="enviado = false" class="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Enviar otro mensaje
          </button>
        </div>

        <!-- Formulario -->
        <form v-else @submit.prevent="enviar" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-5">

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Nombre -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Nombre completo <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Users class="w-4 h-4 text-gray-400" />
                </span>
                <input
                  v-model="form.nombre"
                  type="text"
                  placeholder="Juan Pérez"
                  class="w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-colors"
                  :class="errors.nombre ? 'border-red-400 focus:border-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'"
                />
              </div>
              <p v-if="errors.nombre" class="text-xs text-red-500 mt-1">{{ errors.nombre }}</p>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Correo electrónico <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Mail class="w-4 h-4 text-gray-400" />
                </span>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="juan@empresa.com"
                  class="w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-colors"
                  :class="errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'"
                />
              </div>
              <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Teléfono -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Teléfono</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Phone class="w-4 h-4 text-gray-400" />
                </span>
                <input
                  v-model="form.telefono"
                  type="tel"
                  placeholder="999 888 777"
                  class="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-colors"
                />
              </div>
            </div>

            <!-- Empresa -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Empresa</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Building2 class="w-4 h-4 text-gray-400" />
                </span>
                <input
                  v-model="form.empresa"
                  type="text"
                  placeholder="Mi Empresa S.A.C."
                  class="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <!-- Mensaje -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Mensaje <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.mensaje"
              rows="4"
              placeholder="Cuéntanos sobre tu negocio y lo que necesitas..."
              class="w-full px-3 py-2.5 rounded-lg border text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-colors resize-none"
              :class="errors.mensaje ? 'border-red-400 focus:border-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'"
            />
            <p v-if="errors.mensaje" class="text-xs text-red-500 mt-1">{{ errors.mensaje }}</p>
          </div>

          <p v-if="errorEnvio" class="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg px-4 py-3">
            {{ errorEnvio }}
          </p>

          <button
            type="submit"
            :disabled="enviando"
            class="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors text-sm"
          >
            <span v-if="enviando">Enviando...</span>
            <span v-else class="flex items-center gap-2">
              Enviar mensaje
              <ArrowRight class="w-4 h-4" />
            </span>
          </button>
        </form>

        <p class="text-center text-sm text-gray-400 mt-6">
          ¿Prefieres escribirnos directamente?
          <a
            href="https://wa.me/51935216950?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20Tendero."
            target="_blank"
            class="text-green-600 dark:text-green-400 font-semibold hover:underline ml-1"
          >
            Chatear por WhatsApp
          </a>
        </p>
      </div>
    </section>

    <!-- ══ FOOTER ══════════════════════════════════════════════════════════════ -->
    <footer class="py-10 px-6 border-t border-gray-200 dark:border-gray-800">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <Store class="w-3.5 h-3.5 text-white" />
          </div>
          <span class="font-bold">Tendero</span>
          <span class="text-gray-400 text-sm ml-1">— Sistema SaaS para retail</span>
        </div>
        <p class="text-sm text-gray-400">© {{ new Date().getFullYear() }} Tendero. Todos los derechos reservados.</p>
      </div>
    </footer>

    <!-- ══ BOTÓN FLOTANTE WHATSAPP ══════════════════════════════════════════════ -->
    <a
      href="https://wa.me/51935216950?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20Tendero."
      target="_blank"
      class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-xl shadow-green-500/20 hover:scale-110 transition-all duration-200"
      title="Chatear por WhatsApp"
    >
      <MessageCircle class="w-6 h-6 text-white" />
    </a>

  </div>
</template>
