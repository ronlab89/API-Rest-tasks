
const register = (req, res) => {
    console.log(req.body)
    res.json({ok: 'Register'})
}

const login = (req, res) => {
    console.log(req.body)
    res.json({ok: 'Login'})
}


export {
    login,
    register
}