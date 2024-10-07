import { z } from "zod";

export const SignupValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    profilePicture: z.string(),
    bio: z.string().optional(),
    memberStatus: z.object({
      status: z.enum([ "premium" , "non-premium" ]),
      expiresIn: z.date().optional()
    }),
    followers: z.array(z.string()),
    following: z.array(z.string()),
    role: z.enum([ "admin" , "user" ]),
    userStatus: z.enum(["active" , "blocked"]),
    isDeleted: z.boolean(),
  })
})


export const LoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string()
  })
})

export const refreshTokenValidationSchema = z.object({
    cookies: z.object({
      refreshToken: z.string({
        required_error: 'Refresh token is required!',
      }),
    }),
  });

export const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});

export const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'User email is required!'
    })
  })
})

export const resetPasswordValidationSchema = z.object({
  body: z.object({
    _id: z.string({
      required_error: 'User id is required!'
    }),
    password: z.string({
      required_error: 'User password is required!'
    })
  })
})