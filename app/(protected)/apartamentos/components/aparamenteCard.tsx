"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Bed,
    Check,
    Coffee,
    DoorClosed,
    Home,
    CookingPotIcon as Kitchen,
    ShowerHead,
    Sofa,
    Wifi,
    Tv,
    X,
} from "lucide-react"
import { ApartamentoView } from "../type"


// Componente para mostrar el ícono correspondiente a cada tipo de habitación
const HabitacionIcon = ({ tipo }: { tipo: string }) => {
    switch (tipo.toLowerCase()) {
        case "dormitorio":
            return <Bed className="h-5 w-5 text-primary" />
        case "sala":
            return <Sofa className="h-5 w-5 text-primary" />
        case "cocina":
            return <Kitchen className="h-5 w-5 text-primary" />
        case "comedor":
            return <Coffee className="h-5 w-5 text-primary" />
        case "baño":
            return <ShowerHead className="h-5 w-5 text-primary" />
        default:
            return <DoorClosed className="h-5 w-5 text-primary" />
    }
}

// Componente para mostrar el ícono correspondiente a cada servicio
const ServicioIcon = ({ nombre }: { nombre: string }) => {
    switch (nombre.toLowerCase()) {
        case "wifi":
            return <Wifi className="h-5 w-5 text-primary" />
        case "cable":
            return <Tv className="h-5 w-5 text-primary" />
        default:
            return <Home className="h-5 w-5 text-primary" />
    }
}

interface ApartamentoCardProps {
    apartamento: ApartamentoView
}

export function ApartamentoCard({ apartamento }: ApartamentoCardProps) {
    return (
        <Card className="w-full  mx-auto shadow-lg">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl font-bold">Apartamento {apartamento.numero}</CardTitle>
                        <CardDescription className="text-lg">{apartamento.direccion}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant={apartamento.disponible ? "default" : "destructive"}>
                            {apartamento.disponible ? "Disponible" : "No disponible"}
                        </Badge>
                        <Badge variant={apartamento.activo ? "outline" : "secondary"}>
                            {apartamento.activo ? "Activo" : "Inactivo"}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Habitaciones</h3>
                    <Separator className="my-2" />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]"></TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead className="text-right">Cantidad</TableHead>
                                <TableHead className="text-right">Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {apartamento.habitaciones.map((habitacion) => (
                                <TableRow key={habitacion.id}>
                                    <TableCell>
                                        <HabitacionIcon tipo={habitacion.tipoHabitacionNombre} />
                                    </TableCell>
                                    <TableCell className="font-medium">{habitacion.tipoHabitacionNombre}</TableCell>
                                    <TableCell className="text-right">{habitacion.cantidad}</TableCell>
                                    <TableCell className="text-right">
                                        {habitacion.activo ? (
                                            <Badge variant="default" className="">
                                                <Check className="h-3 w-3 mr-1" /> Activo
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive" className="">
                                                <X className="h-3 w-3 mr-1" /> Inactivo
                                            </Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Servicios</h3>
                    <Separator className="my-2" />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]"></TableHead>
                                <TableHead>Servicio</TableHead>
                                <TableHead className="text-right">Incluido</TableHead>
                                <TableHead className="text-right">Costo adicional</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {apartamento.servicios.map((servicio) => (
                                <TableRow key={servicio.id}>
                                    <TableCell>
                                        <ServicioIcon nombre={servicio.servicioNombre} />
                                    </TableCell>
                                    <TableCell className="font-medium">{servicio.servicioNombre}</TableCell>
                                    <TableCell className="text-right">
                                        {servicio.incluido ? (
                                            <Badge variant="default" className="">
                                                <Check className="h-3 w-3 mr-1" /> Activo
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive" className="">
                                                <X className="h-3 w-3 mr-1" /> Inactivo
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {servicio.costoAdicional > 0 ? `Lps ${servicio.costoAdicional}` : "-"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
