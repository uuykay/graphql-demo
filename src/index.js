import { GraphQLServer } from "graphql-yoga";

// Scalar types: String, Boolean, Int, Float, ID
// Type definitions (schema)
const typeDefs = `
	type Query{
		me: User!
		post: Post!
	}

	type User{
		id: ID!
		name: String!
		email: String!
		age: Int
	}

	type Post{
		id: ID!
		title: String!
		body: String!
		published: Boolean!
	}
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: "abc123",
        name: "William",
        email: "test@test.com",
        age: 28
      };
    },
    post() {
      return {
        id: "def123",
        title: "Some post title",
        body: "This is the body of a post",
        published: true
      };
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up");
});
