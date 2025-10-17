import jwt from "jsonwebtoken";
import { userRoleRepository, roleRepository } from "../repository/index.js";


export async function generateToken(user) {
    const rolesIdsOfUser = await userRoleRepository.getRolesForUser(user.id)
    console.log(rolesIdsOfUser)
    const rolesNamesOfUser = rolesIdsOfUser.map((role) => {
        return roleRepository.getRoleById(role)
    })

    const isAdmin = rolesNamesOfUser.some(role => role.name === "admin");

    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            isAdmin
        },
        process.env.JWT_SECRET,
        { expiresIn: "48h" }
    );
}
