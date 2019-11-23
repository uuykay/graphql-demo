import { GraphQLServer } from "graphql-yoga";

// Demo user data
const users = [
  {
    id: 1,
    name: "William",
    email: "william@example.com",
    age: 29
  },
  {
    id: 2,
    name: "Nancy",
    email: "nancy@example.com",
    age: 27
  }
];

// Scalar types: String, Boolean, Int, Float, ID
// Type definitions (schema)
const typeDefs = `
	type Query{
		users(query: String): [User!]!
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
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
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
  console.log("The server is up at http://localhost:4000/");
});
