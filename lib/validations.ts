import * as z from "zod";


export const UserValidationSchema = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3).max(30),
    bio: z.string().min(3).max(500),
})

export const ThreadValidationSchema = z.object({
    thread: z.string().nonempty().min(3, {message: "Minimun 3 characters"}),
    accountId: z.string()

})

export const CommentValidationSchema = z.object({
    thread: z.string().nonempty().min(3, {message: "Minimun 3 characters"}),
})