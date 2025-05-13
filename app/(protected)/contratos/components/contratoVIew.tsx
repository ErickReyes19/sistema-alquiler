"use client"
import { CalendarIcon, CheckCircle, XCircle } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContratoView } from "../type"



interface ContratoViewProps {
    contrato: ContratoView
}

export default function ContratoViewComponent({ contrato }: ContratoViewProps) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "No definida"
        return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: es })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es", {
            style: "currency",
            currency: "HNL",
        }).format(amount)
    }
    const handlePrint = () => {
        window.open(
            `/contrato/${contrato.id}/imprimir`,
            "_blank"
        )
    }

    return (
        <Card className="w-full  mx-auto">
            <CardHeader>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                    Imprimir
                </Button>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl">Contrato #{contrato.id}</CardTitle>
                        <CardDescription>Detalles del contrato de arrendamiento</CardDescription>
                    </div>
                    <Badge variant={contrato.activo ? "default" : "destructive"}>{contrato.activo ? "Activo" : "Inactivo"}</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Inquilino</h3>
                            <p className="text-lg font-medium">{contrato.inquilino}</p>
                            <p className="text-sm text-muted-foreground">ID: {contrato.inquilinoId}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Apartamento</h3>
                            <p className="text-lg font-medium">#{contrato.apartamento.numero}</p>
                            {contrato.apartamento.direccion && (
                                <p className="text-sm text-muted-foreground">{contrato.apartamento.direccion}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Período</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span>Inicio: {formatDate(contrato.fechaInicio)}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span>Fin: {formatDate(contrato.fechaFin)}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Monto Mensual</h3>
                            <p className="text-xl font-bold">{formatCurrency(contrato.montoMensual)}</p>
                        </div>
                    </div>
                </div>

                <Separator />

                <Tabs defaultValue="habitaciones">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="habitaciones">Habitaciones</TabsTrigger>
                        <TabsTrigger value="servicios">Servicios</TabsTrigger>
                    </TabsList>

                    <TabsContent value="habitaciones" className="mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                    <TableHead>Estado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contrato.apartamento.habitaciones.map((habitacion) => (
                                    <TableRow key={habitacion.id}>
                                        <TableCell className="font-medium">{habitacion.tipoHabitacionNombre}</TableCell>
                                        <TableCell>{habitacion.cantidad}</TableCell>
                                        <TableCell>
                                            {habitacion.activo ? (
                                                <div className="flex items-center">
                                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                                    <span>Activa</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                                                    <span>Inactiva</span>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>

                    <TabsContent value="servicios" className="mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Servicio</TableHead>
                                    <TableHead>Incluido</TableHead>
                                    <TableHead>Costo Adicional</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contrato.apartamento.servicios.map((servicio) => (
                                    <TableRow key={servicio.id}>
                                        <TableCell className="font-medium">{servicio.servicioNombre}</TableCell>
                                        <TableCell>
                                            {servicio.incluido ? (
                                                <div className="flex items-center">
                                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                                    <span>Sí</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                                                    <span>No</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {servicio.costoAdicional > 0 ? formatCurrency(servicio.costoAdicional) : "Sin costo adicional"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </CardContent>


        </Card>
    )
}
