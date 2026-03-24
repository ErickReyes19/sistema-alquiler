import {getContratoByIdView  } from "@/app/(protected)/contratos/actions";
import { Inbox } from "lucide-react";
import ContratoPrint from "./solicitudPrint";


export default async function ImprimirPage({ params }: { params: { id: string } }) {
    const solicitud = await getContratoByIdView(params.id);
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
