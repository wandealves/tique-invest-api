import paths from "./paths";
import components from "./components";
import schemas from "./schemas";

export default {
  openapi: "3.0.0",
  info: {
    title: "Tique Investment",
    description: "Tique Investment gestão e admistração de investimentos.",
    version: "1.0.0",
    contact: {
      name: "Wanderson Alves Rodrigues",
      email: "wanderson.alves.rodrigues@gmail.com",
      url: "https://www.linkedin.com/in/wandealves/"
    },
    license: {
      name: "GPL-3.0-or-later",
      url: "https://spdx.org/licenses/GPL-3.0-or-later.html"
    }
  },
  externalDocs: {
    description: "",
    url: ""
  },
  servers: [
    {
      url: "/api",
      description: "Servidor Principal"
    }
  ],
  tags: [
    {
      name: "Login",
      description: "APIs relacionadas a Login"
    },
    {
      name: "Enquete",
      description: "APIs relacionadas a Enquete"
    }
  ],
  paths,
  schemas,
  components
};
