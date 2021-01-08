export const searchLocation = async(lat, lng) => {
  const response = await fetch('/api/businesses/',{
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({"lat": lat, "lng": lng})
  });
  return await response.json();
}

export const createReview = async(payload, businessId) => {
  const response = await fetch(`/api/businesses/${businessId}`,{
    method: "post",
    body: payload
  })
  return await response.json();
}

export const editReview = async(payload, userId) => {
  
}

export const getBusiness = async(businessId) => {
  const response = await fetch(`/api/businesses/${businessId}`)
  return await response.json();
}