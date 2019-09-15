const BASE_URL = "http://localhost:5000/timeboxes"
const AxiosTimeboxesAPI = {

    getAllTimeboxes: async function(accessToken) {
        const axios = await import("axios");
        axios.defaults.headers.common = {'Authorization': `Bearer ${accessToken}`};
        const response = await axios.get(BASE_URL, null, accessToken);
        const timeboxes = response.data;
        return timeboxes;
    },
    addTimebox: async function(timeboxToAdd, accessToken) {
        const axios = await import("axios");
        axios.defaults.headers.common = {'Authorization': `Bearer ${accessToken}`};
        const response = await axios.post(BASE_URL, timeboxToAdd, accessToken );
        const addedTimebox = response.data;
        return addedTimebox;
    },
    replaceTimebox: async function(timeboxToReplace, accessToken) {
        const axios = await import("axios");
        axios.defaults.headers.common = {'Authorization': `Bearer ${accessToken}`};
        if (!timeboxToReplace.id) {
            throw new Error("Timebox has to have an id to be updated");
        }
        const response = await axios.put(`${BASE_URL}/${timeboxToReplace.id}`, timeboxToReplace, accessToken);
        const replacedTimebox = response.data;
        return replacedTimebox;
    },
    removeTimebox: async function(timeboxToRemove, accessToken) {
        const axios = await import("axios");
        axios.defaults.headers.common = {'Authorization': `Bearer ${accessToken}`};
        if (!timeboxToRemove.id) {
            throw new Error("Timebox has to have an id to be updated");
        }
        await axios.delete(`${BASE_URL}/${timeboxToRemove.id}`, timeboxToRemove, accessToken);
    }
}

export default AxiosTimeboxesAPI;