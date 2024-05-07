import jwt from "jsonwebtoken"

 function GeneratorJWT( dato1,dato2){
    const userforToken={
        id : dato1,
        user:dato2
      }
      return jwt.sign(userforToken,"WeaponColom",{ expiresIn: '2h' })
}


export {GeneratorJWT}