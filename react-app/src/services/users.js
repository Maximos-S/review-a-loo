export const getUser = async(userId) => {
  const response = await fetch(`/api/users/${userId}`)
  return await response.json();
}

export const editUser = async(payload, userId) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'post',
    body: payload
  })
  return await response.json();
}