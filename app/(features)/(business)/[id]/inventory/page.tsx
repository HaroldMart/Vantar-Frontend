// app/inventory/page.tsx

import InventorySelection from "@/app/(features)/inventory/components/inventory-selection";

const InventoryPage = ({
    params,
}: {
    params: Record<string, string | string[]>;
}) => {
    const { id } = params;

    return (
        <>
            <InventorySelection businessId={id} />
        </>
    );
}


export default InventoryPage;