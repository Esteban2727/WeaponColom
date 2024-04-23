import encriptar from "bcrypt"


const encript = async(password)=>{
    const CreateHash= await encriptar.hash(password,10)
    return CreateHash
}

const compare=async(data,data2)=>{
    return await  encriptar.compare(data,data2)
    
}



export {encript ,compare}