import { HTTPVerb, query, WILDERS_PATH } from "../../services/rest"

export const deleteWilder = async (id: string) => {
    return await query(`${WILDERS_PATH}/${id}`, HTTPVerb.DELETE)

}