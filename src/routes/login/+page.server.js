// e7dd5165-b09c-4b21-9c96-18a6ce3c7e68
import axios from "axios";
import {fail} from "@sveltejs/kit";

export const actions = {
    default: async ({request}) => {
        let formData = await request.formData()
        let email = await formData.get('email')
        let password = await formData.get('password')

        const data = await axios.get(`/api/auth?email=${email}&password=${password}`)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return fail(400, error.response.data.errorMessage)
            });

        if (data.status !== 200) {
            return data;
        }

        return {
            status: 200,
            data: {
                token: data.data.data,
            }
        }
    }
};
