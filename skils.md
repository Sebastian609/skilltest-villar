# Prompt para crear el frontend

Quiero que desarrolles el frontend de esta aplicación con un enfoque profesional, modular y mantenible.

## Objetivo principal

Construye una interfaz que se sienta como un producto real desarrollado por un equipo de software, NO como una plantilla generada por IA.

El diseño debe ser:

- Propio y reconocible.
- Simple y profesional.
- Moderno, pero sin abusar de efectos visuales.
- Limpio y funcional.
- Consistente en todas las pantallas.
- Fácil de mantener y extender.
- Responsive.
- Accesible.
- Sin apariencia de dashboard genérico de IA.

Evita completamente diseños que parezcan salidos de una plantilla de SaaS o de un generador de interfaces.

---

## Filosofía de diseño

Prioriza:

1. Jerarquía visual clara.
2. Espaciado consistente.
3. Tipografía legible.
4. Componentes reutilizables.
5. Pocos colores.
6. Contraste adecuado.
7. Información útil antes que decoración.
8. Interacciones predecibles.
9. Diseño sobrio.
10. Identidad visual propia.

NO uses:

- Gradientes innecesarios.
- Glassmorphism.
- Fondos con blobs.
- Sombras exageradas.
- Bordes excesivamente redondeados.
- Tarjetas flotantes por todas partes.
- Animaciones constantes.
- Emojis como elementos principales de UI.
- Iconos gigantes.
- Texto de marketing innecesario.
- Secciones visuales que no aporten funcionalidad.
- El típico layout de "sidebar + 4 cards + gráfico + tabla" sin justificarlo.

La interfaz debe parecer diseñada específicamente para este producto.

---

# Arquitectura

La aplicación debe estar completamente modularizada.

No quiero un único archivo gigante con toda la interfaz.

Organiza el proyecto por responsabilidades.

Ejemplo conceptual:

```text
src/
├── app/
│   ├── routes/
│   ├── layouts/
│   └── providers/
│
├── components/
│   ├── ui/
│   ├── forms/
│   ├── navigation/
│   └── feedback/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── users/
│   └── ...
│
├── services/
│   ├── api/
│   └── ...
│
├── hooks/
├── utils/
├── types/
├── constants/
├── styles/
└── assets/