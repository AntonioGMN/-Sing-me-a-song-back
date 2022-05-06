import * as resetService from "../repositories/resetDBRepositorie.js";

export default async function reset() {
  await resetService.reset()
  return;
}