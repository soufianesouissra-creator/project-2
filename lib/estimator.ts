/**
 * Delivery estimator (master prompt §6, Services). Pure: same inputs, same
 * outputs — the component owns formatting, the planning desk owns reality.
 */
export type Estimate = {
  trucks: number;
  productionMinutes: number;
  productionDays: number;
};

export const TRUCK_PAYLOAD_T = 28; // default — confirm TRANSPOLEQ fleet (TODO.md)
const PRODUCTION_DAY_HOURS = 10;

export function estimateDelivery(
  quantityT: number,
  capacityTph: number,
): Estimate | null {
  if (!Number.isFinite(quantityT) || quantityT <= 0) return null;
  const trucks = Math.ceil(quantityT / TRUCK_PAYLOAD_T);
  const productionMinutes = Math.ceil((quantityT / capacityTph) * 60);
  const productionDays = Math.max(
    1,
    Math.ceil(productionMinutes / (PRODUCTION_DAY_HOURS * 60)),
  );
  return { trucks, productionMinutes, productionDays };
}

export function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${String(m).padStart(2, "0")}`;
}
