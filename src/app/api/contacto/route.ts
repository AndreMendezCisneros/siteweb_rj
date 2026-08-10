import { NextResponse } from "next/server";
import { es } from "@/content/es";

type ContactPayload = {
  name?: string;
  email?: string;
  organization?: string;
  phone?: string;
  need?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Solicitud inválida." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() || "";
  const email = body.email?.trim() || "";
  const organization = body.organization?.trim() || "";
  const phone = body.phone?.trim() || "";
  const need = body.need?.trim() || "";

  if (!name || !email || !need) {
    return NextResponse.json(
      { ok: false, message: "Completa nombre, correo y qué necesitas mejorar." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Ingresa un correo válido." },
      { status: 400 },
    );
  }

  if (name.length > 120 || email.length > 160 || phone.length > 40 || need.length > 4000) {
    return NextResponse.json(
      { ok: false, message: "El mensaje es demasiado largo." },
      { status: 400 },
    );
  }

  const subject = encodeURIComponent(`Consulta RYJEC — ${name}`);
  const lines = [
    `Nombre: ${name}`,
    `Correo: ${email}`,
    organization ? `Organización: ${organization}` : null,
    phone ? `Teléfono: ${phone}` : null,
    "",
    "Qué necesita mejorar:",
    need,
  ].filter(Boolean);

  const mailto = `mailto:${es.site.emails.contact}?subject=${subject}&body=${encodeURIComponent(
    lines.join("\n"),
  )}`;

  return NextResponse.json({
    ok: true,
    message:
      "Recibimos tu consulta. Revisaremos el contexto y te responderemos por correo.",
    mailto,
    contactEmail: es.site.emails.contact,
  });
}
