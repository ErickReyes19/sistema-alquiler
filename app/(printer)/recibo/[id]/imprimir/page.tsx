import { getContratoByIdView } from "@/app/(protected)/contratos/actions";
import { Inbox } from "lucide-react";
import { getSession } from "@/auth";
import { getReciboCompletoById } from "@/app/(protected)/contratos/[id]/recibos/actions";
import { ReciboImpresion } from "./reciboPrint";


export default async function ImprimirPage({ params }: { params: { id: string } }) {
    const recibo = await getReciboCompletoById(params.id);
    if (!recibo) {
        return (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <Inbox size={50} color="red" />
                <p>No se encuentra el recibo</p>
            </div>
        );
    }

    return <ReciboImpresion recibo={recibo} />;
}
