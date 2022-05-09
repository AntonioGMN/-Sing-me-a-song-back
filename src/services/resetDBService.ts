import * as resetService from "../repositories/resetDBRepositorie.js";

export async function reset() {
  await resetService.reset()
  return;
}