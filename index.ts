import "reflect-metadata"
import { PrismaClient } from "@prisma/client";
import { resolvers } from "./prisma/generated/type-graphql";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";

async function main()
{
    const prisma = new PrismaClient()
    await prisma.$connect()

    const schema = await buildSchema
    ({
        resolvers,
        validate: false,
    })
    
    const server = new ApolloServer({
        schema: schema,
        context: () => ({
            prisma,
        })
    })

    await server.listen(process.env.BACKEND_API_PORT || 4000, (err:any) => {
        if(err) console.log(err)
        else console.log("Successful connection")
    })
}

main()
