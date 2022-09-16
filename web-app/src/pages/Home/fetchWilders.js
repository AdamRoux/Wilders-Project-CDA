import { WILDERS_PATH } from "../../services/rest";
import { query } from "../../services/sendRequest";

export async function fetchWilders() {
  return query(WILDERS_PATH, "GET");
}
