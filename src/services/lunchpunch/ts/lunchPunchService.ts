import { LunchPunch } from "../api/prd/api";
import type { LunchPunchRespose } from "../../../models/lunchPunchService/interfaces";

export default async function LunchPunchFunction(SSO: number) {
    try {
        const response: any = await LunchPunch.post(`?sso=${SSO}`);
        const LunchPunchRespose: LunchPunchRespose = {
            SSO: response.data[0].sso,
            Access: response.data[0].access,
            Message: response.data[0].message,
            UserName: response.data[0].userName
        };
        return LunchPunchRespose;
    } catch (e: any) {
        console.error('Error during punch :', e)
        throw e
    };
};