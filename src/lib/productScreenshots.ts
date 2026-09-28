export const siteImages = {
  team: "/images/equipo.jpg",
  teamMember: "/images/foto_je.png",
  ayacucho: "/images/foto_pl.jpg",
  dashboard: "/images/page_inicio.png",
  parentPortal: "/images/page_portal_padres.png",
  messagingApp: "/images/app_asistencia.jpg",
} as const;

export function getProductScreenshots(slug: string) {
  if (slug === "asiscole") {
    return {
      primary: siteImages.dashboard,
      secondary: siteImages.messagingApp,
    };
  }
  if (slug === "asis-academy") {
    return {
      primary: siteImages.parentPortal,
      secondary: siteImages.messagingApp,
    };
  }
  return null;
}
