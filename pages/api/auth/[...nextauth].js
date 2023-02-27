import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  pages: { signIn: "account/signin" },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      // credentials: {
      //   username: { label: "Username", type: "text", placeholder: "jsmith" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        const { email, password } = credentials;

        const data = await axios({
          method: "post",
          url: "http://54.147.214.160:1453/v1/authenticate",
          headers: {},
          data: {
            email,
            password,
          },
        });
        const isSuccess = data.data.message_code === "LOGIN_SUCCESS";

        if (data && isSuccess) {
          // Any object returned will be saved in `user` property of the JWT
          return data.data.result;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      session.user = token;
      return { session };
    },
  },
  session: { strategy: "jwt" },
  jwt: {
    secret: "test",
    encryption: true,
  },
});
