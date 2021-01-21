export const getUser = async(userId) => {
  const response = await fetch(`/api/users/${userId}`)
  return await response.json();
}