export const setRefreshTokenCookie = (res, token) => {
    // create cookie with refresh token that expires in 7 days
    const cookieOptions = {
        httpOnly: true,
        secure: true, // comment to see the cookie in the response cookies tab on Postman
        expires: new Date(Date.now() + 7*24*60*60*1000)
    };
    res.cookie('refreshToken', token, cookieOptions);
}