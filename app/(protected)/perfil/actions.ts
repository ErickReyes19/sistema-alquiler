"use server"

import bcrypt from "bcryptjs"

import { prisma } from "@/lib/prisma"
import { requireTenantSession } from "@/lib/tenant-session"

export async function changeOwnPassword(input: {
  currentPassword: string
  newPassword: string
}) {
  const session = await requireTenantSession()

  const currentPassword = input.currentPassword.trim()
  const newPassword = input.newPassword.trim()

  if (!currentPassword || !newPassword) {
    throw new Error("Debes completar todos los campos.")
  }

  if (newPassword.length < 8) {
    throw new Error("La nueva contraseña debe tener al menos 8 caracteres.")
  }

  const user = await prisma.usuario.findFirst({
    where: {
      id: session.IdUser,
      tenantId: session.tenantId,
      activo: true,
    },
  })

  if (!user) {
    throw new Error("Usuario no encontrado.")
  }

  const isValidCurrentPassword = await bcrypt.compare(currentPassword, user.password)
  if (!isValidCurrentPassword) {
    throw new Error("La contraseña actual es incorrecta.")
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await prisma.usuario.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      DebeCambiar: false,
    },
  })

  return { success: true }
}
