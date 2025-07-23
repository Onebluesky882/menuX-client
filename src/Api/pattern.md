// main @Controller('pages')
// get()
// create
//edit :id
// Delete :id
// Get :id

export const pages = {
create: (data: CreatePageDto) => api.post("/pages/create", data),
getAll: () => api.get("/pages"),
getById: (id: string) => api.get(`/pages/${id}`),
update: (id: string, data: UpdatePageDto) => api.put(`/pages/${id}`, data),
delete: (id: string) => api.delete(`/pages/${id}`),
};
