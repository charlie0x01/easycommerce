import swaggerAutogen from "swagger-autogen";

export const doc = {
  info: {
    version: "v1.0.0",
    title: "Swagger Demo Project",
    description: "",
  },
  servers: [
    {
      url: "http://localhost:8000/api/v1",
      description: "",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
  tags: [
    {
      name: "Auth",
      description: "",
    },
  ],
};

export const outputFile = "./swagger_output.json";
export const routes = ["./src/routes/user.routes.ts"];
swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
