import {getContratoByIdView  } from "@/app/(protected)/contratos/actions";
import { Inbox } from "lucide-react";
import ContratoPrint from "./solicitudPrint";
import { getSession } from "@/auth";


export default async function ImprimirPage({ params }: { params: { id: string } }) {
    const solicitud = await getContratoByIdView(params.id);
    const usuario = await getSession();
    if (!solicitud) {
        return (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <Inbox size={50} color="red" />
                <p>No se encuentró el contrato</p>
            </div>
        );
    }

    return <ContratoPrint contrato={solicitud} />;
}
