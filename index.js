const axios = require('axios');
const prompt = require('prompt-sync')();

async function sentOTP(email) {
    const body = JSON.stringify({
        "email": email,
        "data": {},
        "create_user": true,
        "gotrue_meta_security": {}
    })
    const headers = {
        headers: {
            "x-client-info": "supabase-js/2.0.5",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cmp5Y29jdmx1b2NkZ2xpeXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc0MDY3NzksImV4cCI6MTk4Mjk4Mjc3OX0.SLAgTxtgawJoxTXXtxfI85Q3Xz-ecBI9XkjZyKvl794",
            "content-type": "application/json;charset=UTF-8",
            "content-length": body.length,
            "accept-encoding": "gzip",
            "user-agent": "okhttp/4.9.2"
        }
    }
    return await axios.post('https://byrjycocvluocdgliyvg.supabase.co/auth/v1/otp', body, headers)
    .then((res) => {
        return {
            success: true
        }
    })
    .catch((err) => {
        return {
            success: false,
            data: err.response.data,
        }
    })
}

async function verifyOTP(email, token) {
    const body = JSON.stringify({
        "email": email,
        "token": token,
        "type": "signup",
        "gotrue_meta_security": {}
    })
    const headers = {
        headers: {
            "x-client-info": "supabase-js/2.0.5",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cmp5Y29jdmx1b2NkZ2xpeXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc0MDY3NzksImV4cCI6MTk4Mjk4Mjc3OX0.SLAgTxtgawJoxTXXtxfI85Q3Xz-ecBI9XkjZyKvl794",
            "content-type": "application/json;charset=UTF-8",
            "content-length": body.length,
            "accept-encoding": "gzip",
            "user-agent": "okhttp/4.9.2"
        }
    }
    return await axios.post('https://byrjycocvluocdgliyvg.supabase.co/auth/v1/verify', body, headers)
    .then((res) => {
        return {
            success: true,
            data: res.data
        }
    })
    .catch((err) => {
        return {
            success: false,
            data: err.response.data
        }
    })
}

async function checkRefferal(refferal, accessToken) {
    const body = JSON.stringify({
        "code": refferal
    })
    const headers = {
        headers: {
            "x-client-info": "supabase-js/2.0.5",
            "content-profile": "public",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cmp5Y29jdmx1b2NkZ2xpeXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc0MDY3NzksImV4cCI6MTk4Mjk4Mjc3OX0.SLAgTxtgawJoxTXXtxfI85Q3Xz-ecBI9XkjZyKvl794",
            "authorization": `Bearer ${accessToken}`,
            "content-type": "application/json;charset=UTF-8",
            "content-length": body.length,
            "accept-encoding": "gzip",
            "user-agent": "okhttp/4.9.2"
        }
    }
    return await axios.post('https://byrjycocvluocdgliyvg.supabase.co/rest/v1/rpc/referral_code_valid', body, headers)
    .then(async (res) => {
        if (res) {
            return await axios.post('https://byrjycocvluocdgliyvg.supabase.co/rest/v1/rpc/set_referred_by', body, headers)
            .then((res) => {
                return {
                    success: true
                }
            })
            .catch((err) => {
                return {
                    success: false,
                    data: err.message
                }
            })
        }
    })
    .catch((err) => {
        return {
            success: false,
            data: err.message
        }
    })
}

async function setUsername(username, accessToken) {
    const body = JSON.stringify({
        "username": username
    })
    const headers = {
        headers: {
            "x-client-info": "supabase-js/2.0.5",
            "content-profile": "public",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cmp5Y29jdmx1b2NkZ2xpeXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc0MDY3NzksImV4cCI6MTk4Mjk4Mjc3OX0.SLAgTxtgawJoxTXXtxfI85Q3Xz-ecBI9XkjZyKvl794",
            "authorization": `Bearer ${accessToken}`,
            "content-type": "application/json;charset=UTF-8",
            "content-length": body.length,
            "accept-encoding": "gzip",
            "user-agent": "okhttp/4.9.2"
        }
    }
    return await axios.post('https://byrjycocvluocdgliyvg.supabase.co/rest/v1/rpc/username_valid', body, headers)
    .then(async(res) => {
        if (res.data) {
            return await axios.post('https://byrjycocvluocdgliyvg.supabase.co/rest/v1/rpc/set_username', body, headers)
            .then((res) => {
                return {
                    success: true,
                }
            })
            .catch((err) => {
                return {
                    success: false,
                    data: err,
                }
            })
        } else {
            console.log(res);
            return {
                success: false,
            }
        }
    })
    .catch((err) => {
        return {
            success: false,
            data: err,
        }
    })
}

(async() => {
    const email = "akmaldira69@gmail.com";
    const sentOtp = await sentOTP(email);
    if (!sentOtp.success) {
        console.log(sentOtp.data);
        process.exit(1);
    }
    const otp = prompt('OTP : ');
    console.log('Verify OTP...');
    const verifyOtp = await verifyOTP(email, otp);
    if (!verifyOtp.success) {
        console.log(verifyOtp.data);
        process.exit(1);
    }
    const accessToken = verifyOtp.data.access_token;
    console.log('Adding refferal...');
    const refferal = await checkRefferal("RWFZOCD8", accessToken);
    if (!refferal.success) {
        console.log(refferal.data);
        process.exit(1);
    }
    // console.log('Set username...');
    // const setUname = await setUsername("akmaldira69", accessToken);
    // if (!setUname.success) {
    //     console.log(setUname);
    //     process.exit(1);
    // }
    console.log('Success');
})()