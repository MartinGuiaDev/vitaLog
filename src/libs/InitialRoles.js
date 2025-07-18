import Role from "../models/roles.model.js";
// import Department from "../models/department.model.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "Master" }).save(),
      new Role({ name: "AdministradorP" }).save(),
      new Role({ name: "AdministradorF" }).save(),
      new Role({ name: "Vendedor" }).save(),
      new Role({ name: "Operador" }).save(),
      new Role({ name: "Almacenista" }).save(),
    ]);

    const roleAdmin = await Role.find({ name: "Master" });

    const countUsers = await User.estimatedDocumentCount();
    if (countUsers > 0) return;

    const users = await Promise.all([
      new User({
        name: "admin",
        lastName: "admin",
        userName: "rootAdmin",
        password: await bcryptjs.hash("@qwerty123VB", 10),
        role: roleAdmin[0]._id,
        // department: depAdministracion[0]._id,
      }).save(),
    ]);

    console.log("Roles created:", values, users);
  } catch (error) {
    console.error(error);
  }
};
