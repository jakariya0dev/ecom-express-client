const addCategory = async (FormData) => {
    const res = await axios.post(`${baseUrl}/categories`, FormData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
}