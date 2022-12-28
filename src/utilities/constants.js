const K = {
  Network: {
    URL: {
      // Development
      Base: process.env.REACT_APP_BASE_URL,
      BaseAPI: process.env.REACT_APP_BASE_API_URL,
      DomainName: process.env.REACT_APP_CLIENT_DOMAIN_NAME,
      Timeout: process.env.REACT_APP_TIMEOUT,
      Protocol: process.env.REACT_APP_PROTOCOL,
      Client: {
        BaseHost: process.env.REACT_APP_CLIENT_BASE_HOST,
        BasePort: process.env.REACT_APP_CLIENT_BASE_PORT,
      },

      // Assignment
      LoginUser: "/auth/signin",

      // Forget password
      ForgotPassword: "/user/send_password_reset_token",

      //Reset password
      ResetPassword: "/user/reset_password",
    },
    Method: {
      GET: "GET",
      POST: "POST",
      PATCH: "PATCH",
      DELETE: "DELETE",
    },
    Header: {
      ContentType: "Content-Type",
      ApplicationJson: "application/json",
      Default: (token = "") => ({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      }),
      Authorization: (token = "") => ({
        Authorization: "Bearer " + token,
      }),
      Type: {
        Json: "json",
        File: "file",
      },
    },
    StatusCode: {
      Unauthorized: 401,
    },
  },
  Actions: {
    // General part of action
    CREATE: "CREATE",
    UPSERT: "UPSERT",
    DELETE: "DELETE",
    DELETE_ALL: "DELETE_ALL",
    SET: "SET",
  },
  Cookie: {
    Key: {
      User: "user",
      EncryptionKey: "logged_in_user",
    },
  },
  Roles: {
    Admin: "Admin",
    User: "User",
  },
};
export default K;
