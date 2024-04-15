
import http from "@/lib/http";
import { ApiTags } from "@/constants/enum";
import { publicHeaders } from "@/apiRequests";
import { GhnProvinceDTO } from "@techcell/node-sdk";


const ApiPrefix = ApiTags.Address;

export const addressApiRequest = {
    getProvinces: () => http.get<GhnProvinceDTO[]>(`${ApiPrefix}/provinces`, { headers: publicHeaders }),

    getDistricts: (provinceId: string) => http.get(`${ApiPrefix}/districts/${provinceId}`, { headers: publicHeaders }),

    getWards: (districtId: string) => http.get(`${ApiPrefix}/wards/${districtId}`, { headers: publicHeaders }),
}