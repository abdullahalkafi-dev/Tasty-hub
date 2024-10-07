export const getRecipe=async(limit:string='10000')=>{
    const res=await fetch(`${process.env.NEXT_BASE_URL}/recipe?limit=${limit}`)
const result =await res.json()
    return result
    
    }